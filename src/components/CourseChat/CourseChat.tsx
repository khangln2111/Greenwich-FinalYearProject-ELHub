import { ActionIcon, Card, Group, ScrollArea, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowUp, IconSquare } from "@tabler/icons-react";
import { useState } from "react";

import { useCreateChatSession } from "../../features/courseRecommendation/courseRecommendation.hooks";
import { useChat } from "../../hooks/useChat";
import { useDelayedEffect } from "../../hooks/useDelayedEffect";
import CenterLoader from "../CenterLoader/CenterLoader";
import { MessageItem } from "./MessageItem";
import { cn } from "../../utils/cn";

type CourseChatProps = {
  className?: string;
};

export default function CourseChat({ className }: CourseChatProps) {
  const [sessionId, setSessionId] = useState<string>("");
  const { mutate, isPending } = useCreateChatSession();

  const { messages, isStreaming, scrollRef, sendMessage, handleStop } = useChat({
    apiUrl: "https://localhost:7014/api/CourseRecommendation/chat-stream",
    bodyBuilder: (input) => ({
      userQuery: input,
      sessionId,
    }),
    scroll: {
      onSubmit: true,
      onStreaming: false,
    },
  });

  useDelayedEffect(() => {
    if (sessionId) return;
    mutate(undefined, {
      onSuccess: (sessionId) => {
        setSessionId(sessionId);
      },
    });
  });

  const form = useForm({
    initialValues: {
      message: "",
    },
    mode: "uncontrolled",
  });

  const handleFormSubmit = form.onSubmit((values) => {
    if (!values.message.trim()) return;
    sendMessage(values.message); // send user input to backend
    form.reset();
  });

  // ✅ Render loading state while initializing chat session
  if (isPending) {
    return <CenterLoader />;
  }

  return (
    <Card
      className={cn(
        "max-w-3xl min-w-3xl mx-auto h-[80vh] flex flex-col rounded-2xl bg-gray-50 dark:bg-gray-900 shadow-lg",
        className,
      )}
    >
      <ScrollArea
        viewportRef={scrollRef}
        className="flex-1 mb-2 px-3"
        type="auto"
        scrollbarSize={6}
      >
        <div className="flex flex-col space-y-5 py-3 pb-20">
          {messages.map((msg) => (
            <MessageItem key={msg.id} msg={msg} />
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleFormSubmit} className="flex items-center gap-2 mt-auto px-2 pb-2">
        <Textarea
          placeholder="Type your message..."
          minRows={1}
          maxRows={6}
          autosize
          className="flex-1 rounded-xl shadow-md focus:shadow-lg transition-all"
          {...form.getInputProps("message")}
          key={form.key("message")}
          disabled={isStreaming} // prevent new input while streaming
        />

        <Group gap={4}>
          {!isStreaming ? (
            <ActionIcon
              type="submit"
              color="blue"
              radius="full"
              size="lg"
              variant="filled"
              disabled={!form.values.message.trim()}
            >
              <IconArrowUp size={20} />
            </ActionIcon>
          ) : (
            <ActionIcon color="red" radius="full" size="lg" variant="filled" onClick={handleStop}>
              <IconSquare size={20} />
            </ActionIcon>
          )}
        </Group>
      </form>
    </Card>
  );
}
