import { Skeleton } from "@mantine/core";
import { cn } from "../../../../utils/cn";

type CartItemCardSkeletonProps = {
  className?: string;
};

const CartItemCardSkeleton = ({ className }: CartItemCardSkeletonProps) => {
  return (
    <div className={cn("flex items-start py-4 gap-4", className)}>
      {/* Checkbox + image */}
      <div className="flex gap-5 items-center">
        <Skeleton className="size-5 rounded" />
        <Skeleton className="size-20 rounded-md" />
      </div>

      <div className="flex-1 flex flex-col justify-between gap-2 lg:flex-row lg:gap-4 lg:self-stretch lg:items-center">
        {/* Title + summary */}
        <div className="flex lg:block items-center">
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center gap-1 text-sm md:items-end md:text-md lg:gap-0 lead">
              <Skeleton className="h-4 w-40 rounded" />
              <Skeleton className="size-5 rounded lg:hidden" />
            </div>
            <Skeleton className="h-3 w-28 mt-1 rounded" />
          </div>
        </div>

        {/* Price + quantity + trash */}
        <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-6 lg:self-center">
          <div className="flex flex-row items-baseline gap-3 lg:gap-1 lg:flex-col lg:items-end lg:self-center">
            <Skeleton className="h-4 w-16 rounded" /> {/* discounted price */}
            <Skeleton className="h-3 w-12 rounded" /> {/* original price */}
          </div>
          <Skeleton className="h-8 w-24 rounded" /> {/* quantity control */}
          <Skeleton className="size-5 rounded hidden lg:block self-center" /> {/* trash icon */}
        </div>
      </div>
    </div>
  );
};

export default CartItemCardSkeleton;
