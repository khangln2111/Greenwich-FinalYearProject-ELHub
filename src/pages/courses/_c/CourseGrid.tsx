import { Flex, SimpleGrid } from "@mantine/core";
import { Search } from "lucide-react";
import CenterLoader from "../../../components/CenterLoader";
import { useGetCourses } from "../../../react-query/course/courseHooks";
import CourseCard from "../../home/_c/PopularCourses/CourseCard";
import CoursePagination from "./CoursePagination";
import { useSearchParamState } from "../../../hooks/useSearchParamState";

const CourseGrid = () => {
  const [categoryId] = useSearchParamState("categoryId");
  const [level] = useSearchParamState("level");

  const { data, isPending, isError } = useGetCourses({
    categoryId,
    level,
  });

  if (isPending) return <CenterLoader />;

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <p className="text-red-500">Error loading courses</p>
      </div>
    );
  }

  const courses = data.items;

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] gap-4 text-center px-4">
        <Search className="w-16 h-16 text-gray-400" />
        <p className="text-lg font-semibold">No courses found</p>
        <p className="text-sm text-gray-500">
          Try adjusting your search keywords or filters to find more results.
        </p>
      </div>
    );
  }

  return (
    <>
      <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }} spacing="md" my={25} className="auto-rows-auto">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </SimpleGrid>
      {/* <div className="grid grid-cols-fill-[250px] gap-lg mx-auto my-[25px]">
        {courses.map((course) => (
          <CourseCard key={course.id} />
        ))}
      </div> */}
      <Flex justify="center" mt="50">
        <CoursePagination />
      </Flex>
    </>
  );
};
export default CourseGrid;
