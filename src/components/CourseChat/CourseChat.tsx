import { ActionIcon, Card, Group, Loader, ScrollArea, Textarea } from "@mantine/core";
import { IconArrowUp, IconSquare } from "@tabler/icons-react";
import Markdown from "react-markdown";
import { useChat } from "../../hooks/useChat";

export default function CourseChat() {
  const { messages, input, setInput, isStreaming, scrollRef, handleSubmit, handleStop } = useChat({
    apiUrl: "https://localhost:7014/api/CourseRecommendation/recommend-stream",
    bodyBuilder: (input) => ({
      userQuery: input,
      context: "Optional context here",
    }),
    scroll: {
      onSubmit: true, // không scroll khi submit
      onStreaming: false, // scroll khi assistant streaming
    },
  });

  return (
    <Card className="max-w-3xl min-w-3xl mx-auto h-[80vh] flex flex-col rounded-2xl bg-gray-50 dark:bg-gray-900">
      <ScrollArea viewportRef={scrollRef} className="flex-1 mb-2" type="auto" scrollbarSize={6}>
        <div className="flex flex-col space-y-3 p-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`relative p-3 rounded-2xl max-w-[75%] break-words whitespace-pre-wrap shadow transition-all ${
                msg.role === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white self-start"
              }`}
            >
              {msg.isLoading ? (
                <span className="absolute bottom-1 right-2">
                  <Loader size="xs" />
                </span>
              ) : (
                <Markdown
                  components={{
                    ul: ({ node, ...props }) => <ul className="list-inside" {...props} />,
                    ol: ({ node, ...props }) => (
                      <ol className="list-inside list-decimal" {...props} />
                    ),
                  }}
                >
                  {msg.content}
                </Markdown>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-auto">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          placeholder="Type your message..."
          minRows={1}
          maxRows={4}
          className="flex-1 shadow-md focus:shadow-lg transition-all rounded-xl"
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
            <ActionIcon color="red" radius="full" size="lg" onClick={handleStop}>
              <IconSquare size={20} />
            </ActionIcon>
          )}
        </Group>
      </form>
    </Card>
  );
}
