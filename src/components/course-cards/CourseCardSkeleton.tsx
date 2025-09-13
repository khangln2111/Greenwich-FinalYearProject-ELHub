import { Skeleton } from "@mantine/core";
import { Clock, Layers, LibraryBig, Tag, Users } from "lucide-react";
import { cn } from "../../utils/cn";

type CourseCardSkeletonProps = {
  className?: string;
};

const CourseCardSkeleton = ({ className }: CourseCardSkeletonProps) => {
  const statsIcons = [Clock, LibraryBig, Layers, Users, Tag];

  return (
    <div
      className={cn(
        `flex flex-col bg-white dark:bg-dark-6 rounded-xl shadow-md overflow-hidden transition-all
        duration-400 outline-2 outline-transparent`,
        className,
      )}
    >
      <div className="p-4 flex flex-col flex-1">
        {/* Image Skeleton */}
        <div
          className="relative w-full aspect-video mb-3 rounded-md overflow-hidden border border-black/10
            dark:border-white/10"
        >
          <Skeleton className="w-full h-full" />
        </div>

        {/* Content Skeleton */}
        <div className="flex flex-col flex-1 gap-y-2">
          {/* Title Skeleton */}
          <Skeleton className="h-6 w-full max-w-[80%] rounded" />

          {/* Instructor Skeleton */}
          <div className="flex items-center gap-2 mt-1">
            <Skeleton circle width={28} height={28} />
            <Skeleton className="h-4 w-24 rounded" />
          </div>

          {/* Rating Skeleton */}
          <div className="flex gap-2 mt-2 items-center leading-none">
            <Skeleton className="w-16 h-4 rounded" />
            <Skeleton className="w-8 h-4 rounded" />
            <Skeleton className="w-6 h-4 rounded" />
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-3">
            {statsIcons.map((Icon, idx) => {
              const isLast = idx === statsIcons.length - 1;
              const isOdd = statsIcons.length % 2 !== 0;

              return (
                <div
                  key={idx}
                  className={cn("flex items-center gap-1 text-sm", {
                    "col-span-2": isLast && isOdd,
                  })}
                >
                  <Icon size={16} className="text-gray-400" />
                  <Skeleton className="h-4 w-16 rounded" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="flex items-center justify-between pt-4 mt-auto">
          {/* Price Skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-12 rounded" />
            <Skeleton className="h-5 w-8 rounded" />
          </div>
          {/* Button Skeleton */}
          <Skeleton className="h-8 w-24 rounded" />
        </div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
