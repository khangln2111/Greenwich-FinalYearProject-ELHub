import { Box, Grid, GridCol } from "@mantine/core";
import { useGetCourses } from "../../react-query/course/courseHooks";
import { useAppStore } from "../../zustand/store";
import CourseList from "./_c/CourseList";
import DesktopFilter from "./_c/DesktopFilter";

const CoursesPage = () => {
  const isDesktopFilterOpen = useAppStore.use.isDesktopFilterOpen();

  const { isError, data, error } = useGetCourses();

  if (isError) {
    let message = "An error occurred while fetching courses.";
    if (error.status === 401) {
      message = "Unauthorized access. Please log in.";
    }
    if (error.status === 403) {
      message = "Forbidden access. You do not have permission to view this resource.";
    }

    return <div>Error loading courses, {message}</div>;
  }
  console.log("Courses data:", data?.items);

  return (
    <div className="flex-1 bg-gray-1 dark:bg-dark-5">
      <Box
        className="container"
        px={{ base: "15px", md: "20px", lg: "30px", xl: "50px" }}
        py="xl"
        size="xl"
      >
        <Grid py="md" gutter="xl">
          {/* Sidebar Filters cố định */}
          <GridCol
            visibleFrom="lg"
            span={{ lg: 3.5, xl: 2.8 }}
            className={`transition-all transition-discrete duration-300 starting:-translate-x-full starting:opacity-0
              ${isDesktopFilterOpen ? "opacity-100" : "-translate-x-full opacity-0 hidden"} `}
          >
            <DesktopFilter />
          </GridCol>
          {/* Main content column for courses*/}
          <GridCol span="auto" className="transition-all duration-300 ease-in-out">
            <CourseList />
          </GridCol>
        </Grid>
      </Box>
    </div>
  );
};
export default CoursesPage;
