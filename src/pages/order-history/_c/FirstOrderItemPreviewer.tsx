import { OrderItem } from "../OrderHistoryPage";

type Props = {
  item: OrderItem;
  remainingCount?: number;
};

export function FirstOrderItemPreviewer({ item, remainingCount = 0 }: Props) {
  const shouldShowOriginalPrice =
    item.discountedPrice !== undefined && item.discountedPrice < item.price;
  return (
    <div className="flex items-center p-4 gap-4">
      <div className="size-16 flex items-center justify-center border rounded-lg">
        {item.thumbnail && <img src={item.thumbnail} alt={item.title} className="object-cover" />}
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm">{item.title}</p>
        {remainingCount > 0 && (
          <p className="text-sm text-gray-500 dark:text-dark-2">+{remainingCount} more item</p>
        )}
      </div>

      <div className="text-right text-sm md:text-md">
        <div>
          <span className="font-medium text-text">
            {shouldShowOriginalPrice
              ? `$${item.discountedPrice!.toLocaleString()}`
              : `$${item.price.toLocaleString()}`}
          </span>
          {shouldShowOriginalPrice && (
            <span className="line-through text-dimmed ml-2">${item.price.toLocaleString()}</span>
          )}
        </div>

        <p className="text-gray-500">x{item.quantity}</p>
      </div>
    </div>
  );
}
