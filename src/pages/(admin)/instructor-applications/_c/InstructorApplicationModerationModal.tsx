import { Button, Group, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import CusModal from "../../../../components/CusModal/CusModal";
import {
  ModerateCourseFormValues,
  moderateCourseSchema,
} from "../../../../features/course/course.schema";
import { ModerateInstructorApplicationCommand } from "../../../../features/instructorApplication/instructorApplication.types";
import { formSubmitWithFocus } from "../../../../utils/form";
import { useGetInstructorApplicationById } from "../../../../features/instructorApplication/instructorApplication.hooks";
import CenterLoader from "../../../../components/CenterLoader/CenterLoader";

interface Props {
  id: string;
  approveMode: boolean;
  opened: boolean;
  onClose: () => void;
  onSubmit: (payload: ModerateInstructorApplicationCommand) => void;
  isSubmitting: boolean;
}

export default function InstructorApplicationModerationModal({
  id,
  approveMode,
  opened,
  onClose,
  onSubmit,
  isSubmitting,
}: Props) {
  const form = useForm<ModerateCourseFormValues>({
    initialValues: { note: "" },
    validate: zodResolver(moderateCourseSchema),
  });

  const { data: app, isPending } = useGetInstructorApplicationById(id);

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
      {isPending ? (
        <CenterLoader />
      ) : (
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
      )}
    </CusModal>
  );
}
