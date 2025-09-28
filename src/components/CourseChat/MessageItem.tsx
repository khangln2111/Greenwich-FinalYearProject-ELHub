// MessageItem.tsx
import { BotIcon } from "lucide-react";
import { Loader, Text } from "@mantine/core";
import Markdown from "react-markdown";
import { memo } from "react";
import { Message } from "../../hooks/useChat";

export const MessageItem = memo(function MessageItem({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
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
});
