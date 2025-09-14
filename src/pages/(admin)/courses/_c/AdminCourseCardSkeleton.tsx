import { Skeleton } from "@mantine/core";

const AdminCourseCardSkeleton = () => {
  return (
    <div
      className="border rounded-2xl overflow-hidden shadow-sm transition-all bg-white
        dark:bg-zinc-900 flex flex-col cursor-pointer"
    >
      {/* Image */}
      <Skeleton height={180} width="100%" />

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Title + Status */}
        <div className="space-y-2 flex-1">
          <Skeleton height={20} width="80%" radius="sm" />
          <Skeleton height={18} width={90} radius="xl" />
        </div>

        {/* Meta info */}
        <div className="text-sm space-y-2 leading-snug">
          <Skeleton height={14} width="60%" />
          <Skeleton height={14} width="70%" />
          <Skeleton height={14} width="50%" />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 text-[13px]">
          <div
            className="flex flex-col items-center justify-center rounded-md bg-gray-100
              dark:bg-zinc-800 px-2 py-2 w-full h-[70px]"
          >
            <Skeleton height={16} width={16} radius="sm" />
            <Skeleton height={14} width={20} mt={6} />
            <Skeleton height={12} width={40} mt={2} />
          </div>
          <div
            className="flex flex-col items-center justify-center rounded-md bg-gray-100
              dark:bg-zinc-800 px-2 py-2 w-full h-[70px]"
          >
            <Skeleton height={16} width={16} radius="sm" />
            <Skeleton height={14} width={20} mt={6} />
            <Skeleton height={12} width={40} mt={2} />
          </div>
          <div
            className="flex flex-col items-center justify-center rounded-md bg-gray-100
              dark:bg-zinc-800 px-2 py-2 w-full h-[70px]"
          >
            <Skeleton height={16} width={16} radius="sm" />
            <Skeleton height={14} width={40} mt={6} />
            <Skeleton height={12} width={50} mt={2} />
          </div>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-3">
          <Skeleton circle height={40} width={40} />
          <div className="flex flex-col gap-1">
            <Skeleton height={14} width={100} />
            <Skeleton height={12} width={120} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCourseCardSkeleton;
