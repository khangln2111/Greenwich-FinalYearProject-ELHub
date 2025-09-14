import { Box, Breadcrumbs, Skeleton } from "@mantine/core";

function StatSkeleton() {
  return (
    <li className="flex justify-between items-center py-5 text-md">
      <span className="flex items-center gap-2">
        <Skeleton circle height={24} width={24} />
        <Skeleton height={14} width={80} radius="sm" />
      </span>
      <Skeleton height={14} width={60} radius="sm" />
    </li>
  );
}

const CourseDetailPageLoadingState = () => {
  return (
    <div className="flex-1">
      <Box
        className="container"
        px={{ base: "15px", md: "20px", lg: "30px", xl: "90px" }}
        pb="5xl"
        pt={{ base: "xl", md: "2xl" }}
      >
        <div className="py-md gap-xl grid grid-cols-1 lg:grid-cols-[8fr_4fr] xl:grid-cols-[8.5fr_3.5fr] items-start">
          {/* Left column */}
          <div>
            <Breadcrumbs separator="→" separatorMargin="md" mt="xs">
              <Skeleton height={12} width={100} />
              <Skeleton height={12} width={80} />
              <Skeleton height={12} width={60} />
            </Breadcrumbs>

            <Skeleton height={32} width="60%" className="mt-5" radius="sm" />

            {/* Course stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border py-6 px-4 mt-xl rounded-lg shadow-lg">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 border-r last:border-none">
                  <Skeleton height={40} width={40} radius="xl" />
                  <div className="flex flex-col gap-1">
                    <Skeleton height={10} width={60} />
                    <Skeleton height={14} width={100} />
                  </div>
                </div>
              ))}
            </div>

            {/* Video preview */}
            <Skeleton className="aspect-video mt-10 rounded-lg" />

            {/* Tabs Skeleton */}
            <div className="mt-5">
              <div className="flex gap-4">
                {["Overview", "Curriculum", "Reviews", "Instructor"].map((_, i) => (
                  <Skeleton key={i} height={36} width={100} radius="xl" />
                ))}
              </div>

              <Skeleton height={6} width={96} mt={30} className="rounded-full" />

              <div className="mt-7 space-y-4">
                <Skeleton height={20} width="90%" />
                <Skeleton height={20} width="95%" />
                <Skeleton height={20} width="85%" />
                <Skeleton height={20} width="60%" />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div
            className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 rounded-3xl shadow-2xl
              overflow-hidden"
          >
            <div className="p-6 bg-white dark:bg-dark-6 rounded-[inherit]">
              {/* Price box */}
              <div className="bg-violet-600 text-white p-4 rounded-xl shadow-xl text-center space-y-2">
                <Skeleton height={14} width={120} mx="auto" />
                <div className="flex justify-center gap-2">
                  <Skeleton height={32} width={70} />
                  <Skeleton height={24} width={50} />
                </div>
              </div>

              {/* Stat List */}
              <div className="mt-6">
                <Skeleton height={20} width={180} radius="sm" className="mb-4" />
                <ul className="flex flex-col gap-y-3 divide-y text-sm text-gray-700 dark:text-gray-300">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <StatSkeleton key={index} />
                  ))}
                </ul>
              </div>

              {/* Add to cart button */}
              <Skeleton height={48} radius="xl" mt={24} />
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default CourseDetailPageLoadingState;
