// CurriculumManager/CreateSectionModal.tsx
import { Modal, TextInput, Textarea, Button } from "@mantine/core";
import { FileType, ScrollText } from "lucide-react";
import { useCreateSection } from "../../../../../react-query/section/sectionHooks";
import { useForm } from "@mantine/form";
import { z } from "zod";
import { CreateSectionCommand } from "../../../../../react-query/section/section.types";
import CusModal from "../../../../../components/CusModal";

interface CreateSectionModalProps {
  opened: boolean;
  onClose: () => void;
  courseId: string;
}

export const CreateSectionFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  courseId: z.string().min(1), // hidden from user, but still validated
});

export type CreateSectionFormValues = z.infer<typeof CreateSectionFormSchema>;

export const CreateSectionModal = ({ opened, onClose, courseId }: CreateSectionModalProps) => {
  const form = useForm<CreateSectionFormValues>({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      description: "",
      courseId: courseId,
    },
  });

  const createSectionMutation = useCreateSection();

  const handleCreateSection = (values: CreateSectionFormValues) => {
    const payload: CreateSectionCommand = {
      title: values.title,
      description: values.description,
      courseId: values.courseId,
    };
    createSectionMutation.mutate(payload, {
      onSuccess: () => {
        form.reset();
        onClose();
      },
    });
  };

  return (
    <CusModal opened={opened} onClose={onClose} title="Create New Section" keepMounted>
      <form className="space-y-6" onSubmit={form.onSubmit(handleCreateSection)} noValidate>
        <TextInput
          size="md"
          label="Title"
          placeholder="Enter section title"
          leftSection={<FileType className="size-4 text-gray-500" />}
          {...form.getInputProps("title")}
        />

        <Textarea
          size="md"
          label="Description"
          placeholder="Enter section description"
          autosize
          leftSection={<ScrollText className="size-4 text-gray-500" />}
          {...form.getInputProps("description")}
        />

        <div className="flex justify-end gap-4 pt-2">
          <Button variant="subtle" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="filled" loading={createSectionMutation.isPending} type="submit">
            Save
          </Button>
        </div>
      </form>
    </CusModal>
  );
};
