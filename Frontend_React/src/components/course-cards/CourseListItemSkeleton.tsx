import { Skeleton } from "@mantine/core";
import { ClockIcon, LayersIcon, LibraryBigIcon, TagIcon, UsersIcon } from "lucide-react";
import { cn } from "../../utils/cn";

type CourseListItemSkeletonProps = {
  className?: string;
};

const CourseListItemSkeleton = ({ className }: CourseListItemSkeletonProps) => {
  const statsIcons = [ClockIcon, LibraryBigIcon, LayersIcon, UsersIcon, TagIcon];

  return (
    <div
      className={cn(
        `group flex flex-col md:flex-row bg-white dark:bg-dark-6 rounded-xl border shadow-md
        overflow-hidden p-4 md:p-6 gap-4 cursor-pointer select-none`,
        className,
      )}
    >
      {/* Left: Image Skeleton */}
      <div
        className="relative w-full md:w-56 flex-shrink-0 aspect-video md:aspect-square rounded-lg
          overflow-hidden shadow-sm"
      >
        <Skeleton className="w-full h-full" />
      </div>

      {/* Right: Content Skeleton */}
      <div className="flex flex-col flex-1 gap-3">
        {/* Title Skeleton */}
        <Skeleton className="h-6 md:h-7 w-full max-w-[70%] rounded" />

        {/* Instructor & Rating Skeleton */}
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton circle width={28} height={28} />
          <Skeleton className="h-4 w-32 rounded" />

          <div className="ml-auto md:ml-0 flex gap-2 items-center leading-none">
            <Skeleton className="w-16 h-4 rounded" />
            <Skeleton className="w-8 h-4 rounded" />
            <Skeleton className="w-6 h-4 rounded" />
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          {statsIcons.map((_, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <Skeleton circle height={17} className="text-gray-400" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
          ))}
        </div>

        {/* Description Skeleton */}
        <Skeleton className="h-4 w-full max-w-[90%] mt-1 rounded" />

        {/* Footer Skeleton */}
        <div
          className="flex flex-wrap md:flex-nowrap items-center justify-between mt-auto gap-3 pt-3
            border-t border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <Skeleton className="h-5 w-16 rounded" />
            <Skeleton className="h-5 w-12 rounded" />
          </div>
          <Skeleton className="h-8 w-24 rounded" />
        </div>
      </div>
    </div>
  );
};

export default CourseListItemSkeleton;
