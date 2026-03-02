import { Skeleton } from "@mantine/core";

export function ReceivedGiftItemCardSkeleton() {
  return (
    <div
      className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow border flex flex-col gap-4
        sm:flex-row sm:items-center sm:justify-between"
    >
      {/* Left */}
      <div className="flex items-start sm:items-center gap-4 flex-1">
        <div className="w-20 h-20 rounded object-cover border shrink-0 overflow-hidden">
          <Skeleton height="100%" width="100%" radius="md" />
        </div>
        <div className="flex flex-col gap-2 text-sm flex-1">
          <Skeleton height={18} width="60%" radius="sm" /> {/* giftName */}
          <Skeleton height={14} width="80%" radius="sm" /> {/* From */}
          <Skeleton height={12} width="40%" radius="sm" /> {/* Date */}
          <div className="sm:hidden mt-2">
            <Skeleton height={20} width={80} radius="xl" /> {/* Badge */}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-2 sm:gap-3">
        <div className="hidden sm:block">
          <Skeleton height={20} width={80} radius="xl" />
        </div>
        <Skeleton height={24} width={70} radius="sm" /> {/* Redeem button */}
      </div>
    </div>
  );
}
