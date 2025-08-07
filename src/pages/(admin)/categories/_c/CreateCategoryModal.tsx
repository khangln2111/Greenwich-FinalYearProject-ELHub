import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from "zod";
import CusModal from "../../../../components/CusModal";
import FileUploadField from "../../../../components/media/FileUploadField";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE_MB } from "../../../../constants/ValidationConstants";
import { useCreateCategory } from "../../../../react-query/category/categoryHooks";
import { formSubmitWithFocus } from "../../../../utils/form";
import { zodResolver } from "mantine-form-zod-resolver";

const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z
    .instanceof(File, { message: "Image is required" })
    .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
      message: "Only PNG, JPG, JPEG, or WEBP images are allowed",
    })
    .refine((file) => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024, {
      message: `Image must be less than ${MAX_IMAGE_SIZE_MB}MB`,
    }),
});

type CreateCategoryFormValues = z.infer<typeof createCategorySchema>;

interface Props {
  opened: boolean;
  onClose: () => void;
}

export default function CreateCategoryModal({ opened, onClose }: Props) {
  const form = useForm<CreateCategoryFormValues>({
    mode: "uncontrolled",
    validate: zodResolver(createCategorySchema),
  });

  const { mutate, isPending } = useCreateCategory();

  const handleSubmit = (values: CreateCategoryFormValues) => {
    if (!(values.image instanceof File)) return;
    mutate(
      {
        name: values.name.trim(),
        image: values.image,
      },
      {
        onSuccess: () => {
          form.reset();
          onClose();
        },
      },
    );
  };

  const image = form.getValues().image;

  return (
    <CusModal
      opened={opened}
      onClose={onClose}
      title="Create Category"
      size="700px"
      footer={
        <div className="flex justify-end gap-4">
          <Button variant="subtle" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="filled"
            disabled={!form.isValid()}
            loading={isPending}
            onClick={() => formSubmitWithFocus(form, handleSubmit)()}
          >
            Create
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
}
