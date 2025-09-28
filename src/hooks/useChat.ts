import { useState, useRef, useEffect } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
}

interface UseChatOptions {
  apiUrl: string; // URL API chat
  bodyBuilder?: (input: string) => any; // custom JSON body
  onStreamChunk?: (chunk: string, messages: Message[]) => Message[];
  scroll?: {
    onSubmit?: boolean; // scroll khi user submit message
    onStreaming?: boolean; // scroll khi assistant streaming
  };
}

export function useChat({
  apiUrl,
  bodyBuilder,
  onStreamChunk,
  scroll = { onSubmit: true, onStreaming: true },
}: UseChatOptions) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto scroll when streaming (only when onStreaming=true)
  useEffect(() => {
    if (scroll.onStreaming) {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, scroll.onStreaming]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Scroll to bottom when user submits message (if onSubmit=true)
    if (scroll.onSubmit) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 0);
    }

    setIsStreaming(true);

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
      isLoading: true,
    };
    setMessages((prev) => [...prev, assistantMessage]);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const payload = bodyBuilder
        ? bodyBuilder(userMessage.content)
        : { userQuery: userMessage.content };

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);

        setMessages((prev) => {
          if (onStreamChunk) return onStreamChunk(chunk, prev);

          const last = prev[prev.length - 1];
          if (last.role !== "assistant") return prev;
          return [
            ...prev.slice(0, prev.length - 1),
            { ...last, content: last.content + chunk, isLoading: false },
          ];
        });
      }
    } catch (err) {
      console.error("Streaming error", err);
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last.role !== "assistant") return prev;
        return [{ ...last, isLoading: false }];
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const handleStop = () => {
    abortControllerRef.current?.abort();
    setIsStreaming(false);
  };

  const resetChat = () => setMessages([]);

  return {
    messages,
    input,
    setInput,
    isStreaming,
    scrollRef,
    handleSubmit,
    handleStop,
    resetChat,
  };
}
