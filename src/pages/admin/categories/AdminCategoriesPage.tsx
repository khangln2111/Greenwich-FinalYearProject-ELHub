import { Button, Image, Text, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import FileUploadField from "../../../components/media/FileUploadField";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE_MB } from "../../../constants/ValidationConstants";
import CusModal from "../../../components/CusModal";
import { CategoryVm } from "../../../react-query/category/category.types";
import { useGetCategories } from "../../../react-query/category/categoryHooks";
import CenterLoader from "../../../components/CenterLoader";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z
    .instanceof(File, { message: "Image is required" })
    .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
      message: "Only PNG, JPG, JPEG, or WEBP images are allowed",
    })
    .refine((file) => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024, {
      message: `Image must be less than ${MAX_IMAGE_SIZE_MB}MB`,
    })
    .or(z.string()),
});

export default function AdminCategoriesPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [editingCategory, setEditingCategory] = useState<CategoryVm | null>(null);
  const { data, isPending, error } = useGetCategories();

  const form = useForm<z.infer<typeof schema>>({
    mode: "uncontrolled",
    initialValues: {
      name: editingCategory?.name || "",
      image: editingCategory?.imageUrl || "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = (values: z.infer<typeof schema>) => {
    const payload = {
      name: values.name.trim(),
      image: values.image instanceof File ? values.image : undefined,
    };

    console.log("Submitting", payload);
    close();
  };

  const handleEdit = (category: CategoryVm) => {
    setEditingCategory(category);
    form.setValues({
      name: category.name,
      image: category.imageUrl || "",
    });
    open();
  };

  const image = form.getValues().image;

  if (isPending) return <CenterLoader />;
  if (error) return <Text>Error loading categories: {error.message}</Text>;

  console.log("Categories data:", data);

  return (
    <div className="flex-1 p-6 xl:p-8">
      <Title order={2} className="mb-6">
        Categories
      </Title>

      {/* Grid of category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.items.map((cat) => (
          <div
            key={cat.id}
            className="bg-white dark:bg-dark-6 border border-gray-200 dark:border-dark-4 rounded-2xl shadow-sm
              hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <div className="aspect-video bg-gray-100 dark:bg-zinc-800">
              <Image src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" />
            </div>

            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold">{cat.name}</h3>
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                {cat.courseCount} course{cat.courseCount !== 1 && "s"}
              </p>
              <Button
                variant="light"
                size="xs"
                leftSection={<Pencil size={16} />}
                onClick={() => handleEdit(cat)}
                className="mt-2 self-start"
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal edit category */}
      <CusModal
        opened={opened}
        onClose={close}
        title="Edit Category"
        size="700px"
        footer={
          <div className="flex gap-4 justify-end items-center">
            <Button variant="subtle" onClick={close} type="button">
              Cancel
            </Button>
            <Button variant="filled" type="submit" disabled={!form.isDirty()}>
              Save
            </Button>
          </div>
        }
      >
        <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
          <TextInput
            label="Category Name"
            placeholder="Enter category name"
            {...form.getInputProps("name")}
            key={form.key("name")}
          />

          <FileUploadField
            label="Category Image"
            accept={ALLOWED_IMAGE_TYPES}
            previewMediaType="image"
            previewUrl={typeof image === "string" ? image : undefined}
            maxSize={MAX_IMAGE_SIZE_MB * 1024 * 1024}
            {...form.getInputProps("image")}
            key={form.key("image")}
          />
        </form>
      </CusModal>
    </div>
  );
}
