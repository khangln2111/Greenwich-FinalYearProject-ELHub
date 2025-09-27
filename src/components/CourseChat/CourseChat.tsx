import { useState, useRef, useEffect } from "react";
import { Card, Textarea, ScrollArea, Loader, ActionIcon, Group } from "@mantine/core";
import { IconArrowUp, IconSquare } from "@tabler/icons-react";

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

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "instant",
      });
    }
  }, [messages]);

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
    <Card
      shadow="lg"
      padding="lg"
      className="max-w-3xl min-w-3xl mx-auto h-[80vh] flex flex-col rounded-2xl bg-gradient-to-br from-gray-50
        to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Messages */}
      <ScrollArea ref={scrollRef} className="flex-1 mb-2" type="auto" scrollbarSize={6}>
        <div className="flex flex-col space-y-3 p-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`relative p-3 rounded-2xl max-w-[75%] break-words whitespace-pre-wrap shadow transition-all ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white self-end"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white self-start"
              }`}
            >
              {msg.content}
              {msg.isLoading && (
                <span className="absolute bottom-1 right-2 animate-pulse">
                  <Loader size="xs" />
                </span>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input & buttons */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-auto">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          placeholder="Type your course interest..."
          minRows={1}
          maxRows={4}
          className="flex-1 shadow-md focus:shadow-lg transition-all rounded-xl"
          disabled={false}
        />

        <Group gap={4}>
          {!isStreaming ? (
            <ActionIcon
              type="submit"
              color="blue"
              radius="xl"
              size="lg"
              variant="filled"
              disabled={!input.trim()}
            >
              <IconArrowUp size={20} />
            </ActionIcon>
          ) : (
            <ActionIcon color="red" radius="md" size="lg" variant="filled" onClick={handleStop}>
              <IconSquare size={20} />
            </ActionIcon>
          )}
        </Group>
      </form>
    </Card>
  );
}
