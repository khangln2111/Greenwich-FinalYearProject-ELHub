import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import FileUploadField from "../../../components/media/FileUploadField";
import {
  RetryInstructorApplicationCommand,
  InstructorApplicationVm,
} from "../../../react-query/instructorApplication/instructorApplication.types";
import { useRetryInstructorApplication } from "../../../react-query/instructorApplication/instructorApplicationHooks";
import { ALLOWED_IMAGE_TYPES } from "../../../constants/ValidationConstants";

const schema = z.object({
  displayName: z.string().optional(),
  professionalTitle: z.string().optional(),
  about: z.string().optional(),
  workAvatar: z.instanceof(File).optional(),
});

type Props = {
  application: InstructorApplicationVm;
  onCancel?: () => void;
};

const RetryInstructorApplicationForm = ({ application, onCancel }: Props) => {
  const form = useForm<RetryInstructorApplicationCommand>({
    initialValues: {
      displayName: application.displayName ?? "",
      professionalTitle: application.professionalTitle ?? "",
      about: application.about ?? "",
      workAvatar: undefined,
    },
    validate: zodResolver(schema),
  });

  const { mutate: retryApplication, isPending } = useRetryInstructorApplication();

  const handleSubmit = (values: RetryInstructorApplicationCommand) => {
    retryApplication(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        {application.note && (
          <div
            className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 text-yellow-800
              dark:text-yellow-200 p-4 rounded text-sm"
          >
            <strong>Previous Feedback:</strong>
            <p className="mt-1 whitespace-pre-line">{application.note}</p>
          </div>
        )}

        <TextInput
          label="Display Name"
          placeholder="e.g. John Doe"
          size="md"
          {...form.getInputProps("displayName")}
        />
        <TextInput
          label="Professional Title"
          size="md"
          placeholder="e.g. Senior Web Developer, Data Scientist..."
          {...form.getInputProps("professionalTitle")}
        />
        <Textarea
          label="About"
          placeholder="Tell us about your teaching experience, background, and why you want to become an instructor."
          autosize
          size="md"
          minRows={4}
          {...form.getInputProps("about")}
        />
        <FileUploadField
          previewMediaType="image"
          previewUrl={application.workAvatarUrl}
          label="Work Avatar"
          description="Upload a professional-looking avatar (JPG, PNG, WEBP)"
          accept={ALLOWED_IMAGE_TYPES}
          {...form.getInputProps("workAvatar")}
        />
        <Group justify="flex-end">
          {onCancel && (
            <Button variant="subtle" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" loading={isPending} disabled={!form.isDirty()}>
            Retry Application
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default RetryInstructorApplicationForm;
