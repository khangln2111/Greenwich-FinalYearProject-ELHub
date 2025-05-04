import { Button, Modal, Select, TextInput, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CourseStatus } from "../../../react-query/course/course.types";
import { mockCourses } from "../../../react-query/mockData";
import InstructorCourseCard from "./_c/InstructorCourseCard";

export default function InstructorCoursesPage() {
  const [filter, setFilter] = useState<CourseStatus | "all">("all");
  const [opened, { open, close }] = useDisclosure(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setNewCourse((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateCourse = () => {
    console.log("Creating course:", newCourse);
    // TODO: Replace with API call
    close();
    setNewCourse({ title: "", description: "", imageUrl: "", videoUrl: "" });
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

      <Modal opened={opened} onClose={close} title="Create New Course" centered size="xl">
        <div className="space-y-4">
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
          <TextInput
            size="md"
            label="imageUrl URL"
            placeholder="https://example.com/image.jpg"
            value={newCourse.imageUrl}
            onChange={(e) => handleInputChange("imageUrl", e.currentTarget.value)}
          />
          <TextInput
            size="md"
            label="Intro Video URL"
            placeholder="https://example.com/video.mp4"
            value={newCourse.videoUrl}
            onChange={(e) => handleInputChange("videoUrl", e.currentTarget.value)}
          />
          <Button
            onClick={handleCreateCourse}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold w-full mt-4"
          >
            Create Course
          </Button>
        </div>
      </Modal>
    </div>
  );
}
