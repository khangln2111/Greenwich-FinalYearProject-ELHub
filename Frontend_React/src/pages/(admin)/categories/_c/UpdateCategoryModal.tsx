import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import FileUploadField from "../../../../components/media/FileUploadField";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE_MB } from "../../../../constants/ValidationConstants";
import {
  UpdateCategoryFormValues,
  updateCategorySchema,
} from "../../../../features/category/category.schema";
import { CategoryVm, UpdateCategoryCommand } from "../../../../features/category/category.types";
import { useUpdateCategory } from "../../../../features/category/category.hooks";
import { formSubmitWithFocus } from "../../../../utils/form";
import CusModal from "../../../../components/CusModal/CusModal";

interface Props {
  opened: boolean;
  onClose: () => void;
  category: CategoryVm | null;
}

const UpdateCategoryModal = ({ opened, onClose, category }: Props) => {
  const form = useForm<UpdateCategoryFormValues>({
    mode: "uncontrolled",
    initialValues: { name: category?.name ?? "", image: category?.imageUrl ?? "" },
    validate: zodResolver(updateCategorySchema),
  });

  const { mutate, isPending } = useUpdateCategory();

  const handleSubmit = (values: UpdateCategoryFormValues) => {
    if (!category) return;
    const payload: UpdateCategoryCommand = {
      id: category.id,
      name: values.name.trim(),
      image: values.image instanceof File ? values.image : undefined,
    };
    mutate(payload, {
      onSuccess: () => {
        form.resetDirty();
        onClose();
      },
    });
  };

  const image = form.getValues().image;

  return (
    <CusModal
      opened={opened}
      onClose={onClose}
      title="Edit Category"
      size="700px"
      footer={
        <div className="flex justify-end gap-4">
          <Button variant="subtle" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="filled"
            disabled={!form.isDirty()}
            loading={isPending}
            onClick={() => formSubmitWithFocus(form, handleSubmit)()}
          >
            Save
          </Button>
        </div>
      }
    >
      <form className="space-y-4">
        <TextInput
          label="Category Name"
          {...form.getInputProps("name")}
          key={form.key("name")}
          placeholder="Business"
        />
        <FileUploadField
          label="Category Image"
          accept={ALLOWED_IMAGE_TYPES}
          previewMediaType="image"
          previewUrl={typeof image === "string" ? image : undefined}
          description={`Upload an image (JPG, PNG, WEBP - max ${MAX_IMAGE_SIZE_MB}MB)`}
          maxSize={MAX_IMAGE_SIZE_MB * 1024 * 1024}
          {...form.getInputProps("image")}
          key={form.key("image")}
        />
      </form>
    </CusModal>
  );
};

export default UpdateCategoryModal;
