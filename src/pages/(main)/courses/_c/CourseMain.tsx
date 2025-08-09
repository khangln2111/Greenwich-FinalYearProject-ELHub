import { ActionIcon, Button, Group, TextInput, ThemeIcon, Title } from "@mantine/core";
import { LayoutGrid, List, ListFilter, Search } from "lucide-react";

import { useSearchParamState } from "../../../../hooks/useSearchParamState";
import { decodeOrderOption } from "../../../../api-client/api.types";
import { CourseOrderableFields, CourseVm } from "../../../../features/course/course.types";
import { useGetCourses } from "../../../../features/course/courseHooks";
import CenterLoader from "../../../../components/CenterLoader";
import { useCoursesPageStore } from "../../../../zustand/coursesPageStore";
import CourseListItem from "../../home/_c/PopularCourses/CourseListItem";
import CourseGrid from "./CourseGrid";

type CourseMainProps = {};

const CourseMain = ({}: CourseMainProps) => {
  const toggleDesktopFilter = useCoursesPageStore((s) => s.toggleDesktopFilter);
  const isDesktopFilterOpen = useCoursesPageStore((s) => s.isDesktopFilterOpen);
  const isMobileFilterOpen = useCoursesPageStore((s) => s.isMobileFilterOpen);
  const openMobileFilter = useCoursesPageStore((s) => s.openMobileFilter);
  const isGridView = useCoursesPageStore((s) => s.isGridView);
  const toggleLayout = useCoursesPageStore((s) => s.toggleLayout);

  const [categoryId] = useSearchParamState("categoryId");
  const [level] = useSearchParamState("level");
  const [orderByParam] = useSearchParamState("orderBy");
  const orderBy = decodeOrderOption<CourseOrderableFields>(orderByParam, "createdAt", "desc");
  const [search] = useSearchParamState("search", "");

  const { data, isPending, isError } = useGetCourses({
    categoryId,
    level,
    orderBy,
    search,
  });

  const courses: CourseVm[] = data?.items ?? [];

  return (
    <>
      <Group justify="space-between" mb="md">
        <Title className="text-2xl sm:text-3xl">Courses List</Title>
        {/* Sort Options + Toggle Layout */}
        <Group align="center" gap="xs">
          {/* Desktop filter toggler */}
          <Button
            variant={isDesktopFilterOpen ? "filled" : "default"}
            visibleFrom="lg"
            leftSection={<ListFilter />}
            onClick={toggleDesktopFilter}
          >
            Filter
          </Button>

          {/* Mobile filter toggler */}
          <ThemeIcon
            size={35}
            hiddenFrom="lg"
            variant={isMobileFilterOpen ? "filled" : "default"}
            onClick={openMobileFilter}
          >
            <ListFilter strokeWidth={1.5} />
          </ThemeIcon>

          {/* Toggle layout */}
          <ActionIcon
            size={35}
            variant={isGridView ? "filled" : "default"}
            onClick={() => !isGridView && toggleLayout()}
            aria-label="Grid view"
            title="Grid view"
          >
            <LayoutGrid strokeWidth={1.5} />
          </ActionIcon>
          <ActionIcon
            size={35}
            variant={!isGridView ? "filled" : "default"}
            onClick={() => isGridView && toggleLayout()}
            aria-label="List view"
            title="List view"
          >
            <List strokeWidth={1.5} />
          </ActionIcon>

          {/* Search input */}
          <TextInput
            placeholder="Search..."
            classNames={{
              input: `placeholder:font-semibold pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:ring-2
              focus:ring-blue-500`,
            }}
            leftSection={<Search className="text-gray-400" size={18} />}
          />
        </Group>
      </Group>

      {/* Render courses by layout */}
      {isGridView ? (
        <CourseGrid courses={courses} isPending={isPending} isError={isError} />
      ) : (
        <div className="flex flex-col gap-4">
          {isPending && <CenterLoader />}
          {isError && (
            <div className="flex items-center justify-center h-[300px]">
              <p className="text-red-500">Error loading courses</p>
            </div>
          )}
          {!isPending &&
            !isError &&
            (courses.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[400px] gap-4 text-center px-4">
                <Search className="w-16 h-16 text-gray-400" />
                <p className="text-lg font-semibold">No courses found</p>
                <p className="text-sm text-gray-500">
                  Try adjusting your search keywords or filters to find more results.
                </p>
              </div>
            ) : (
              courses.map((course) => <CourseListItem key={course.id} course={course} />)
            ))}
        </div>
      )}
    </>
  );
};

export default CourseMain;
