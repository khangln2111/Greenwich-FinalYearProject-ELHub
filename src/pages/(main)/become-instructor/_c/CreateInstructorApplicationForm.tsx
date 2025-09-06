import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import FileUploadField from "../../../../components/media/FileUploadField";
import { ALLOWED_IMAGE_TYPES } from "../../../../constants/ValidationConstants";
import {
  CreateInstructorApplicationFormValues,
  createInstructorApplicationSchema,
} from "../../../../features/instructorApplication/instructorApplication.schema";
import { CreateInstructorApplicationCommand } from "../../../../features/instructorApplication/instructorApplication.types";
import { useCreateInstructorApplication } from "../../../../features/instructorApplication/instructorApplication.hooks";
import { formSubmitWithFocus } from "../../../../utils/form";

type CreateInstructorApplicationFormProps = {
  onCancel?: () => void;
};

const CreateInstructorApplicationForm = ({ onCancel }: CreateInstructorApplicationFormProps) => {
  const form = useForm<CreateInstructorApplicationFormValues>({
    mode: "uncontrolled",
    validate: zodResolver(createInstructorApplicationSchema),
  });

  const { mutate: createApplication, isPending } = useCreateInstructorApplication();

  const handleSubmit = (values: CreateInstructorApplicationFormValues) => {
    const payload: CreateInstructorApplicationCommand = {
      firstName: values.firstName,
      lastName: values.lastName,
      professionalTitle: values.professionalTitle,
      about: values.about,
      avatar: values.avatar,
    };
    createApplication(payload, {
      onSuccess: () => {
        form.reset();
        if (onCancel) onCancel();
      },
    });
  };

  return (
    <form onSubmit={formSubmitWithFocus(form, handleSubmit)} noValidate>
      <Stack>
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
          size="md"
          placeholder="Tell us about your teaching experience, background, and why you want to become an instructor."
          autosize
          minRows={4}
          {...form.getInputProps("about")}
        />

        <FileUploadField
          previewMediaType="image"
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
          <Button type="submit" loading={isPending}>
            Submit Application
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default CreateInstructorApplicationForm;
