import { ActionIcon, Button, Select, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { GraduationCap, Plus, SearchIcon } from "lucide-react";
import { parseAsInteger, parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";
import AppPagination from "../../../components/AppPagination/AppPagination";
import { CourseStatus } from "../../../features/course/course.types";
import { useGetCourses } from "../../../features/course/course.hooks";
import CreateCourseModal from "./_c/CreateCourseModal";
import InstructorCourseCard from "./_c/InstructorCourseCard";
import InstructorCourseCardSkeleton from "./_c/InstructorCourseCardSkeleton";
import { useAppStore } from "../../../zustand/stores/appStore";
import { useState } from "react";
import { usePageSEO } from "../../../hooks/usePageSEO";

export default function InstructorCoursesPage() {
  usePageSEO({ title: "My Owned Courses" });
  const [createCourseModalOpened, { open: openCreateCourseModal, close: closeCreateCourseModal }] =
    useDisclosure(false);

  const currentUser = useAppStore((s) => s.currentUser);

  const [status, setStatus] = useQueryState(
    "status",
    parseAsStringLiteral(["All", ...Object.values(CourseStatus)]).withDefault("All"),
  );

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(9));

  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
  const [searchInput, setSearchInput] = useState(search);
  const { data, isPending: isCoursesPending } = useGetCourses({
    page,
    pageSize,
    status: status === "All" ? undefined : status,
    instructorId: currentUser?.id,
    search: search,
  });

  const handleSearchSubmit = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  return (
    <div className="flex-1 p-6 xl:p-8 @container">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-center md:justify-between mb-6 gap-4">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">My Courses</h1>

        {/* Controls: Button + Select + Search */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
          <Button
            onClick={openCreateCourseModal}
            leftSection={<Plus className="size-4" />}
            size="sm"
            className="w-full"
          >
            New Course
          </Button>

          <TextInput
            placeholder="Search courses..."
            className="w-full md:max-w-60"
            value={searchInput}
            onChange={(e) => setSearchInput(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearchSubmit(e);
            }}
            rightSectionPointerEvents="all"
            rightSection={
              search ? (
                <ActionIcon
                  variant="subtle"
                  size="lg"
                  onClick={() => {
                    setSearchInput("");
                    setSearch("");
                    setPage(1);
                  }}
                  aria-label="Clear search"
                >
                  ✕
                </ActionIcon>
              ) : (
                <ActionIcon
                  type="submit"
                  variant="subtle"
                  size="lg"
                  onClick={handleSearchSubmit}
                  aria-label="Search"
                >
                  <SearchIcon className="text-gray-500" size={16} />
                </ActionIcon>
              )
            }
          />

          <Select
            data={[
              { label: "All", value: "All" },
              { label: "Draft", value: CourseStatus.Draft },
              { label: "Published", value: CourseStatus.Published },
              { label: "Pending", value: CourseStatus.Pending },
              { label: "Rejected", value: CourseStatus.Rejected },
            ]}
            value={status}
            allowDeselect={false}
            checkIconPosition="right"
            onChange={(val) => setStatus(val as CourseStatus | "All")}
            placeholder="Filter by status"
            className="w-full md:max-w-60"
          />
        </div>
      </div>

      {/* Courses grid or loading or empty state */}
      <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 gap-6">
        {isCoursesPending &&
          Array.from({ length: 9 }).map((_, i) => <InstructorCourseCardSkeleton key={i} />)}

        {!isCoursesPending && data?.items.length === 0 ? (
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
          data?.items.map((course) => <InstructorCourseCard key={course.id} course={course} />)
        )}
      </div>
      <AppPagination
        page={page}
        pageSize={pageSize}
        itemsCount={data?.count ?? 0}
        onPageChange={(newPage) => setPage(newPage)}
        withEdges
        className="flex justify-center items-center mt-[50px]"
      />

      {/* Modal */}
      <CreateCourseModal opened={createCourseModalOpened} onClose={closeCreateCourseModal} />
    </div>
  );
}
