import { useState } from "react";
import { Pencil, Trash, Users, ListOrdered, Clock, Plus } from "lucide-react";
import { Button, Select, Modal, TextInput, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CourseStatus } from "../../../react-query/course/course.types";

type Course = {
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

const sampleCourses: Course[] = [
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

const statusBadgeMap: Record<CourseStatus, string> = {
  [CourseStatus.Draft]: "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900",
  [CourseStatus.Published]: "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900",
  [CourseStatus.Pending]: "bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-900",
};

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
          <div
            key={course.id}
            className="bg-white dark:bg-dark-6 border border-gray-200 dark:border-dark-4 rounded-2xl shadow p-4 flex
              flex-col relative transition-colors"
          >
            <div className="absolute top-2 right-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
              ${course.price.toFixed(2)}
            </div>

            <img
              src={course.thumbnail}
              alt={course.title}
              className="rounded-xl h-40 object-cover mb-4"
            />
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">
                {course.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {course.description}
              </p>

              <div className="mt-4 flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <Users className="size-4 text-gray-500 dark:text-gray-400" />
                  <span>{course.stats.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <ListOrdered className="size-4 text-gray-500 dark:text-gray-400" />
                  <span>{course.stats.lectures} lectures</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-gray-500 dark:text-gray-400" />
                  <span>{course.stats.duration}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${statusBadgeMap[course.status]}`}
              >
                {course.status}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="default"
                  color="red"
                  size="xs"
                  className="dark:bg-dark-4 dark:text-white"
                >
                  <Trash className="size-4" />
                </Button>
                <Button
                  size="xs"
                  color="primary"
                  variant="default"
                  className="dark:bg-dark-4 dark:text-white"
                >
                  <Pencil className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        opened={opened}
        onClose={close}
        title="Create New Course"
        centered
        overlayProps={{
          blur: 5,
          backgroundOpacity: 0.4,
        }}
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
