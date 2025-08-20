import { Box, Grid, GridCol, Paper } from "@mantine/core";
import { useCoursesPageStore } from "../../../zustand/stores/coursesPageStore";
import CourseMobileFilter from "./_c/course-filter/CourseMobileFilter";
import CourseMain from "./_c/CourseMain";
import CourseDesktopFilter from "./_c/course-filter/CourseDesktopFilter";

const CoursesPage = () => {
  const isDesktopFilterOpen = useCoursesPageStore((s) => s.isDesktopFilterOpen);

  return (
    <div className="flex-1 bg-gray-100 dark:bg-dark-5">
      <Box
        className="container w-full"
        px={{ base: "15px", md: "20px", lg: "30px", xl: "50px" }}
        py={{ base: "md", md: "xl" }}
        size="xl"
      >
        <Grid py="md" gutter={{ lg: "xl" }}>
          {/* Column 1: desktop sidebar filter */}
          <GridCol
            visibleFrom="lg"
            span={{ lg: 4, xl: 3 }}
            className={`transition-all transition-discrete duration-300 starting:-translate-x-full starting:opacity-0
              ${isDesktopFilterOpen ? "opacity-100" : "-translate-x-full opacity-0 hidden"} `}
          >
            <Paper withBorder className="rounded-2xl">
              <CourseDesktopFilter />
            </Paper>
          </GridCol>
          {/* Column 2: Main content with course grid*/}
          <GridCol span="auto" className="transition-all duration-300">
            <CourseMain />
          </GridCol>
        </Grid>
        <CourseMobileFilter />
      </Box>
    </div>
  );
};
export default CoursesPage;
