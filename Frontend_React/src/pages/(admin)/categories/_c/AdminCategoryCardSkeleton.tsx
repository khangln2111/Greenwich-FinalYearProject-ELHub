import { Skeleton } from "@mantine/core";

const AdminCategoryCardSkeleton = () => {
  return (
    <div
      className="rounded-2xl border border-gray-200 dark:border-dark-4 overflow-hidden bg-white
        dark:bg-dark-6 shadow-sm flex flex-col animate-pulse"
    >
      {/* Image placeholder */}
      <div className="aspect-video overflow-hidden">
        <Skeleton height="100%" width="100%" />
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Category name */}
        <Skeleton height={20} width="70%" mb={12} />

        <div className="flex items-center justify-between mt-auto">
          {/* Badge */}
          <Skeleton height={22} width={60} radius="sm" />

          {/* Button */}
          <Skeleton height={28} width={60} radius="sm" />
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryCardSkeleton;
