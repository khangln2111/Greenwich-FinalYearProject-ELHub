import { Skeleton } from "@mantine/core";

/**
 * Skeleton cho trang CourseLearningPage
 * mô phỏng header, video, sidebar và footer
 */
export default function CourseLearningPageSkeleton() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header skeleton */}
      <header className="flex justify-between items-center px-3 md:px-6 py-1 shadow-sm bg-[#29303b]">
        <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
          <Skeleton height={28} width={28} circle /> {/* back icon */}
          <Skeleton height={28} circle radius="sm" className="hidden md:block" /> {/* logo */}
          <Skeleton height={16} width="50%" radius="sm" /> {/* title */}
        </div>
        <div className="flex items-center gap-3">
          <div className="p-[7px]">
            <Skeleton height={31.8} circle /> {/* RingProgress */}
          </div>
          <Skeleton height={20} width={80} className="hidden lg:block" /> {/* completed */}
          <Skeleton height={24} width={24} /> {/* menu */}
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video area */}
        <main className="flex-1 bg-black flex items-center justify-center text-white text-center"></main>

        {/* Sidebar skeleton (desktop) */}
        <aside className="hidden lg:block lg:w-[300px] xl:w-[400px] border-l bg-white dark:bg-dark-6">
          <div className="h-full w-full flex flex-col text-[#233D63] dark:text-[#EEEEEE]">
            <Skeleton height={40} radius={0} /> {/* Course Content title */}
            <div className="flex-1 overflow-y-auto divide-y">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="px-3 py-4 space-y-3">
                  <Skeleton height={16} width="80%" />
                  <Skeleton height={12} width="60%" />
                  {/* mô phỏng lectures */}
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3">
                      <Skeleton height={16} width={16} circle /> {/* checkbox */}
                      <div className="flex-1 space-y-2">
                        <Skeleton height={12} width="90%" />
                        <Skeleton height={10} width="40%" />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Footer skeleton */}
      <footer
        className="border-t px-4 md:px-6 py-2 flex items-center justify-between text-sm shadow-sm bg-[#f0f0f0]
          dark:bg-[#121212]"
      >
        <div className="hidden lg:block"></div>
        <div className="flex items-center gap-2">
          <Skeleton height={36} width={100} radius="xl" /> {/* prev */}
          <Skeleton height={36} width={80} radius="xl" /> {/* next */}
        </div>
        <Skeleton height={36} width={36} circle /> {/* toggle sidebar */}
      </footer>
    </div>
  );
}
