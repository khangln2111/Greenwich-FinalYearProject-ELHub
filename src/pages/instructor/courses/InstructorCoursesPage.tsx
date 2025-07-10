import { Button, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { GraduationCap, Plus } from "lucide-react";
import { useState } from "react";
import { CourseStatus } from "../../../react-query/course/course.types";
import { useGetCourses } from "../../../react-query/course/courseHooks";
import CreateCourseModal from "./_c/CreateCourseModal";
import InstructorCourseCard from "./_c/InstructorCourseCard";
import InstructorCourseCardSkeleton from "./_c/InstructorCourseCardSkeleton";

export default function InstructorCoursesPage() {
  const [filter, setFilter] = useState<CourseStatus | "all">("all");
  const [createCourseModalOpened, { open: openCreateCourseModal, close: closeCreateCourseModal }] =
    useDisclosure(false);

  const { data: courses, isPending: isCoursesPending } = useGetCourses();

  const filteredCourses =
    filter === "all"
      ? (courses?.items ?? [])
      : (courses?.items.filter((c) => c.status === filter) ?? []);

  return (
    <div className="flex-1 p-6 xl:p-8 @container">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">My Courses</h1>
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={openCreateCourseModal}
            leftSection={<Plus className="size-4" />}
            size="sm"
            className="flex-1 px-0"
          >
            New Course
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

      {/* Courses grid or loading or empty state */}
      <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 gap-6">
        {isCoursesPending &&
          Array.from({ length: 9 }).map((_, i) => <InstructorCourseCardSkeleton key={i} />)}

        {!isCoursesPending && filteredCourses.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center text-center py-16">
            <GraduationCap size={48} className="mb-4 text-blue" />
            <p className="text-lg font-medium mb-1">You haven’t created any courses yet</p>
            <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">
              Start building your course to share knowledge with others.
            </p>
            <Button
              onClick={openCreateCourseModal}
              leftSection={<Plus className="size-4" />}
              size="sm"
            >
              New Course
            </Button>
          </div>
        ) : (
          filteredCourses.map((course) => <InstructorCourseCard key={course.id} course={course} />)
        )}
      </div>

      {/* Modal */}
      <CreateCourseModal opened={createCourseModalOpened} onClose={closeCreateCourseModal} />
    </div>
  );
}
