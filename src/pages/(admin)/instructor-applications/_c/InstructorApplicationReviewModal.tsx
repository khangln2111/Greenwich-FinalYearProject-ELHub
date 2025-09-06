import { Button, Group, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import CusModal from "../../../../components/CusModal/CusModal";
import {
  ReviewCourseFormValues,
  reviewCourseSchema,
} from "../../../../features/course/course.schema";
import {
  InstructorApplicationVm,
  ModerateInstructorApplicationCommand,
} from "../../../../features/instructorApplication/instructorApplication.types";
import { formSubmitWithFocus } from "../../../../utils/form";

interface Props {
  app: InstructorApplicationVm | null;
  approveMode: boolean;
  opened: boolean;
  onClose: () => void;
  onSubmit: (payload: ModerateInstructorApplicationCommand) => void;
  isSubmitting: boolean;
}

export default function InstructorApplicationReviewModal({
  app,
  approveMode,
  opened,
  onClose,
  onSubmit,
  isSubmitting,
}: Props) {
  const form = useForm<ReviewCourseFormValues>({
    initialValues: { note: "" },
    validate: zodResolver(reviewCourseSchema),
  });

  const handleSubmit = () => {
    if (!app) return;
    const result = form.validate();
    if (!result.hasErrors) {
      onSubmit({
        id: app.id,
        isApproved: approveMode,
        note: form.values.note.trim(),
      });
    }
  };

  return (
    <CusModal
      title={approveMode ? "Approve Application" : "Reject Application"}
      opened={opened}
      onClose={onClose}
      size="400px"
    >
      <form onSubmit={formSubmitWithFocus(form, handleSubmit)}>
        <Stack>
          <Textarea
            size="md"
            label={approveMode ? "Approval Note" : "Rejection Note"}
            placeholder={
              approveMode ? "Provide reason for approval" : "Provide reason for rejection"
            }
            minRows={3}
            {...form.getInputProps("note")}
            required
          />
          <Group justify="flex-end">
            <Button variant="subtle" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting} color={approveMode ? "green" : "red"}>
              Confirm
            </Button>
          </Group>
        </Stack>
      </form>
    </CusModal>
  );
}
