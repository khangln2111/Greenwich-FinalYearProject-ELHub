import { Button, Select, TextInput, Textarea } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import { Plus, ImageIcon, VideoIcon, UploadIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import CusModal from "../../../components/CusModal";
import { CourseStatus } from "../../../react-query/course/course.types";
import { mockCourses } from "../../../react-query/mockData";
import InstructorCourseCard from "./_c/InstructorCourseCard";

// Zod schema with file validation
const createCourseSchema = z.object({
  title: z.string({ message: "Title is required" }).min(3, "Title must be at least 3 characters"),
  description: z
    .string({ message: "Description is required" })
    .min(10, "Description must be at least 10 characters"),
  image: z
    .instanceof(File, { message: "Course image is required" })
    .refine((file) => file !== null, "Course image is required.")
    .refine((file) => file.type.startsWith("image/"), "File must be an image")
    .refine(
      (file) => file.size <= 5 * 1024 * 1024, // 5MB max size
      "Image must be less than 5MB",
    ),
  video: z
    .instanceof(File, { message: "Course video is required" })
    .refine((file) => file !== null, "Promotional video is required.")
    .refine((file) => file.type.startsWith("video/"), "File must be a video")
    .refine(
      (file) => ["video/mp4", "video/webm"].includes(file.type),
      "Only MP4/WebM videos are allowed",
    )
    .refine(
      (file) => file.size <= 50 * 1024 * 1024, // 50MB max size
      "Video must be less than 50MB",
    ),
});

type CreateCourseFormValues = z.infer<typeof createCourseSchema>;

export default function InstructorCoursesPage() {
  const [filter, setFilter] = useState<CourseStatus | "all">("all");
  const [opened, { open, close }] = useDisclosure(false);

  // Form setup
  const form = useForm<CreateCourseFormValues>({
    validate: zodResolver(createCourseSchema),
  });

  const imageOpenRef = useRef<() => void>(null);
  const videoOpenRef = useRef<() => void>(null);

  const handleCreateCourse = async () => {
    const formValidation = form.validate();
    if (formValidation.hasErrors) return;

    const formData = new FormData();
    formData.append("title", form.values.title);
    formData.append("description", form.values.description);
    if (form.values.image) formData.append("image", form.values.image);
    if (form.values.video) formData.append("video", form.values.video);

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
            {...form.getInputProps("title")}
          />
          <Textarea
            size="md"
            label="Description"
            placeholder="Enter course description"
            {...form.getInputProps("description")}
          />

          {/* Course Image */}
          <div>
            <label className="block text-md font-medium mb-1">Course image</label>
            <div className="flex flex-col lg:flex-row gap-4">
              <div
                className="w-full lg:w-64 h-36 border border-gray-300 dark:border-gray-600 flex items-center justify-center
                  bg-gray-50 dark:bg-gray-800"
              >
                {form.values.image ? (
                  <img
                    src={URL.createObjectURL(form.values.image)}
                    alt="Course Preview"
                    className="object-cover size-full"
                  />
                ) : (
                  <ImageIcon className="text-gray-400 w-10 h-10" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-sm">
                  Upload your course image here. It must be 750x422px (.jpg, .png, .gif). No text on
                  the image.
                </p>
                <Dropzone
                  openRef={imageOpenRef}
                  onDrop={(files) => {
                    form.setFieldValue("image", files[0]);
                  }}
                  onReject={() => form.setFieldError("image", "Invalid file")}
                  maxFiles={1}
                  accept={{ "image/*": [] }}
                  p={0}
                >
                  <div
                    className={`border rounded-md px-4 py-2 grid grid-cols-[1fr_auto] items-center ${
                      form.errors.image ? "border-red-500" : "border-gray-300" }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm truncate overflow-hidden whitespace-nowrap">
                        {form.values.image?.name ?? "No file selected"}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => imageOpenRef.current?.()}
                      leftSection={<UploadIcon className="w-4 h-4" />}
                    >
                      Upload File
                    </Button>
                  </div>
                </Dropzone>
                {form.errors.image && <p className="text-sm text-red-500">{form.errors.image}</p>}
              </div>
            </div>
          </div>

          {/* Promo Video */}
          <div>
            <label className="block text-md font-medium mb-1">Promotional video</label>
            <div className="flex flex-col lg:flex-row gap-4">
              <div
                className="w-full lg:w-64 h-36 border border-gray-300 dark:border-gray-600 flex items-center justify-center
                  bg-gray-50 dark:bg-gray-800"
              >
                {form.values.video ? (
                  <video
                    src={URL.createObjectURL(form.values.video)}
                    controls
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <VideoIcon className="text-gray-400 w-10 h-10" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Upload a promotional video to help students preview your course. MP4/WebM
                  preferred.
                </p>
                <Dropzone
                  openRef={videoOpenRef}
                  onDrop={(files) => {
                    form.setFieldValue("video", files[0]);
                  }}
                  onReject={() => form.setFieldError("video", "Invalid video file")}
                  maxFiles={1}
                  p={0}
                  accept={{ "video/*": [] }}
                >
                  <div
                    className={`border rounded-md px-4 py-2 grid grid-cols-[1fr_auto] items-center ${
                      form.errors.video ? "border-red-500" : "border-gray-300" }`}
                  >
                    <span className="text-sm line-clamp-1">
                      {form.values.video?.name ?? "No file selected"}
                    </span>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => videoOpenRef.current?.()}
                      leftSection={<UploadIcon className="w-4 h-4" />}
                    >
                      Upload File
                    </Button>
                  </div>
                </Dropzone>
                {form.errors.video && <p className="text-sm text-red-500">{form.errors.video}</p>}
              </div>
            </div>
          </div>
        </form>
      </CusModal>
    </div>
  );
}
