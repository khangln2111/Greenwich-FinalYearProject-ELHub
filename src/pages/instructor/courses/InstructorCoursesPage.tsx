import { Button, NumberInput, Select, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { DollarSign, FileText, Info, Plus, Tag } from "lucide-react";
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
import { CourseStatus } from "../../../react-query/course/course.types";
import { mockCourses } from "../../../react-query/mockData";
import InstructorCourseCard from "./_c/InstructorCourseCard";

// Zod schema with file validation
const createCourseSchema = z
  .object({
    title: z.string({ message: "Title is required" }).min(3, "Title must be at least 3 characters"),
    description: z
      .string({ message: "Description is required" })
      .min(10, "Description must be at least 10 characters"),
    price: z.number({ message: "Price is required" }).min(0, { message: "Price must be >= 0" }),
    discountedPrice: z
      .number({ message: "Discounted price is required" })
      .min(0, { message: "Discounted price must be >= 0" }),
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
  })
  .refine((data) => data.price >= data.discountedPrice, {
    message: "Discounted price must be less than or equal to the original price",
  });

type CreateCourseFormValues = z.infer<typeof createCourseSchema>;

export default function InstructorCoursesPage() {
  const [filter, setFilter] = useState<CourseStatus | "all">("all");
  const [opened, { open, close }] = useDisclosure(false);

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
    formData.append("discountedPrice", String(form.getValues().discountedPrice));
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

          <div className="flex flex-col sm:flex-row gap-4">
            <NumberInput
              size="md"
              label="Price"
              placeholder="Enter course price"
              leftSection={<DollarSign className="size-4 text-gray-500" />}
              {...form.getInputProps("price")}
              className="flex-1"
            />
            <NumberInput
              size="md"
              label="Discounted Price"
              placeholder="Enter discounted price"
              leftSection={<Tag className="size-4 text-gray-500" />}
              {...form.getInputProps("discountedPrice")}
              className="flex-1"
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
