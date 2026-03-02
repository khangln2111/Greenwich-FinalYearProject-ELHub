import { Link } from "react-router";
import { OrderItemVm } from "../../../../features/order/order.types";

type Props = {
  item: OrderItemVm;
  remainingCount?: number;
};

export function FirstOrderItemPreviewer({ item, remainingCount = 0 }: Props) {
  const shouldShowOriginalPrice =
    item.discountedPrice !== undefined && item.discountedPrice < item.price;
  return (
    <Link
      className="flex items-center p-4 gap-4 group cursor-pointer"
      to={`/courses/${item.courseId}`}
    >
      <div className="size-16 flex items-center justify-center border rounded-lg overflow-hidden">
        {item.courseImageUrl && (
          <img
            src={item.courseImageUrl}
            alt={item.courseTitle}
            className="object-cover aspect-square"
          />
        )}
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm group-hover:text-blue-600 group-dark:hover:text-blue-400">
          {item.courseTitle}
        </p>
        {remainingCount > 0 && (
          <p className="text-sm text-gray-500 dark:text-dark-2">+{remainingCount} more item</p>
        )}
      </div>

      <div className="text-right text-sm md:text-lg">
        <div>
          <span className="font-medium">
            {shouldShowOriginalPrice
              ? `$${item.discountedPrice!.toLocaleString("en-US")}`
              : `$${item.price.toLocaleString("en-US")}`}
          </span>
          {shouldShowOriginalPrice && (
            <span className="line-through text-dimmed ml-2">
              ${item.price.toLocaleString("en-US")}
            </span>
          )}
        </div>

        <p className="text-gray-500">x{item.quantity}</p>
      </div>
    </Link>
  );
}
