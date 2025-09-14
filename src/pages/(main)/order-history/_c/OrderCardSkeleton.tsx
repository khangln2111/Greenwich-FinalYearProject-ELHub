import { Skeleton } from "@mantine/core";

export function OrderCardSkeleton() {
  return (
    <div className="bg-body rounded-lg mb-6">
      {/* Header */}
      <div
        className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-dark-4
          text-sm text-gray-600 dark:text-gray-100 gap-2 flex-wrap"
      >
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2 flex-1">
          <Skeleton height={16} width={80} radius="sm" />
          <span className="text-gray-400 visible-from-md">|</span>
          <Skeleton height={16} width={100} radius="sm" />
          <span className="text-gray-400 visible-from-md">|</span>
          <Skeleton height={16} width={150} radius="sm" />
        </div>
        <Skeleton height={20} width={80} radius="xl" />
      </div>

      {/* First item preview */}
      <div className="flex items-center p-4 gap-4">
        <div className="size-16 flex items-center justify-center border rounded-lg overflow-hidden">
          <Skeleton height="100%" width="100%" />
        </div>
        <div className="flex-1 space-y-2">
          <Skeleton height={14} width="70%" radius="sm" />
          <Skeleton height={14} width="40%" radius="sm" />
        </div>
        <div className="text-right space-y-2">
          <Skeleton height={16} width={60} radius="sm" />
          <Skeleton height={14} width={30} radius="sm" />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-4 pb-4 text-sm">
        <Skeleton height={16} width={100} radius="sm" />
        <div className="flex items-center gap-2">
          <Skeleton height={16} width={80} radius="sm" />
          <Skeleton height={20} width={60} radius="sm" />
        </div>
      </div>
    </div>
  );
}
