import { useState } from "react";
import { Plus } from "lucide-react";
import { Button, Modal, Select, TextInput, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CourseStatus } from "../../../react-query/course/course.types";
import InstructorCourseCard from "./_c/InstructorCourseCard";

export type InstructorCourse = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  status: CourseStatus;
  price: number;
  stats: {
    students: number;
    lectures: number;
    duration: string;
  };
};

const sampleCourses: InstructorCourse[] = [
  {
    id: "1",
    title: "React for Beginners",
    description: "Learn the basics of React from scratch.",
    thumbnail: "https://cdn.pixabay.com/photo/2025/04/17/12/03/girl-9540346_1280.jpg",
    status: CourseStatus.Draft,
    price: 49.99,
    stats: {
      students: 1240,
      lectures: 25,
      duration: "5h 30m",
    },
  },
  {
    id: "2",
    title: "Advanced TypeScript",
    description: "Deep dive into TypeScript features.",
    thumbnail: "https://cdn.pixabay.com/photo/2025/03/30/13/01/fairy-tale-9502808_1280.jpg",
    status: CourseStatus.Published,
    price: 79.0,
    stats: {
      students: 980,
      lectures: 18,
      duration: "4h 10m",
    },
  },
  {
    id: "3",
    title: "UI/UX Design Basics",
    description: "Design fundamentals for web apps.",
    thumbnail: "https://cdn.pixabay.com/photo/2025/01/18/14/05/architecture-9342358_1280.jpg",
    status: CourseStatus.Pending,
    price: 59.5,
    stats: {
      students: 675,
      lectures: 12,
      duration: "3h 20m",
    },
  },
];

export default function InstructorCoursesPage() {
  const [filter, setFilter] = useState<CourseStatus | "all">("all");
  const [opened, { open, close }] = useDisclosure(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    thumbnail: "",
    videoUrl: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setNewCourse((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateCourse = () => {
    console.log("Creating course:", newCourse);
    // TODO: Replace with API call
    close();
    setNewCourse({ title: "", description: "", thumbnail: "", videoUrl: "" });
  };

  const filteredCourses =
    filter === "all" ? sampleCourses : sampleCourses.filter((c) => c.status === filter);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">My Courses</h1>
        <div className="flex gap-3">
          <Button
            onClick={open}
            leftSection={<Plus className="size-4" />}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow px-4 py-2 transition-colors"
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
            onChange={(val) => setFilter(val as CourseStatus | "all")}
            placeholder="Filter by status"
            className="w-[200px]"
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

      <Modal
        opened={opened}
        onClose={close}
        title="Create New Course"
        centered
        overlayProps={{ blur: 5, backgroundOpacity: 0.4 }}
      >
        <div className="space-y-4">
          <TextInput
            label="Title"
            placeholder="Enter course title"
            value={newCourse.title}
            onChange={(e) => handleInputChange("title", e.currentTarget.value)}
          />
          <Textarea
            label="Description"
            placeholder="Enter course description"
            value={newCourse.description}
            onChange={(e) => handleInputChange("description", e.currentTarget.value)}
          />
          <TextInput
            label="Thumbnail URL"
            placeholder="https://example.com/image.jpg"
            value={newCourse.thumbnail}
            onChange={(e) => handleInputChange("thumbnail", e.currentTarget.value)}
          />
          <TextInput
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
