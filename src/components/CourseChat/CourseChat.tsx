import { useState, useRef, useEffect } from "react";
import { Card, Textarea, Button, ScrollArea, Loader } from "@mantine/core";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
}

export default function CourseChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto-scroll khi có message mới
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
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
      const res = await fetch(
        `https://localhost:7014/api/CourseRecommendation/recommend-stream?userQuery=${encodeURIComponent(
          userMessage.content,
        )}`,
        { signal: controller.signal },
      );

      if (!res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);

        setMessages((prev) => {
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

  return (
    <Card shadow="sm" padding="lg" className="max-w-3xl min-w-3xl mx-auto h-[80vh] flex flex-col">
      {/* Messages */}
      <ScrollArea ref={scrollRef} className="flex-1 mb-2" type="auto">
        <div className="flex flex-col space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 rounded max-w-[80%] break-words whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-100 self-end text-black"
                  : "bg-gray-100 dark:bg-gray-700 self-start text-black dark:text-white"
              }`}
            >
              {msg.content}
              {msg.isLoading && (
                <span className="ml-1 animate-pulse">
                  <Loader />
                </span>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 mt-auto">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          placeholder="Type your course interest..."
          minRows={1}
          maxRows={4}
          className="flex-1"
          disabled={isStreaming}
        />
        <Button type="submit" color="blue" disabled={isStreaming}>
          Send
        </Button>
        <Button color="red" variant="outline" onClick={handleStop} disabled={!isStreaming}>
          Stop
        </Button>
      </form>

      {/* Tailwind animation keyframes */}
      <style>
        {`
          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }
          .animate-blink {
            display: inline-block;
            animation: blink 1s infinite;
          }
        `}
      </style>
    </Card>
  );
}
