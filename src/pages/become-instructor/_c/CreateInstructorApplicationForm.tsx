import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import FileUploadField from "../../../components/media/FileUploadField";
import { CreateInstructorApplicationCommand } from "../../../react-query/instructorApplication/instructorApplication.types";
import { useCreateInstructorApplication } from "../../../react-query/instructorApplication/instructorApplicationHooks";
import { ALLOWED_IMAGE_TYPES } from "../../../constants/ValidationConstants";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  professionalTitle: z.string().min(1, "Professional title is required"),
  about: z.string().min(1, "About section is required"),
  avatar: z.instanceof(File, { message: "Avatar is required" }),
});

type Props = {
  onCancel?: () => void;
};

const CreateInstructorApplicationForm = ({ onCancel }: Props) => {
  const form = useForm<CreateInstructorApplicationCommand>({
    validate: zodResolver(schema),
  });

  const { mutate: createApplication, isPending } = useCreateInstructorApplication();

  const handleSubmit = (values: CreateInstructorApplicationCommand) => {
    createApplication(values, {
      onSuccess: () => {
        form.reset();
        if (onCancel) onCancel();
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
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
