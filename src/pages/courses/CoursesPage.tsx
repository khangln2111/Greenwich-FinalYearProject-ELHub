import { Box, Grid, GridCol } from "@mantine/core";
import { useAppStore } from "../../zustand/store";
import CourseMain from "./_c/CourseMain";
import CourseDesktopFilter from "./_c/course-filter/CourseDesktopFilter";

const CoursesPage = () => {
  const isDesktopFilterOpen = useAppStore.use.isDesktopFilterOpen();

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
            <CourseDesktopFilter />
          </GridCol>
          {/* Main content column for courses*/}
          <GridCol span="auto" className="transition-all duration-300 ease-in-out">
            <CourseMain />
          </GridCol>
        </Grid>
      </Box>
    </div>
  );
};
export default CoursesPage;
