import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import FileUploadField from "../../../components/media/FileUploadField";
import { CreateInstructorApplicationCommand } from "../../../react-query/instructorApplication/instructorApplication.types";
import { useCreateInstructorApplication } from "../../../react-query/instructorApplication/instructorApplicationHooks";
import { ALLOWED_IMAGE_TYPES } from "../../../constants/ValidationConstants";

const schema = z.object({
  displayName: z.string().min(1, "Display name is required"),
  professionalTitle: z.string().min(1, "Professional title is required"),
  about: z.string().min(1, "About section is required"),
  workAvatar: z.instanceof(File, { message: "Avatar is required" }),
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
        <TextInput
          label="Display Name"
          placeholder="e.g. John Doe"
          {...form.getInputProps("displayName")}
        />
        <TextInput
          label="Professional Title"
          placeholder="e.g. Senior Web Developer, Data Scientist..."
          {...form.getInputProps("professionalTitle")}
        />
        <Textarea
          label="About"
          placeholder="Tell us about your teaching experience, background, and why you want to become an instructor."
          autosize
          minRows={4}
          {...form.getInputProps("about")}
        />
        <FileUploadField
          previewMediaType="image"
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
          <Button type="submit" loading={isPending}>
            Submit Application
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default CreateInstructorApplicationForm;
