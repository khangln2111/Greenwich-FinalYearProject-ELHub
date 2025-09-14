import { useQueryClient } from "@tanstack/react-query";
import { parseAsInteger, parseAsStringLiteral, useQueryState } from "nuqs";
import { useEffect } from "react";
import AppPagination from "../../../../components/AppPagination/AppPagination";
import { keyFac } from "../../../../features/common-service/queryKeyFactory";
import { useGetPublishedCourses } from "../../../../features/course/course.hooks";
import { CourseVm } from "../../../../features/course/course.types";
import { useCourseQueryState } from "../../../../hooks/useCoursesQueryState";
import CourseGrid from "./CourseGrid";
import CourseList from "./CourseList";
import CoursesPageActions from "./CoursesPageActions";
import CoursesPageEmptyState from "./CoursesPageEmptyState";

type CourseMainProps = {};

const CourseMain = ({}: CourseMainProps) => {
  const [layout, setLayout] = useQueryState(
    "layout",
    parseAsStringLiteral(["grid", "list"]).withDefault("grid"),
  );

  const queryClient = useQueryClient();

  // reusable courseQuery state
  const [courseQuery, setCourseQuery] = useCourseQueryState();

  const [pageSize] = useQueryState(
    "pageSize",
    parseAsInteger.withDefault(layout === "grid" ? 6 : 4),
  );

  const { data, isPending, isError } = useGetPublishedCourses({
    ...courseQuery,
    pageSize,
  });

  useEffect(() => {
    const hasNextPage = data?.count && courseQuery?.page * pageSize < data.count;
    if (!hasNextPage) return;

    queryClient.prefetchQuery({
      ...keyFac.courses.getPublishedCourses({
        ...courseQuery,
        page: courseQuery.page + 1,
        pageSize,
      }),
    });
  }, [courseQuery, pageSize, queryClient, data?.count]);

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
                const firstItem = (courseQuery.page - 1) * pageSize + 1;
                const lastItem = Math.min(courseQuery.page * pageSize, total);

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

        <CoursesPageActions
          layout={layout}
          onSetLayout={(l) => {
            setLayout(l);
            setCourseQuery({ page: 1 });
          }}
        />
      </div>

      {/* Body */}
      <div className="mt-7">
        {isError && (
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-red">Failed to load courses</p>
          </div>
        )}

        {!isPending && !isError && courses.length === 0 && <CoursesPageEmptyState />}

        {!isError &&
          (layout === "grid" ? (
            <CourseGrid courses={courses} isLoading={isPending} skeletonCount={pageSize} />
          ) : (
            <CourseList courses={courses} isLoading={isPending} skeletonCount={pageSize} />
          ))}

        {/* Pagination */}
        <AppPagination
          page={courseQuery.page}
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
