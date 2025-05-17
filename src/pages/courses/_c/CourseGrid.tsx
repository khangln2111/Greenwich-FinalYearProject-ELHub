import { SimpleGrid, Flex } from "@mantine/core";
import CourseCard from "../../home/_c/PopularCourses/CourseCard";
import CoursePagination from "./CoursePagination";
import { useGetCourses } from "../../../react-query/course/courseHooks";

const CourseGrid = () => {
  const { data, isPending, isError } = useGetCourses();

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <p className="text-red-500">Error loading courses</p>
      </div>
    );
  }

  const courses = data.items;

  console.log("courses", courses);

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
