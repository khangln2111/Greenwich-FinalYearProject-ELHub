// CurriculumManager/CreateSectionModal.tsx
import { Button, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FileType, ScrollText } from "lucide-react";
import { z } from "zod";
import CusModal from "../../../../../components/CusModal";
import { CreateSectionCommand } from "../../../../../react-query/section/section.types";
import { useCreateSection } from "../../../../../react-query/section/sectionHooks";
import { formSubmitWithFocus } from "../../../../../utils/form";
import { zodResolver } from "mantine-form-zod-resolver";

interface CreateSectionModalProps {
  opened: boolean;
  onClose: () => void;
  courseId: string;
}

export const CreateSectionFormSchema = z.object({
  title: z.string({ message: "Title is required" }).min(1, "Title must be at least 1 character"),
  description: z
    .string({ message: "Description is required" })
    .min(1, "Description must be at least 1 character"),
});

export type CreateSectionFormValues = z.infer<typeof CreateSectionFormSchema>;

export const CreateSectionModal = ({ opened, onClose, courseId }: CreateSectionModalProps) => {
  const form = useForm<CreateSectionFormValues>({
    mode: "uncontrolled",
    validate: zodResolver(CreateSectionFormSchema),
  });

  const createSectionMutation = useCreateSection();

  const handleCreateSection = (values: CreateSectionFormValues) => {
    const payload: CreateSectionCommand = {
      title: values.title,
      description: values.description,
      courseId: courseId,
    };

    createSectionMutation.mutate(payload, {
      onSuccess: () => {
        form.reset();
        onClose();
      },
    });
  };

  return (
    <CusModal
      opened={opened}
      onClose={onClose}
      title="Create New Section"
      keepMounted
      footer={
        <div className="flex gap-4 justify-end items-center">
          <Button variant="subtle" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            variant="filled"
            loading={createSectionMutation.isPending}
            type="submit"
            onClick={formSubmitWithFocus(form, handleCreateSection)}
          >
            Save
          </Button>
        </div>
      }
    >
      <form className="space-y-6" noValidate>
        <TextInput
          size="md"
          label="Title"
          placeholder="Enter section title"
          leftSection={<FileType className="size-4 text-gray-500" />}
          {...form.getInputProps("title")}
          key={form.key("title")}
        />

        <Textarea
          size="md"
          label="Description"
          placeholder="Enter section description"
          autosize
          leftSection={<ScrollText className="size-4 text-gray-500" />}
          {...form.getInputProps("description")}
          key={form.key("description")}
        />
      </form>
    </CusModal>
  );
};
