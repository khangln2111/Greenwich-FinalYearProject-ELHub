import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import FileUploadField from "../../../../components/media/FileUploadField";
import { ALLOWED_IMAGE_TYPES } from "../../../../constants/ValidationConstants";
import {
  RetryInstructorApplicationFormValues,
  retryInstructorApplicationSchema,
} from "../../../../features/instructorApplication/instructorApplication.schema";
import {
  InstructorApplicationVm,
  RetryInstructorApplicationCommand,
} from "../../../../features/instructorApplication/instructorApplication.types";
import { useRetryInstructorApplication } from "../../../../features/instructorApplication/instructorApplicationHooks";
import { formSubmitWithFocus } from "../../../../utils/form";

type RetryInstructorApplicationFormProps = {
  application: InstructorApplicationVm;
  onCancel?: () => void;
};

const RetryInstructorApplicationForm = ({
  application,
  onCancel,
}: RetryInstructorApplicationFormProps) => {
  const form = useForm<RetryInstructorApplicationFormValues>({
    initialValues: {
      firstName: application.firstName ?? "",
      lastName: application.lastName ?? "",
      professionalTitle: application.professionalTitle ?? "",
      about: application.about ?? "",
      avatar: undefined,
    },
    validate: zodResolver(retryInstructorApplicationSchema),
  });

  const { mutate: retryApplication, isPending } = useRetryInstructorApplication();

  const handleSubmit = (values: RetryInstructorApplicationFormValues) => {
    const payload: RetryInstructorApplicationCommand = {
      firstName: values.firstName || application.firstName,
      lastName: values.lastName || application.lastName,
      professionalTitle: values.professionalTitle || application.professionalTitle,
      about: values.about || application.about,
      avatar: values.avatar instanceof File ? values.avatar : undefined,
    };
    retryApplication(payload);
  };

  return (
    <form onSubmit={formSubmitWithFocus(form, handleSubmit)}>
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
        <Group grow>
          <TextInput
            label="First Name"
            size="md"
            placeholder="e.g. John"
            {...form.getInputProps("firstName")}
          />
          <TextInput
            label="Last Name"
            size="md"
            placeholder="e.g. Doe"
            {...form.getInputProps("lastName")}
          />
        </Group>

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
          previewUrl={application.avatarUrl}
          label="Avatar"
          description="Upload a professional-looking avatar (JPG, PNG, WEBP)"
          accept={ALLOWED_IMAGE_TYPES}
          {...form.getInputProps("avatar")}
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
