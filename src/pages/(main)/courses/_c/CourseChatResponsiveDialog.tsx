import { ActionIcon, Badge, Loader, Textarea, Tooltip } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowUp, IconSquare } from "@tabler/icons-react";
import { ResponsiveDialog } from "mantine-vaul";
import { useState } from "react";
import { MessageItem } from "../../../../components/CourseChat/MessageItem";
import { useCreateChatSession } from "../../../../features/courseRecommendation/courseRecommendation.hooks";
import { useChat } from "../../../../hooks/useChat";
import { useDelayedEffect } from "../../../../hooks/useDelayedEffect";

type Props = {
  opened: boolean;
  onClose: () => void;
};

const CourseChatResponsiveDialog = ({ opened, onClose }: Props) => {
  const [sessionId, setSessionId] = useState("");
  const { mutate, isPending } = useCreateChatSession();

  const { messages, isStreaming, sendMessage, handleStop, scrollRef } = useChat({
    apiUrl: "https://localhost:7014/api/CourseRecommendation/chat-stream",
    bodyBuilder: (input) => ({ userQuery: input, sessionId }),
    scroll: { onSubmit: true, onStreaming: false },
  });

  useDelayedEffect(() => {
    if (sessionId) return;
    mutate(undefined, { onSuccess: (id) => setSessionId(id) });
  });

  const form = useForm({
    initialValues: { message: "" },
    mode: "uncontrolled",
  });

  const handleFormSubmit = form.onSubmit((values) => {
    if (!values.message.trim()) return;
    sendMessage(values.message);
    form.reset();
  });

  return (
    <ResponsiveDialog
      opened={opened}
      radius={"xl"}
      onClose={onClose}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      title={
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold dark:text-gray-100">✨ AI Course Advisor</span>
          <Badge
            variant="gradient"
            className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 dark:from-purple-700 dark:via-pink-600
              dark:to-orange-500"
          >
            Beta
          </Badge>
        </div>
      }
      footer={
        <form onSubmit={handleFormSubmit} className="flex items-center gap-3 w-full">
          <Textarea
            placeholder="Ask me anything about courses... 💡"
            minRows={2}
            size="md"
            maxRows={5}
            autosize
            className="flex-1 rounded-xl shadow focus:shadow-md transition-all"
            {...form.getInputProps("message")}
            key={form.key("message")}
            disabled={isStreaming}
          />
          {!isStreaming ? (
            <Tooltip label="Send">
              <ActionIcon
                type="submit"
                color="blue"
                radius="full"
                size="lg"
                variant="filled"
                disabled={!form.values.message.trim() || isPending}
              >
                <IconArrowUp size={20} />
              </ActionIcon>
            </Tooltip>
          ) : (
            <Tooltip label="Stop generating">
              <ActionIcon color="red" radius="full" size="lg" variant="filled" onClick={handleStop}>
                <IconSquare size={20} />
              </ActionIcon>
            </Tooltip>
          )}
        </form>
      }
      vaulProps={{
        trapFocus: true,
        classNames: {
          header: "border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900",
          footer:
            "border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-zinc-800 rounded-b-2xl",
          body: "overflow-y-auto p-0",
        },
      }}
      modalProps={{
        size: "800px",
        centered: true,
        classNames: {
          header: "border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900",
          content: "h-full flex flex-col max-h-[80dvh]",
          body: "flex-1 flex flex-col max-h-full overflow-y-auto p-0",
        },
      }}
      matches={{
        base: "vaul",
        md: "modal",
      }}
    >
      {/* BODY */}
      {isPending ? (
        <div className="flex items-center justify-center h-full">
          <Loader size="lg" />
        </div>
      ) : (
        <div
          className="flex-1 flex flex-col h-full px-4 py-3 space-y-4 pb-6 overflow-y-auto"
          ref={scrollRef}
        >
          {messages.length === 0 && (
            <div className="text-center text-gray-700 dark:text-gray-400 mt-20 space-y-2">
              <p className="text-2xl font-medium">👋 Welcome! I’m your personal Course Advisor.</p>
              <p className="text-lg">
                Ask me about your learning goals and I’ll recommend the best courses for you.
              </p>
            </div>
          )}
          {messages.map((msg) => (
            <MessageItem key={msg.id} msg={msg} classNames={{}} />
          ))}
        </div>
      )}
    </ResponsiveDialog>
  );
};

export default CourseChatResponsiveDialog;
