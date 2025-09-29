import { ActionIcon, Badge, Loader, ScrollArea, Textarea, Tooltip } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowUp, IconSquare } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { ResponsiveDialog } from "mantine-vaul";
import { useChat } from "../../../../hooks/useChat";
import { useCreateChatSession } from "../../../../features/courseRecommendation/courseRecommendation.hooks";
import { useDelayedEffect } from "../../../../hooks/useDelayedEffect";
import { MessageItem } from "../../../../components/CourseChat/MessageItem";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export default function CourseChatResponsiveDialog({ opened, onClose }: Props) {
  const [sessionId, setSessionId] = useState("");
  const { mutate, isPending } = useCreateChatSession();

  const { messages, isStreaming, sendMessage, handleStop } = useChat({
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
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">✨ AI Course Advisor</span>
          <Badge variant="light" color="blue">
            Beta
          </Badge>
        </div>
      }
      // footer = input + nút send/stop
      footer={
        <form onSubmit={handleFormSubmit} className="flex items-center gap-3 w-full">
          <Textarea
            placeholder="💡 Ask me anything about courses..."
            minRows={2}
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
                radius="xl"
                size="lg"
                variant="filled"
                disabled={!form.values.message.trim() || isPending}
              >
                <IconArrowUp size={20} />
              </ActionIcon>
            </Tooltip>
          ) : (
            <Tooltip label="Stop generating">
              <ActionIcon color="red" radius="xl" size="lg" variant="filled" onClick={handleStop}>
                <IconSquare size={20} />
              </ActionIcon>
            </Tooltip>
          )}
        </form>
      }
      // Vaul chỉ định style header/footer/content
      vaulProps={{
        trapFocus: true,
        classNames: {
          header: "border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900",
          footer:
            "border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-zinc-800 rounded-b-2xl",
          body: "px-6 py-3",
        },
      }}
      // Modal style cho tablet/desktop
      modalProps={{
        size: "xl",
        centered: true,
        classNames: {
          content: "h-full flex flex-col max-h-[70dvh]",
          body: "flex-1 flex flex-col px-4 py-3 max-h-full overflow-y-auto",
        },
      }}
      // base=mobile dùng vaul, md=tablet dùng modal
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
        <div className="flex-1 flex flex-col space-y-4 pb-6">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-20 space-y-2">
              <p className="text-xl font-medium">👋 Welcome! I’m your personal Course Advisor.</p>
              <p className="text-md">
                Ask me about your learning goals and I’ll recommend the best courses for you.
              </p>
            </div>
          )}
          {messages.map((msg) => (
            <MessageItem key={msg.id} msg={msg} />
          ))}
        </div>
      )}
    </ResponsiveDialog>
  );
}
