import { ActionIcon, Card, Group, ScrollArea, Textarea } from "@mantine/core";
import { IconArrowUp, IconSquare } from "@tabler/icons-react";
import { useForm } from "@mantine/form";

import { useChat } from "../../hooks/useChat";
import { MessageItem } from "./MessageItem";

export default function CourseChat() {
  const { messages, isStreaming, scrollRef, sendMessage, handleStop } = useChat({
    apiUrl: "https://localhost:7014/api/CourseRecommendation/recommend-stream",
    bodyBuilder: (input) => ({
      userQuery: input,
    }),
    scroll: {
      onSubmit: true,
      onStreaming: false,
    },
  });

  const form = useForm({
    initialValues: {
      message: "",
    },
    mode: "uncontrolled",
  });

  const handleFormSubmit = form.onSubmit((values) => {
    if (!values.message.trim()) return;
    // update input state in hook
    sendMessage(values.message);
    // reset textarea
    form.reset();
  });

  return (
    <Card className="max-w-3xl min-w-3xl mx-auto h-[80vh] flex flex-col rounded-2xl bg-gray-50 dark:bg-gray-900 shadow-lg">
      <ScrollArea
        viewportRef={scrollRef}
        className="flex-1 mb-2 px-3"
        type="auto"
        scrollbarSize={6}
      >
        <div className="flex flex-col space-y-5 py-3">
          {messages.map((msg) => (
            <MessageItem key={msg.id} msg={msg} />
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleFormSubmit} className="flex items-center gap-2 mt-auto px-2 pb-2">
        <Textarea
          placeholder="Type your message..."
          minRows={1}
          maxRows={4}
          autosize
          className="flex-1 rounded-xl shadow-md focus:shadow-lg transition-all"
          {...form.getInputProps("message")}
          key={form.key("message")}
        />

        <Group gap={4}>
          {!isStreaming ? (
            <ActionIcon
              type="submit"
              color="blue"
              radius="xl"
              size="lg"
              variant="filled"
              disabled={!form.values.message.trim()}
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
