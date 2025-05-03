import { useState } from "react";
import { Pencil, Trash, Users, ListOrdered, Clock } from "lucide-react";
import { Button, Select } from "@mantine/core";

type Course = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  status: "draft" | "published" | "pending";
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
    status: "draft",
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
    status: "published",
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
    status: "pending",
    price: 59.5,
    stats: {
      students: 675,
      lectures: 12,
      duration: "3h 20m",
    },
  },
];

const statusBadgeMap = {
  draft: "bg-yellow-100 text-yellow-800",
  published: "bg-green-100 text-green-800",
  pending: "bg-blue-100 text-blue-800",
};

export default function InstructorCoursesPage() {
  const [filter, setFilter] = useState<"all" | "draft" | "published" | "pending">("all");

  const filteredCourses =
    filter === "all" ? sampleCourses : sampleCourses.filter((c) => c.status === filter);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Courses</h1>
        <Select
          data={[
            { label: "All", value: "all" },
            { label: "Draft", value: "draft" },
            { label: "Published", value: "published" },
            { label: "Pending", value: "pending" },
          ]}
          value={filter}
          onChange={(val) => setFilter(val as typeof filter)}
          placeholder="Filter by status"
          className="w-[200px]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white border rounded-2xl shadow p-4 flex flex-col relative"
          >
            {/* 💰 Price label */}
            <div className="absolute top-2 right-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
              ${course.price.toFixed(2)}
            </div>

            <img
              src={course.thumbnail}
              alt={course.title}
              className="rounded-xl h-40 object-cover mb-4"
            />
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-1">{course.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>

              {/* Stats */}
              <div className="mt-4 flex flex-col gap-1 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>{course.stats.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-gray-500" />
                  <span>{course.stats.lectures} lectures</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{course.stats.duration}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${statusBadgeMap[course.status]}`}
              >
                {course.status}
              </span>
              <div className="flex gap-2">
                <Button variant="default" size="xs">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="default" color="red" size="xs">
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
