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
    initialValues: {
      displayName: "",
      professionalTitle: "",
      about: "",
      workAvatar: undefined as any,
    },
    validate: zodResolver(schema),
  });

  const { mutate: createApplication, isPending } = useCreateInstructorApplication();

  const handleSubmit = (values: CreateInstructorApplicationCommand) => {
    createApplication(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput label="Display Name" {...form.getInputProps("displayName")} />
        <TextInput label="Professional Title" {...form.getInputProps("professionalTitle")} />
        <Textarea label="About" autosize minRows={4} {...form.getInputProps("about")} />
        <FileUploadField
          previewMediaType={"image"}
          label="Work Avatar"
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
