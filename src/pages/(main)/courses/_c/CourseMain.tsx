import { ActionIcon, Button, Flex, TextInput } from "@mantine/core";
import { LayoutGrid, LayoutList, ListFilter, Search } from "lucide-react";

import { decodeOrderOption } from "../../../../api-client/api.types";
import CenterLoader from "../../../../components/CenterLoader";
import { CourseOrderableFields, CourseVm } from "../../../../features/course/course.types";
import { useGetCourses } from "../../../../features/course/courseHooks";
import { useSearchParamState } from "../../../../hooks/useSearchParamState";
import { useCoursesPageStore } from "../../../../zustand/coursesPageStore";
import CourseGrid from "./CourseGrid";
import CourseList from "./CourseList";
import CoursePagination from "./CoursePagination";

type CourseMainProps = {};

const CourseMain = ({}: CourseMainProps) => {
  const toggleDesktopFilter = useCoursesPageStore((s) => s.toggleDesktopFilter);
  const isDesktopFilterOpen = useCoursesPageStore((s) => s.isDesktopFilterOpen);
  const isMobileFilterOpen = useCoursesPageStore((s) => s.isMobileFilterOpen);
  const openMobileFilter = useCoursesPageStore((s) => s.openMobileFilter);
  const layout = useCoursesPageStore((s) => s.layout);
  const setLayout = useCoursesPageStore((s) => s.setLayout);

  const [categoryId] = useSearchParamState("categoryId");
  const [level] = useSearchParamState("level");
  const [orderByParam] = useSearchParamState("orderBy");
  const orderBy = decodeOrderOption<CourseOrderableFields>(orderByParam, "createdAt", "desc");
  const [search] = useSearchParamState("search", "");
  const [page, setPage] = useSearchParamState("page", 1);
  const [pageSize] = useSearchParamState("pageSize", layout === "grid" ? 6 : 5);

  const { data, isPending, isError } = useGetCourses({
    categoryId,
    level,
    orderBy,
    search,
    page,
    pageSize,
  });

  const courses: CourseVm[] = data?.items ?? [];

  return (
    <>
      {/* Header: Responsive layout */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        {/* Course count */}
        {!isPending && !isError && data && (
          <span className="text-sm text-gray-500">
            Showing <strong>{courses.length}</strong> of <strong>{data.count}</strong> courses
          </span>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Desktop filter */}
          <Button
            variant={isDesktopFilterOpen ? "filled" : "default"}
            visibleFrom="lg"
            leftSection={<ListFilter />}
            onClick={toggleDesktopFilter}
          >
            Filter
          </Button>

          {/* Mobile filter */}
          <Button
            hiddenFrom="lg"
            variant={isMobileFilterOpen ? "filled" : "default"}
            onClick={openMobileFilter}
            leftSection={<ListFilter />}
          >
            Filter
          </Button>

          {/* Layout switcher */}
          <ActionIcon
            size={35}
            variant={layout === "grid" ? "outline" : "default"}
            onClick={() => setLayout("grid")}
            radius="lg"
            data-active={layout === "grid"}
            aria-label="Grid view"
            title="Grid view"
            className="not-data-[active=true]:hover:border-primary-outline
              not-data-[active=true]:hover:text-primary-outline not-data-[active=true]:hover:bg-body bg-body"
          >
            <LayoutGrid strokeWidth={1.3} />
          </ActionIcon>

          <ActionIcon
            size={35}
            variant={layout === "list" ? "outline" : "default"}
            onClick={() => setLayout("list")}
            data-active={layout === "list"}
            radius="lg"
            aria-label="List view"
            title="List view"
            className="not-data-[active=true]:hover:border-primary-outline
              not-data-[active=true]:hover:text-primary-outline not-data-[active=true]:hover:bg-body bg-body"
          >
            <LayoutList strokeWidth={1.3} />
          </ActionIcon>

          {/* Search */}
          <TextInput
            placeholder="Search..."
            classNames={{
              input: `placeholder:font-semibold pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:ring-2
              focus:ring-blue-500`,
            }}
            leftSection={<Search className="text-gray-400" size={18} />}
          />
        </div>
      </div>

      {/* Body */}
      <div className="mt-7">
        {isPending && <CenterLoader />}

        {isError && (
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-red-500">Error loading courses</p>
          </div>
        )}

        {!isPending && !isError && courses.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[400px] gap-4 text-center px-4">
            <Search className="w-16 h-16 text-gray-400" />
            <p className="text-lg font-semibold">No courses found</p>
            <p className="text-sm text-gray-500">
              Try adjusting your search keywords or filters to find more results.
            </p>
          </div>
        )}

        {!isPending &&
          !isError &&
          courses.length > 0 &&
          (layout === "grid" ? <CourseGrid courses={courses} /> : <CourseList courses={courses} />)}

        <Flex justify="center" mt="40">
          <CoursePagination
            page={page}
            pageSize={pageSize}
            total={data?.count ?? 0}
            onPageChange={setPage}
          />
        </Flex>
      </div>
    </>
  );
};

export default CourseMain;
