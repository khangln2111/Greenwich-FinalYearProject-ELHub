import { Button, Select, TextInput, Textarea } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import { Plus, ImageIcon, VideoIcon, UploadIcon } from "lucide-react";
import { useState, useRef } from "react";
import CusModal from "../../../components/CusModal";
import { CourseStatus } from "../../../react-query/course/course.types";
import { mockCourses } from "../../../react-query/mockData";
import InstructorCourseCard from "./_c/InstructorCourseCard";

export default function InstructorCoursesPage() {
  const [filter, setFilter] = useState<CourseStatus | "all">("all");
  const [opened, { open, close }] = useDisclosure(false);

  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const [imageError, setImageError] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  const imageOpenRef = useRef<() => void>(null);
  const videoOpenRef = useRef<() => void>(null);

  const handleInputChange = (field: string, value: string) => {
    setNewCourse((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateCourse = async () => {
    let hasError = false;
    if (!imageFile) {
      setImageError("Course image is required.");
      hasError = true;
    } else {
      setImageError(null);
    }

    if (!videoFile) {
      setVideoError("Promotional video is required.");
      hasError = true;
    } else {
      setVideoError(null);
    }

    if (hasError) return;

    const formData = new FormData();
    formData.append("title", newCourse.title);
    formData.append("description", newCourse.description);
    if (imageFile) formData.append("image", imageFile);
    if (videoFile) formData.append("video", videoFile);

    try {
      // TODO: Replace with actual API call
      console.log("Submitting course:", Object.fromEntries(formData));
      close();
      setNewCourse({ title: "", description: "" });
      setImageFile(null);
      setVideoFile(null);
      setImagePreview(null);
      setVideoPreview(null);
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
        <div className="space-y-6">
          <TextInput
            size="md"
            label="Title"
            placeholder="Enter course title"
            value={newCourse.title}
            onChange={(e) => handleInputChange("title", e.currentTarget.value)}
          />
          <Textarea
            size="md"
            label="Description"
            placeholder="Enter course description"
            value={newCourse.description}
            onChange={(e) => handleInputChange("description", e.currentTarget.value)}
          />

          {/* Course Image */}
          <div>
            <label className="block text-md font-medium mb-1">Course image</label>
            <div className="flex flex-col lg:flex-row gap-4">
              <div
                className="w-full lg:w-64 h-36 border border-gray-300 dark:border-gray-600 flex items-center justify-center
                  bg-gray-50 dark:bg-gray-800"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Course Preview"
                    className="object-cover w-full h-full"
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
                    const file = files[0];
                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                    setImageError(null);
                  }}
                  onReject={() => setImageError("Invalid file")}
                  maxFiles={1}
                  accept={{ "image/*": [] }}
                  p={0}
                >
                  <div
                    className={`border rounded-md px-4 py-2 flex justify-between items-center ${
                      imageError ? "border-red-500" : "border-gray-300" }`}
                  >
                    <span className="text-sm">{imageFile?.name ?? "No file selected"}</span>
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
                {imageError && <p className="text-sm text-red-500">{imageError}</p>}
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
                {videoPreview ? (
                  <video src={videoPreview} controls className="w-full h-full object-contain" />
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
                    const file = files[0];
                    setVideoFile(file);
                    setVideoPreview(URL.createObjectURL(file));
                    setVideoError(null);
                  }}
                  onReject={() => setVideoError("Invalid video file")}
                  maxFiles={1}
                  p={0}
                  accept={{ "video/*": [] }}
                >
                  <div
                    className={`border rounded-md px-4 py-2 flex justify-between items-center ${
                      videoError ? "border-red-500" : "border-gray-300" }`}
                  >
                    <span className="text-sm">{videoFile?.name ?? "No file selected"}</span>
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
                {videoError && <p className="text-sm text-red-500">{videoError}</p>}
              </div>
            </div>
          </div>
        </div>
      </CusModal>
    </div>
  );
}
