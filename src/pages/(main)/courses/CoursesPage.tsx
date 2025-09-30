import { Box, Grid, GridCol, Loader, Paper } from "@mantine/core";
import { parseAsString, useQueryState } from "nuqs";
import { lazy, Suspense } from "react";
import { usePageSEO } from "../../../hooks/usePageSEO";
import { useCoursesPageStore } from "../../../zustand/stores/coursesPageStore";
import CourseDesktopFilter from "./_c/course-filter/CourseDesktopFilter";
import CourseMobileFilter from "./_c/course-filter/CourseMobileFilter";
import CourseMain from "./_c/CourseMain";

// Lazy load modal
const CourseChatResponsiveDialog = lazy(() => import("./_c/CourseChatResponsiveDialog"));

export default function CoursesPage() {
  const isDesktopFilterOpen = useCoursesPageStore((s) => s.isDesktopFilterOpen);
  const chatModalOpen = useCoursesPageStore((s) => s.chatModalOpen);
  const chatLoaded = useCoursesPageStore((s) => s.chatLoaded);
  const setChatModalOpen = useCoursesPageStore((s) => s.setChatModalOpen);
  const [search] = useQueryState("search", parseAsString);

  usePageSEO({ title: search ? `Search results` : "Courses" });

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

        {/* Lazy load modal only when chatLoaded = true */}
        {chatLoaded && (
          <Suspense
            fallback={
              <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black/10 dark:bg-black/30">
                <Loader size="lg" />
              </div>
            }
          >
            <CourseChatResponsiveDialog
              opened={chatModalOpen}
              onClose={() => setChatModalOpen(false)}
            />
          </Suspense>
        )}
      </Box>
    </div>
  );
}
