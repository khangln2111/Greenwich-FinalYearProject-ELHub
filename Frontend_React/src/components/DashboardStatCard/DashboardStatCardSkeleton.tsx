import { Skeleton } from "@mantine/core";

interface DashboardStatCardSkeletonProps {
  className?: string;
}

const DashboardStatCardSkeleton = ({ className }: DashboardStatCardSkeletonProps) => {
  return (
    <div
      className={`flex flex-col justify-between rounded-3xl bg-white dark:bg-gray-900 shadow-lg border border-gray-200
        dark:border-gray-700 p-5 transition ${className}`}
    >
      {/* Icon */}
      <div className="flex items-center justify-between">
        <Skeleton height={16} width={120} radius="sm" />
        <Skeleton height={40} width={40} radius="xl" />
      </div>

      {/* Value */}
      <div className="mt-3">
        <Skeleton height={28} width="60%" radius="sm" />
      </div>

      {/* Growth */}
      <div className="mt-2 flex items-center gap-1">
        <Skeleton height={16} width={40} radius="sm" />
        <Skeleton height={16} width={20} radius="sm" />
      </div>
    </div>
  );
};

export default DashboardStatCardSkeleton;
