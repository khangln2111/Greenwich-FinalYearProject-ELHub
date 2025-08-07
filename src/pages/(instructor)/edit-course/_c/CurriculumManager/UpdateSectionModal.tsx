// CurriculumManager/CreateSectionModal.tsx
import { Button, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FileType, ScrollText } from "lucide-react";
import { zodResolver } from "mantine-form-zod-resolver";
import CusModal from "../../../../../components/CusModal";
import {
  UpdateSectionFormValues,
  editSectionFormSchema,
} from "../../../../../react-query/section/section.schema";
import { SectionVm, UpdateSectionCommand } from "../../../../../react-query/section/section.types";
import { useUpdateSection } from "../../../../../react-query/section/sectionHooks";
import { formSubmitWithFocus } from "../../../../../utils/form";

interface EditSectionalModalProps {
  opened: boolean;
  onClose: () => void;
  section: SectionVm;
}

export const UpdateSectionModal = ({ opened, onClose, section }: EditSectionalModalProps) => {
  const form = useForm<UpdateSectionFormValues>({
    mode: "uncontrolled",
    initialValues: section,
    validate: zodResolver(editSectionFormSchema),
  });

  const updateSectionMutation = useUpdateSection();

  const handleUpdateSection = (values: UpdateSectionFormValues) => {
    const payload: UpdateSectionCommand = {
      id: values.id,
      title: values.title,
      description: values.description,
    };
    updateSectionMutation.mutate(payload, {
      onSuccess: () => {
        form.resetDirty();
        onClose();
      },
    });
  };

  return (
    <CusModal
      opened={opened}
      onClose={onClose}
      title={`Edit Section ${section.title}`}
      keepMounted
      footer={
        <div className="flex gap-4 justify-end items-center">
          <Button variant="subtle" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            variant="filled"
            loading={updateSectionMutation.isPending}
            type="submit"
            disabled={!form.isDirty()}
            onClick={formSubmitWithFocus(form, handleUpdateSection)}
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
