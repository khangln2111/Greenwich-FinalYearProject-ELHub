import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useModerateCourse } from "../../../../features/course/course.hooks";
import {
  CourseApprovalFormValues,
  courseApprovalSchema,
} from "../../../../features/course/course.schema";
import { Button, Group, Modal, Textarea } from "@mantine/core";

interface AdminModerateCourseModalProps {
  opened: boolean;
  onClose: () => void;
  courseId: string;
  mode: "approve" | "reject";
}

const AdminModerateCourseModal = ({
  opened,
  onClose,
  courseId,
  mode,
}: AdminModerateCourseModalProps) => {
  const reviewCourseMutation = useModerateCourse();

  const form = useForm<CourseApprovalFormValues>({
    mode: "uncontrolled",
    initialValues: { note: "" },
    validate: zodResolver(courseApprovalSchema),
  });

  const isApprove = mode === "approve";

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isApprove ? "Approve Course" : "Reject Course"}
      centered
    >
      <form
        onSubmit={form.onSubmit((values) => {
          reviewCourseMutation.mutate({
            id: courseId,
            isApproved: isApprove,
            note: values.note,
          });
          onClose();
        })}
      >
        <Textarea
          label={isApprove ? "Approval Note" : "Rejection Note"}
          placeholder={
            isApprove ? "Enter approval note..." : "Please provide a reason for rejection..."
          }
          {...form.getInputProps("note")}
          key={form.key("note")}
          autosize
          size="md"
          minRows={3}
        />
        <Group justify="end" mt="md">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button
            color={isApprove ? "green" : "red"}
            type="submit"
            loading={reviewCourseMutation.isPending}
          >
            {isApprove ? "Confirm Approval" : "Confirm Rejection"}
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
export default AdminModerateCourseModal;
