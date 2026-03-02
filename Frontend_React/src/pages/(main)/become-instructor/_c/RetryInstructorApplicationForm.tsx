import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { zodResolver } from "mantine-form-zod-resolver";
import CenterLoader from "../../../../components/CenterLoader/CenterLoader";
import FileUploadField from "../../../../components/media/FileUploadField";
import { ALLOWED_IMAGE_TYPES } from "../../../../constants/ValidationConstants";
import {
  useGetRetryInfoSelf,
  useResubmitInstructorApplication,
} from "../../../../features/instructorApplication/instructorApplication.hooks";
import {
  RetryInstructorApplicationFormValues,
  retryInstructorApplicationSchema,
} from "../../../../features/instructorApplication/instructorApplication.schema";
import {
  InstructorApplicationVm,
  ResubmitInstructorApplicationCommand,
} from "../../../../features/instructorApplication/instructorApplication.types";
import { formSubmitWithFocus } from "../../../../utils/form";

type Props = {
  application: InstructorApplicationVm;
  onCancel?: () => void;
};

const RetryInstructorApplicationForm = ({ application, onCancel }: Props) => {
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

  const { mutate: retryApplication, isPending } = useResubmitInstructorApplication();
  const { data: retryInfo, isPending: isRetryPending } = useGetRetryInfoSelf();

  const handleSubmit = (values: RetryInstructorApplicationFormValues) => {
    const payload: ResubmitInstructorApplicationCommand = {
      firstName: values.firstName || application.firstName,
      lastName: values.lastName || application.lastName,
      professionalTitle: values.professionalTitle || application.professionalTitle,
      about: values.about || application.about,
      avatar: values.avatar instanceof File ? values.avatar : undefined,
    };
    retryApplication(payload);
  };

  if (isRetryPending) return <CenterLoader />;

  const retryMessage = retryInfo
    ? retryInfo.canRetry
      ? `You can retry now (${retryInfo.retryRemaining} retries left)`
      : `You can retry after ${dayjs(retryInfo.retryAvailableAt).format(
          "HH:mm YYYY-MM-DD",
        )} (${retryInfo.retryRemaining} retries left)`
    : null;

  return (
    <form onSubmit={formSubmitWithFocus(form, handleSubmit)}>
      <Stack>
        {(application.note || retryMessage) && (
          <div
            className="bg-red-50 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200
              p-4 rounded text-sm space-y-3"
          >
            <p>
              <strong>Your application was rejected</strong>
            </p>
            {application.note && (
              <p>
                <strong>Reason:</strong> {application.note}
              </p>
            )}
            {retryMessage && <p>{retryMessage}</p>}
          </div>
        )}

        <Group grow>
          <TextInput
            label="First Name"
            size="md"
            placeholder="e.g. John"
            {...form.getInputProps("firstName")}
            key={form.key("firstName")}
          />
          <TextInput
            label="Last Name"
            size="md"
            placeholder="e.g. Doe"
            {...form.getInputProps("lastName")}
            key={form.key("lastName")}
          />
        </Group>

        <TextInput
          label="Professional Title"
          size="md"
          placeholder="e.g. Senior Web Developer, Data Scientist..."
          {...form.getInputProps("professionalTitle")}
          key={form.key("professionalTitle")}
        />
        <Textarea
          label="About"
          placeholder="Tell us about your teaching experience, background, and why you want to become an instructor."
          autosize
          size="md"
          minRows={4}
          {...form.getInputProps("about")}
          key={form.key("about")}
        />
        <FileUploadField
          previewMediaType="image"
          previewUrl={application.avatarUrl}
          label="Avatar"
          description="Upload a professional-looking avatar (JPG, PNG, WEBP)"
          accept={ALLOWED_IMAGE_TYPES}
          {...form.getInputProps("avatar")}
          key={form.key("avatar")}
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
