import { Skeleton } from "@mantine/core";

const InstructorCourseCardSkeleton = () => {
  return (
    <div
      className="bg-white dark:bg-dark-6 border border-gray-200 dark:border-dark-4 rounded-2xl shadow p-4 flex
        flex-col relative animate-pulse"
    >
      <div className="absolute top-2 right-2">
        <Skeleton height={24} width={80} radius="xl" />
      </div>

      <Skeleton height={160} radius="lg" className="mb-4 aspect-video" />

      <div className="flex-1">
        <Skeleton height={20} width="60%" radius="sm" className="mb-2" />

        <div className="flex items-center gap-2 mt-2 mb-4">
          <Skeleton height={20} width={100} radius="xl" />
          <Skeleton height={16} width={40} radius="xl" />
        </div>

        <div className="mt-4 flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Skeleton height={16} width={16} circle />
            <Skeleton height={16} width="40%" radius="sm" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton height={16} width={16} circle />
            <Skeleton height={16} width="30%" radius="sm" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton height={16} width={16} circle />
            <Skeleton height={16} width="35%" radius="sm" />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Skeleton height={24} width={80} radius="xl" />
        <div className="flex gap-2">
          <Skeleton height={32} width={32} radius="xl" />
          <Skeleton height={32} width={32} radius="xl" />
        </div>
      </div>
    </div>
  );
};

export default InstructorCourseCardSkeleton;
