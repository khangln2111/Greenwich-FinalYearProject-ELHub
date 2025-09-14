import { Skeleton } from "@mantine/core";

const InventoryItemCardSkeleton = () => {
  return (
    <div
      className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-4 sm:p-5 flex flex-col
        sm:flex-row gap-4"
    >
      {/* Course image */}
      <div
        className="w-full sm:w-28 h-44 sm:h-28 rounded-xl overflow-hidden border border-gray-200
          dark:border-zinc-700 shadow-sm flex-shrink-0"
      >
        <Skeleton height="100%" width="100%" />
      </div>

      {/* Right content */}
      <div className="flex-1 flex flex-col justify-between gap-2">
        {/* Title + Quantity */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Skeleton height={20} width="70%" radius="sm" />
          <Skeleton height={18} width={100} radius="xl" />
        </div>

        {/* Summary */}
        <Skeleton height={16} width="90%" />

        {/* Status + Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          {/* Status */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Skeleton circle height={20} width={20} />
            <Skeleton height={14} width={80} />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 justify-end w-full sm:w-auto">
            <Skeleton height={36} width={90} radius="md" />
            <Skeleton height={36} width={70} radius="md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryItemCardSkeleton;
