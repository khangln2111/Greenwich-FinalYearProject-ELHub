import { Badge, Button, Image, Text, TextInput, Title, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Pencil, Plus, Search } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import FileUploadField from "../../../components/media/FileUploadField";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE_MB } from "../../../constants/ValidationConstants";
import CusModal from "../../../components/CusModal";
import { CategoryVm } from "../../../react-query/category/category.types";
import {
  useCreateCategory,
  useGetCategories,
  useUpdateCategory,
} from "../../../react-query/category/categoryHooks";
import CenterLoader from "../../../components/CenterLoader";
import { formSubmitWithFocus } from "../../../utils/form";

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
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [createOpened, { open: openCreate, close: closeCreate }] = useDisclosure(false);
  const [editingCategory, setEditingCategory] = useState<CategoryVm | null>(null);

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isPending, error } = useGetCategories({ name: searchTerm });

  const updateCategory = useUpdateCategory();
  const createCategory = useCreateCategory();

  const editForm = useForm<z.infer<typeof schema>>({
    mode: "uncontrolled",
    initialValues: { name: "", image: "" },
    validate: zodResolver(schema),
  });

  const createForm = useForm<z.infer<typeof schema>>({
    mode: "uncontrolled",
    validate: zodResolver(schema),
  });

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(searchInput.trim());
  };

  const handleEdit = (category: CategoryVm) => {
    setEditingCategory(category);
    editForm.setValues({ name: category.name, image: category.imageUrl || "" });
    openEdit();
  };

  const handleEditSubmit = (values: z.infer<typeof schema>) => {
    if (!editingCategory) return;
    updateCategory.mutate(
      {
        id: editingCategory.id,
        name: values.name.trim(),
        image: values.image instanceof File ? values.image : undefined,
      },
      {
        onSuccess: () => {
          editForm.resetDirty();
          closeEdit();
          setEditingCategory(null);
        },
      },
    );
  };

  const handleCreateSubmit = (values: z.infer<typeof schema>) => {
    if (!(values.image instanceof File)) return;
    createCategory.mutate(
      {
        name: values.name.trim(),
        image: values.image,
      },
      {
        onSuccess: () => {
          createForm.reset();
          closeCreate();
        },
      },
    );
  };

  if (isPending) return <CenterLoader />;
  if (error) return <Text>Error loading categories: {error.message}</Text>;

  const imageEdit = editForm.getValues().image;
  const imageCreate = createForm.getValues().image;

  return (
    <div className="flex-1 p-6 xl:p-8">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <Title order={2}>Categories</Title>
        <div className="flex gap-3">
          <form onSubmit={handleSearchSubmit}>
            <TextInput
              placeholder="Search categories..."
              className="w-60"
              value={searchInput}
              onChange={(e) => setSearchInput(e.currentTarget.value)}
              rightSection={
                <ActionIcon type="submit" variant="subtle" size="lg">
                  <Search className="w-5 h-5 text-gray-500" />
                </ActionIcon>
              }
            />
          </form>

          <Button onClick={openCreate} leftSection={<Plus size={16} />}>
            Add Category
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.items.map((cat) => (
          <div
            key={cat.id}
            className="rounded-2xl border border-gray-200 dark:border-dark-4 overflow-hidden bg-white dark:bg-dark-6
              shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
          >
            <div className="aspect-video overflow-hidden">
              <Image src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" />
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3 className="text-lg font-semibold mb-2">{cat.name}</h3>
              <div className="flex items-center justify-between mt-auto">
                <Badge color="gray" variant="light" radius="sm" size="sm">
                  {cat.courseCount} course{cat.courseCount !== 1 && "s"}
                </Badge>
                <Button
                  variant="default"
                  size="xs"
                  leftSection={<Pencil size={14} />}
                  onClick={() => handleEdit(cat)}
                  className="rounded-lg dark:bg-dark-4 dark:text-white"
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Edit */}
      <CusModal
        opened={editOpened}
        onClose={closeEdit}
        title="Edit Category"
        size="700px"
        footer={
          <div className="flex justify-end gap-4">
            <Button variant="subtle" onClick={closeEdit} type="button">
              Cancel
            </Button>
            <Button
              variant="filled"
              disabled={!editForm.isDirty()}
              onClick={() => formSubmitWithFocus(editForm, handleEditSubmit)()}
            >
              Save
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <TextInput
            label="Category Name"
            {...editForm.getInputProps("name")}
            placeholder="Business"
          />
          <FileUploadField
            label="Category Image"
            accept={ALLOWED_IMAGE_TYPES}
            previewMediaType="image"
            previewUrl={typeof imageEdit === "string" ? imageEdit : undefined}
            description={`Upload an image (JPG, PNG, WEBP - max ${MAX_IMAGE_SIZE_MB}MB)`}
            maxSize={MAX_IMAGE_SIZE_MB * 1024 * 1024}
            {...editForm.getInputProps("image")}
          />
        </form>
      </CusModal>

      {/* Modal: Create */}
      <CusModal
        opened={createOpened}
        onClose={closeCreate}
        title="Create Category"
        size="700px"
        footer={
          <div className="flex justify-end gap-4">
            <Button variant="subtle" onClick={closeCreate} type="button">
              Cancel
            </Button>
            <Button
              variant="filled"
              disabled={!createForm.isValid()}
              onClick={() => formSubmitWithFocus(createForm, handleCreateSubmit)()}
            >
              Create
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <TextInput
            label="Category Name"
            {...createForm.getInputProps("name")}
            placeholder="Business"
          />
          <FileUploadField
            label="Category Image"
            accept={ALLOWED_IMAGE_TYPES}
            previewMediaType="image"
            previewUrl={typeof imageCreate === "string" ? imageCreate : undefined}
            description={`Upload an image (JPG, PNG, WEBP - max ${MAX_IMAGE_SIZE_MB}MB)`}
            maxSize={MAX_IMAGE_SIZE_MB * 1024 * 1024}
            {...createForm.getInputProps("image")}
          />
        </form>
      </CusModal>
    </div>
  );
}
