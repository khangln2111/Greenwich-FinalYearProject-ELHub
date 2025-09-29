import { useState, useRef, useEffect } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
}

interface UseChatOptions {
  apiUrl: string; // URL API chat
  bodyBuilder?: (input: string) => any; // allowed caller to customize body payload
  onStreamChunk?: (chunk: string, messages: Message[]) => Message[];
  scroll?: {
    onSubmit?: boolean; // scroll when user submit message
    onStreaming?: boolean; // scroll when assistant streaming
  };
}

export function useChat({
  apiUrl,
  bodyBuilder,
  onStreamChunk,
  scroll = { onSubmit: true, onStreaming: true },
}: UseChatOptions) {
  const [messages, setMessages] = useState<Message[]>([]);
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

  // Send new message
  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return;

    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, newUserMessage]);

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
      const payload = bodyBuilder ? bodyBuilder(text) : { userQuery: text };

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!res.body) return;

      // Create a readable stream from the response body
      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { value, done } = await reader.read();
        // Exit the loop if the stream is done
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
    } catch (err: any) {
      // If the error is due to aborting, ignore it and don't log
      if (err.name === "AbortError") return;
      console.error("Streaming error", err);
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
    isStreaming,
    scrollRef,
    sendMessage,
    handleStop,
    resetChat,
  };
}
