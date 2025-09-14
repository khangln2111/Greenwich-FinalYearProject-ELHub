import { CartItemVm } from "../../../../features/cart/cart.types";
import { cn } from "../../../../utils/cn";

interface CheckoutItemProps {
  item: CartItemVm;
  className?: string;
}

const CheckoutItem = ({ item, className }: CheckoutItemProps) => {
  return (
    <div className={cn("flex items-start py-4 gap-4", className)}>
      <img
        src={item.courseImageUrl}
        alt={item.courseSummary}
        className="size-20 object-cover rounded-md border"
      />
      <div className="flex-1 flex flex-col justify-between gap-2 lg:flex-row lg:gap-4 lg:self-stretch lg:items-center">
        <div className="flex lg:block items-center">
          <div className="flex-1 flex flex-col">
            <p className="font-medium leading-tight">{item.courseTitle}</p>
            <p className="text-sm text-gray-500 line-clamp-1">{item.courseSummary}</p>
          </div>
        </div>
        <div className="flex gap-2 items-center lg:gap-6 lg:self-center justify-between">
          <div className="flex flex-row items-baseline gap-3 lg:gap-1 lg:flex-col lg:items-end lg:self-center">
            <p className="text-blue-500 font-semibold">
              ${item.discountedPrice.toLocaleString("en-US")}
            </p>
            <p className="text-sm text-dimmed font-semibold line-through">
              ${item.price.toLocaleString("en-US")}
            </p>
          </div>
          <div className="text-md text-gray-600 dark:text-gray-300">x{item.quantity}</div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
