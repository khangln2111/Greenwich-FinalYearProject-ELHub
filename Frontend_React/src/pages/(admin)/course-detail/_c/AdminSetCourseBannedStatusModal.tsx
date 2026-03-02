import { Button, Group, Modal, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { BanCourseFormValues, banCourseSchema } from "../../../../features/course/course.schema";
import { SetCourseBannedStatusCommand } from "../../../../features/course/course.types";

interface AdminSetCourseBannedStatusModalProps {
  opened: boolean;
  onClose: () => void;
  courseId: string;
  action: "ban" | "unban";
  isLoading: boolean;
  onSubmit: (data: SetCourseBannedStatusCommand) => void;
}

const AdminSetCourseBannedStatusModal = ({
  opened,
  onClose,
  courseId,
  action,
  isLoading,
  onSubmit,
}: AdminSetCourseBannedStatusModalProps) => {
  // Only need form when action is "ban"
  const form = useForm<BanCourseFormValues>({
    mode: "uncontrolled",
    initialValues: { bannedReason: "" },
    validate: zodResolver(banCourseSchema),
  });

  if (action === "unban") {
    return (
      <Modal opened={opened} onClose={onClose} title="Unban Course" centered>
        <Text size="sm" mb="md">
          Are you sure you want to unban this course? It will become available again.
        </Text>
        <Group justify="end">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button
            color="green"
            loading={isLoading}
            onClick={() => {
              onSubmit({ id: courseId, isBanned: false });
              onClose();
            }}
          >
            Confirm Unban
          </Button>
        </Group>
      </Modal>
    );
  }

  // action = ban
  return (
    <Modal opened={opened} onClose={onClose} title="Ban Course" centered>
      <form
        onSubmit={form.onSubmit((values) => {
          onSubmit({
            id: courseId,
            isBanned: true,
            bannedReason: values.bannedReason,
          });
          form.reset();
          onClose();
        })}
      >
        <Textarea
          label="Ban Reason"
          placeholder="Please provide a reason for banning this course..."
          {...form.getInputProps("bannedReason")}
          key={form.key("bannedReason")}
          autosize
          size="md"
          minRows={3}
        />
        <Group justify="end" mt="md">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button color="red" type="submit" loading={isLoading}>
            Confirm Ban
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default AdminSetCourseBannedStatusModal;
