import { ActionIcon, Button } from "@mantine/core";
import { LayoutGrid, LayoutList, ListFilter, Search } from "lucide-react";

import { parseAsInteger, parseAsStringLiteral, useQueryState } from "nuqs";
import AppPagination from "../../../../components/AppPagination/AppPagination";
import CenterLoader from "../../../../components/CenterLoader";
import { CourseVm } from "../../../../features/course/course.types";
import { useGetCourses } from "../../../../features/course/courseHooks";
import { useCourseQueryState } from "../../../../hooks/useCoursesQueryState";
import { useCoursesPageStore } from "../../../../zustand/stores/coursesPageStore";
import CourseGrid from "./CourseGrid";
import CourseList from "./CourseList";

type CourseMainProps = {};

const CourseMain = ({}: CourseMainProps) => {
  const toggleDesktopFilter = useCoursesPageStore((s) => s.toggleDesktopFilter);
  const isDesktopFilterOpen = useCoursesPageStore((s) => s.isDesktopFilterOpen);
  const isMobileFilterOpen = useCoursesPageStore((s) => s.isMobileFilterOpen);
  const openMobileFilter = useCoursesPageStore((s) => s.openMobileFilter);
  const [layout, setLayout] = useQueryState(
    "layout",
    parseAsStringLiteral(["grid", "list"]).withDefault("grid"),
  );

  const [{ categoryId, levels, orderBy, search, page }, setCourseQuery] = useCourseQueryState();
  const [pageSize] = useQueryState(
    "pageSize",
    parseAsInteger.withDefault(layout === "grid" ? 6 : 2),
  );

  const { data, isPending, isError } = useGetCourses({
    categoryId: categoryId,
    level: levels,
    orderBy,
    search,
    page,
    pageSize,
  });

  const courses: CourseVm[] = data?.items ?? [];

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        {/* Course count */}
        <span className="text-sm text-gray-500">
          {!isPending && !isError && data && (
            <>
              {(() => {
                const total = data.count ?? 0;
                const firstItem = (page - 1) * pageSize + 1;
                const lastItem = Math.min(page * pageSize, total);

                return (
                  <>
                    Showing <strong>{firstItem}</strong>–<strong>{lastItem}</strong> of{" "}
                    <strong>{total}</strong> courses
                  </>
                );
              })()}
            </>
          )}
        </span>

        {/* Actions */}
        <div className="flex sm:items-center gap-4">
          {/* Filter buttons */}
          <div className="flex gap-2">
            <Button
              variant={isDesktopFilterOpen ? "filled" : "default"}
              visibleFrom="lg"
              leftSection={<ListFilter size={18} />}
              onClick={toggleDesktopFilter}
            >
              Filter
            </Button>

            <Button
              hiddenFrom="lg"
              variant={isMobileFilterOpen ? "filled" : "default"}
              onClick={openMobileFilter}
              leftSection={<ListFilter size={18} />}
            >
              Filter
            </Button>
          </div>

          {/* Layout switcher */}
          <div className="flex gap-2">
            <ActionIcon
              size="lg"
              variant={layout === "grid" ? "outline" : "default"}
              onClick={() => {
                setLayout("grid");
                setCourseQuery({ page: 1 });
              }}
              radius="lg"
              data-active={layout === "grid"}
              aria-label="Grid view"
              title="Grid view"
              className="bg-body not-data-[active=true]:hover:border-primary-outline
                not-data-[active=true]:hover:text-primary-outline not-data-[active=true]:hover:bg-body"
            >
              <LayoutGrid strokeWidth={1.3} />
            </ActionIcon>

            <ActionIcon
              size="lg"
              variant={layout === "list" ? "outline" : "default"}
              onClick={() => {
                setLayout("list");
                setCourseQuery({ page: 1 });
              }}
              data-active={layout === "list"}
              radius="lg"
              aria-label="List view"
              title="List view"
              className="bg-body not-data-[active=true]:hover:border-primary-outline
                not-data-[active=true]:hover:text-primary-outline not-data-[active=true]:hover:bg-body"
            >
              <LayoutList strokeWidth={1.3} />
            </ActionIcon>
          </div>
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

        {/* Pagination */}
        <AppPagination
          page={page}
          pageSize={pageSize}
          itemsCount={data?.count ?? 0}
          onPageChange={(newPage) => setCourseQuery({ page: newPage })}
          withEdges
          className="flex justify-center items-center mt-10"
        />
      </div>
    </>
  );
};

export default CourseMain;
