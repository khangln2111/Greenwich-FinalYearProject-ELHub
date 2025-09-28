import { ActionIcon, Card, Group, Loader, ScrollArea, Text, Textarea } from "@mantine/core";
import { IconArrowUp, IconSquare } from "@tabler/icons-react";
import { BotIcon } from "lucide-react";
import Markdown from "react-markdown";
import { useChat } from "../../hooks/useChat";

export default function CourseChat() {
  const { messages, input, setInput, isStreaming, scrollRef, handleSubmit, handleStop } = useChat({
    apiUrl: "https://localhost:7014/api/CourseRecommendation/recommend-stream",
    bodyBuilder: (input) => ({
      userQuery: input,
    }),
    scroll: {
      onSubmit: true,
      onStreaming: false,
    },
  });

  console.log("Course chat re-rendered");

  return (
    <Card className="max-w-3xl min-w-3xl mx-auto h-[80vh] flex flex-col rounded-2xl bg-gray-50 dark:bg-gray-900 shadow-lg">
      <ScrollArea
        viewportRef={scrollRef}
        className="flex-1 mb-2 px-3"
        type="auto"
        scrollbarSize={6}
      >
        <div className="flex flex-col space-y-5 py-3">
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div key={msg.id} className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
                {/* Header Assistant */}
                {!isUser && (
                  <div className="flex items-center gap-2">
                    <BotIcon className="size-8 text-primary inline-block" />
                    <Text className="font-semibold leading-none dark:text-gray-100">Assistant</Text>
                  </div>
                )}

                <div
                  className={`mt-2 relative p-3 rounded-2xl max-w-[75%] break-words whitespace-pre-wrap shadow transition-all ${
                    isUser
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  {msg.isLoading ? (
                    <div className="flex justify-end">
                      <Loader size="xs" />
                    </div>
                  ) : (
                    <Markdown
                      components={{
                        ul: ({ node, ...props }) => (
                          <ul className="list-disc list-inside space-y-1" {...props} />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol className="list-decimal list-inside space-y-1" {...props} />
                        ),
                      }}
                    >
                      {msg.content}
                    </Markdown>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-auto px-2 pb-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          placeholder="Type your message..."
          minRows={1}
          maxRows={4}
          autosize
          className="flex-1 rounded-xl shadow-md focus:shadow-lg transition-all"
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
            <ActionIcon color="red" radius="xl" size="lg" variant="filled" onClick={handleStop}>
              <IconSquare size={20} />
            </ActionIcon>
          )}
        </Group>
      </form>
    </Card>
  );
}
