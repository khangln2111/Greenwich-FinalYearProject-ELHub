import { Button, NumberInput, Select, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  ArrowUpNarrowWide,
  DollarSign,
  FileText,
  Info,
  Plus,
  TagsIcon,
  TicketPercent,
} from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import CusModal from "../../../components/CusModal";
import FileUploadField from "../../../components/FileUploadField";
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  MAX_IMAGE_SIZE_MB,
  MAX_VIDEO_SIZE_MB,
} from "../../../constants/ValidationConstants";
import { useGetCategories } from "../../../react-query/category/categoryHooks";
import { CourseLevel, CourseStatus } from "../../../react-query/course/course.types";
import { mockCourses } from "../../../react-query/mockData";
import InstructorCourseCard from "./_c/InstructorCourseCard";

// Zod schema with file validation

type CreateCourseFormValues = z.infer<typeof createCourseSchema>;

const createCourseSchema = z.object({
  title: z.string({ message: "Title is required" }).min(3, "Title must be at least 3 characters"),
  description: z
    .string({ message: "Description is required" })
    .min(10, "Description must be at least 10 characters"),
  price: z.number({ message: "Price is required" }).min(0, { message: "Price must be >= 0" }),
  discountPercentage: z
    .number({ message: "Discount percentage is required" })
    .min(0, { message: "Discount must be >= 0%" })
    .max(100, { message: "Discount must be <= 100%" }),
  image: z
    .instanceof(File, { message: "Course image is required" })
    .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
      message: "Only JPG, PNG, WEBP images are allowed",
    })
    .refine((file) => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024, {
      message: `Image must be less than ${MAX_IMAGE_SIZE_MB}MB`,
    }),
  video: z
    .instanceof(File, { message: "Promotional video is required" })
    .refine((file) => ALLOWED_VIDEO_TYPES.includes(file.type), {
      message: "Only MP4, WebM, or OGG videos are allowed",
    })
    .refine((file) => file.size <= MAX_VIDEO_SIZE_MB * 1024 * 1024, {
      message: `Video must be less than ${MAX_VIDEO_SIZE_MB}MB`,
    }),
  categoryId: z.string({ message: "Category is required" }).min(1, "Select a category"),
  level: z.enum(
    [CourseLevel.Beginner, CourseLevel.Intermediate, CourseLevel.Advanced, CourseLevel.All],
    {
      required_error: "Level is required",
      invalid_type_error: "Invalid level selected",
    },
  ),
});

export default function InstructorCoursesPage() {
  const [filter, setFilter] = useState<CourseStatus | "all">("all");
  const [opened, { open, close }] = useDisclosure(false);
  const { data: categories, isPending, isError } = useGetCategories();

  const form = useForm<CreateCourseFormValues>({
    mode: "uncontrolled",
    validate: zodResolver(createCourseSchema),
  });

  const handleCreateCourse = async () => {
    const validation = form.validate();
    if (validation.hasErrors) return;

    const formData = new FormData();
    formData.append("title", form.getValues().title);
    formData.append("description", form.getValues().description);
    formData.append("price", String(form.getValues().price));
    formData.append("discountPercentage", String(form.getValues().discountPercentage));
    formData.append("image", form.getValues().image);
    formData.append("video", form.getValues().video);

    try {
      console.log("Submitting course:", Object.fromEntries(formData));
      close();
      form.reset();
    } catch (error) {
      console.error("Error submitting course", error);
    }
  };

  const filteredCourses =
    filter === "all" ? mockCourses : mockCourses.filter((c) => c.status === filter);

  return (
    <div className="flex-1 p-6 xl:p-8">
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">My Courses</h1>
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={open}
            leftSection={<Plus className="size-4" />}
            size="sm"
            className="flex-1"
          >
            Add New Course
          </Button>

          <Select
            data={[
              { label: "All", value: "all" },
              { label: "Draft", value: CourseStatus.Draft },
              { label: "Published", value: CourseStatus.Published },
              { label: "Pending", value: CourseStatus.Pending },
            ]}
            value={filter}
            allowDeselect={false}
            onChange={(val) => setFilter(val as CourseStatus | "all")}
            placeholder="Filter by status"
            className="flex-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <InstructorCourseCard
            key={course.id}
            course={course}
            onEdit={(c) => console.log("Edit", c)}
            onDelete={(id) => console.log("Delete", id)}
          />
        ))}
      </div>

      <CusModal
        opened={opened}
        keepMounted={true}
        onClose={close}
        title="Create New Course"
        footer={
          <div className="flex gap-4 justify-end">
            <Button variant="subtle" onClick={close}>
              Cancel
            </Button>
            <Button onClick={handleCreateCourse} variant="filled">
              Save
            </Button>
          </div>
        }
      >
        <form className="space-y-6" onSubmit={form.onSubmit(handleCreateCourse)}>
          <TextInput
            size="md"
            label="Title"
            placeholder="Enter course title"
            leftSection={<FileText className="size-4 text-gray-500" />}
            {...form.getInputProps("title")}
          />

          <Textarea
            size="md"
            label="Description"
            placeholder="Enter course description"
            autosize
            leftSection={<Info className="size-4 text-gray-500" />}
            {...form.getInputProps("description")}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            {/* Price */}
            <NumberInput
              {...form.getInputProps("price")}
              size="md"
              min={0}
              clampBehavior="strict"
              label="Price"
              placeholder="Enter course price"
              leftSection={<DollarSign className="size-4 text-gray-500" />}
            />
            <NumberInput
              {...form.getInputProps("discountPercentage")}
              size="md"
              label="Discount (%)"
              allowDecimal={false}
              clampBehavior="strict"
              min={0}
              max={100}
              placeholder="Enter discount percentage"
              leftSection={<TicketPercent className="size-4 text-gray-500" />}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            {/* Course category */}
            <Select
              {...form.getInputProps("categoryId")}
              placeholder={
                isPending
                  ? "Loading categories..."
                  : isError
                    ? "Failed to load"
                    : "Select category for course"
              }
              data={categories?.items.map((category) => {
                return { value: category.id, label: category.name };
              })}
              disabled={isPending || isError}
              label="Category"
              size="md"
              searchable
              clearable
              checkIconPosition="right"
              leftSection={<TagsIcon className="size-4" />}
              comboboxProps={{ shadow: "xl", transitionProps: { transition: "pop-top-left" } }}
            />
            {/* Course level */}
            <Select
              {...form.getInputProps("level")}
              data={[
                { label: "Beginner", value: CourseLevel.Beginner },
                { label: "Intermediate", value: CourseLevel.Intermediate },
                { label: "Advanced", value: CourseLevel.Advanced },
                { label: "All Levels", value: CourseLevel.All },
              ]}
              size="md"
              label="Course level"
              placeholder="Levels: Beginner, Intermediate, Advanced, All Levels"
              leftSection={<ArrowUpNarrowWide className="size-4" />}
            />
          </div>

          {/* Image Upload */}
          <FileUploadField
            {...form.getInputProps("image")}
            label="Course Image"
            accept={ALLOWED_IMAGE_TYPES}
            previewMediaType="image"
            description={`Upload an image (JPG, PNG, WEBP - max ${MAX_IMAGE_SIZE_MB}MB)`}
            maxSize={MAX_IMAGE_SIZE_MB * 1024 * 1024}
          />

          {/* Video Upload */}
          <FileUploadField
            {...form.getInputProps("video")}
            label="Promotional Video"
            accept={ALLOWED_VIDEO_TYPES}
            previewMediaType="video"
            description={`Upload a video (MP4, WebM, OGG - max ${MAX_VIDEO_SIZE_MB}MB)`}
            maxSize={MAX_VIDEO_SIZE_MB * 1024 * 1024}
          />
        </form>
      </CusModal>
    </div>
  );
}
