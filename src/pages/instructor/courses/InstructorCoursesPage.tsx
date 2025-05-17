import { Button, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CourseStatus } from "../../../react-query/course/course.types";
import { useGetCourses } from "../../../react-query/course/courseHooks";
import { mockCourses } from "../../../react-query/mockData";
import CreateCourseModal from "./_c/CreateCourseModal";
import InstructorCourseCard from "./_c/InstructorCourseCard";
import InstructorCourseCardSkeleton from "./_c/InstructorCourseCardSkeleton";

// Zod schema with file validation

export default function InstructorCoursesPage() {
  const [filter, setFilter] = useState<CourseStatus | "all">("all");
  const [createCourseModalOpened, { open: openCreateCourseModal, close: closeCreateCourseModal }] =
    useDisclosure(false);
  const { data: courses, isPending: isCoursesPending } = useGetCourses();

  const filteredCourses =
    filter === "all" ? mockCourses : mockCourses.filter((c) => c.status === filter);

  return (
    <div className="flex-1 p-6 xl:p-8">
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">My Courses</h1>
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={openCreateCourseModal}
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

      <CreateCourseModal opened={createCourseModalOpened} onClose={closeCreateCourseModal} />
    </div>
  );
}
