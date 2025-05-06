import { Button, NumberInput, Select, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  ArrowUpNarrowWide,
  DollarSign,
  FileText,
  FileType,
  Info,
  Plus,
  ScrollText,
  TagsIcon,
  TicketPercent,
} from "lucide-react";
import { useState } from "react";
import CusModal from "../../../components/CusModal";
import FileUploadField from "../../../components/FileUploadField";
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  MAX_IMAGE_SIZE_MB,
  MAX_VIDEO_SIZE_MB,
} from "../../../constants/ValidationConstants";
import { useGetCategories } from "../../../react-query/category/categoryHooks";
import {
  CourseLevel,
  CourseStatus,
  CreateCourseRequest,
  createCourseSchema,
} from "../../../react-query/course/course.types";
import { useCreateCourse, useGetCourses } from "../../../react-query/course/courseHooks";
import { mockCourses } from "../../../react-query/mockData";
import InstructorCourseCard from "./_c/InstructorCourseCard";
import InstructorCourseCardSkeleton from "./_c/InstructorCourseCardSkeleton";

// Zod schema with file validation

export default function InstructorCoursesPage() {
  const [filter, setFilter] = useState<CourseStatus | "all">("all");
  const [opened, { open, close }] = useDisclosure(false);
  const { data: categories, isPending, isError } = useGetCategories();
  const { data: courses, isPending: isCoursesPending, isError: isCourseError } = useGetCourses();

  const form = useForm<CreateCourseRequest>({
    mode: "uncontrolled",
    validate: zodResolver(createCourseSchema),
  });

  const createCourseMutation = useCreateCourse();

  const handleCreateCourse = async (values: typeof form.values) => {
    const validation = form.validate();
    if (validation.hasErrors) return;
    console.log("Form values:", values);
    createCourseMutation.mutate(values, {
      onSuccess: () => {
        form.reset();
        close();
      },
    });
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
        {isCoursesPending &&
          Array.from({ length: 9 }).map((_, i) => <InstructorCourseCardSkeleton key={i} />)}
        {courses?.items.map((course) => <InstructorCourseCard key={course.id} course={course} />)}
      </div>

      <CusModal
        opened={opened}
        keepMounted={true}
        onClose={close}
        title="Create New Course"
        footer={
          <div className="flex gap-4 justify-end items-center">
            <Button
              variant="light"
              size="xs"
              onClick={() => {
                const random = mockCourses[Math.floor(Math.random() * mockCourses.length)];
                form.setValues({
                  title: random.title,
                  description: random.description,
                  price: random.price,
                  discountPercentage: random.discountPercentage,
                  level: random.level,
                });
              }}
            >
              🎲 Fill with random data
            </Button>
            <Button variant="subtle" onClick={close}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                form.onSubmit(handleCreateCourse, (errors) => {
                  const firstErrorPath = Object.keys(errors)[0];
                  form.getInputNode(firstErrorPath)?.focus();
                })()
              }
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
            placeholder="Enter course title"
            leftSection={<FileType className="size-4 text-gray-500" />}
            {...form.getInputProps("title")}
            key={form.key("title")}
          />

          <Textarea
            size="md"
            label="Description"
            placeholder="Enter course description"
            autosize
            leftSection={<ScrollText className="size-4 text-gray-500" />}
            {...form.getInputProps("description")}
            key={form.key("description")}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            {/* Price */}
            <NumberInput
              size="md"
              min={0}
              clampBehavior="strict"
              label="Price"
              placeholder="Enter course price"
              leftSection={<DollarSign className="size-4 text-gray-500" />}
              {...form.getInputProps("price")}
              key={form.key("price")}
            />
            <NumberInput
              size="md"
              label="Discount (%)"
              allowDecimal={false}
              clampBehavior="strict"
              min={0}
              max={100}
              placeholder="Enter discount percentage"
              leftSection={<TicketPercent className="size-4 text-gray-500" />}
              {...form.getInputProps("discountPercentage")}
              key={form.key("discountPercentage")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            {/* Course category */}
            <Select
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
              {...form.getInputProps("categoryId")}
              key={form.key("categoryId")}
            />
            {/* Course level */}
            <Select
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
              {...form.getInputProps("level")}
              key={form.key("level")}
            />
          </div>

          {/* Image Upload */}
          <FileUploadField
            label="Course Image"
            accept={ALLOWED_IMAGE_TYPES}
            previewMediaType="image"
            description={`Upload an image (JPG, PNG, WEBP - max ${MAX_IMAGE_SIZE_MB}MB)`}
            maxSize={MAX_IMAGE_SIZE_MB * 1024 * 1024}
            {...form.getInputProps("image")}
            key={form.key("image")}
          />

          {/* Video Upload */}
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
    </div>
  );
}
