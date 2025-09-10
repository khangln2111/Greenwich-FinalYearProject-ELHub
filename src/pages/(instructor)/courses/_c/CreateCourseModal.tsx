import { Button, NumberInput, Select, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  ArrowUpNarrowWide,
  DollarSign,
  FileType,
  ScrollText,
  TagsIcon,
  TicketPercent,
} from "lucide-react";
import { zodResolver } from "mantine-form-zod-resolver";
import CusModal from "../../../../components/CusModal/CusModal";
import FileUploadField from "../../../../components/media/FileUploadField";
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  MAX_IMAGE_SIZE_MB,
  MAX_VIDEO_SIZE_MB,
} from "../../../../constants/ValidationConstants";
import { useGetCategories } from "../../../../features/category/category.hooks";
import { useCreateCourse } from "../../../../features/course/course.hooks";
import {
  CreateCourseFormValues,
  createCourseSchema,
} from "../../../../features/course/course.schema";
import { CourseLevel, CreateCourseCommand } from "../../../../features/course/course.types";
import { mockCourses } from "../../../../features/mockData";
import { formSubmitWithFocus } from "../../../../utils/form";

type CreateCourseModalProps = {
  opened: boolean;
  onClose: () => void;
};

export default function CreateCourseModal({ opened, onClose }: CreateCourseModalProps) {
  const form = useForm<CreateCourseFormValues>({
    mode: "uncontrolled",
    validate: zodResolver(createCourseSchema),
  });

  const { data: categories, isPending, isError } = useGetCategories();
  const createCourseMutation = useCreateCourse();

  const handleSubmit = async (values: typeof form.values) => {
    const payload: CreateCourseCommand = {
      title: values.title,
      summary: values.summary,
      price: values.price,
      discountedPrice: values.discountedPrice,
      level: values.level,
      categoryId: values.categoryId,
      image: values.image,
      promoVideo: values.promoVideo,
    };
    createCourseMutation.mutate(payload, {
      onSuccess: () => {
        form.reset();
        onClose();
      },
    });
  };

  return (
    <CusModal
      opened={opened}
      keepMounted={false}
      onClose={onClose}
      title="Create New Course"
      footer={
        <div className="flex gap-4 justify-end items-center flex-wrap">
          <Button
            variant="light"
            size="xs"
            onClick={() => {
              const random = mockCourses[Math.floor(Math.random() * mockCourses.length)];
              form.setValues({
                title: random.title,
                summary: random.summary,
                price: random.price,
                discountedPrice: random.discountedPrice,
                level: random.level,
              });
            }}
          >
            🎲 Fill with random data
          </Button>
          <Button variant="subtle" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={formSubmitWithFocus(form, handleSubmit)}
            variant="filled"
            loading={createCourseMutation.isPending}
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
          placeholder="e.g: Mastering TypeScript for Beginners"
          leftSection={<FileType className="size-4 text-gray-500" />}
          {...form.getInputProps("title")}
          key={form.key("title")}
        />

        <Textarea
          size="md"
          label="Summary"
          placeholder="e.g: A complete guide to TypeScript from scratch with real-world projects"
          autosize
          leftSection={<ScrollText className="size-4 text-gray-500" />}
          {...form.getInputProps("summary")}
          key={form.key("summary")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
          <NumberInput
            size="md"
            min={0}
            clampBehavior="strict"
            label="Price"
            placeholder="e.g: 199.99"
            leftSection={<DollarSign className="size-4 text-gray-500" />}
            {...form.getInputProps("price")}
            key={form.key("price")}
          />
          <NumberInput
            size="md"
            min={0}
            clampBehavior="strict"
            label="Discounted Price"
            placeholder="e.g: 99.99 (must be less than price)"
            leftSection={<TicketPercent className="size-4 text-gray-500" />}
            {...form.getInputProps("discountedPrice")}
            key={form.key("discountedPrice")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
          <Select
            placeholder={
              isPending
                ? "Loading categories..."
                : isError
                  ? "Failed to load"
                  : "Select category for course"
            }
            data={categories?.items.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
            disabled={isPending || isError}
            label="Category"
            size="md"
            searchable
            clearable
            checkIconPosition="right"
            leftSection={<TagsIcon className="size-4" />}
            comboboxProps={{
              shadow: "xl",
              transitionProps: { transition: "pop-top-left" },
            }}
            {...form.getInputProps("categoryId")}
            key={form.key("categoryId")}
          />
          <Select
            data={[
              { label: "Beginner", value: CourseLevel.Beginner },
              { label: "Intermediate", value: CourseLevel.Intermediate },
              { label: "Advanced", value: CourseLevel.Advanced },
              { label: "All Levels", value: CourseLevel.All },
            ]}
            size="md"
            label="Course level"
            placeholder="Select: Beginner, Intermediate, Advanced, All Levels"
            leftSection={<ArrowUpNarrowWide className="size-4" />}
            {...form.getInputProps("level")}
            key={form.key("level")}
          />
        </div>

        <FileUploadField
          label="Course Image"
          accept={ALLOWED_IMAGE_TYPES}
          previewMediaType="image"
          description={`Upload an image (JPG, PNG, WEBP - max ${MAX_IMAGE_SIZE_MB}MB)`}
          maxSize={MAX_IMAGE_SIZE_MB * 1024 * 1024}
          {...form.getInputProps("image")}
          key={form.key("image")}
        />

        <FileUploadField
          label="Promotional Video"
          accept={ALLOWED_VIDEO_TYPES}
          previewMediaType="video"
          description={`Upload a video (MP4, WebM, OGG - max ${MAX_VIDEO_SIZE_MB}MB)`}
          maxSize={MAX_VIDEO_SIZE_MB * 1024 * 1024}
          {...form.getInputProps("promoVideo")}
          key={form.key("promoVideo")}
        />
      </form>
    </CusModal>
  );
}
