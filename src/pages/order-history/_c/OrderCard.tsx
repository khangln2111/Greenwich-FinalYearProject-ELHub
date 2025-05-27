import { ChevronRight } from "lucide-react";
import { FirstOrderItemPreviewer } from "./FirstOrderItemPreviewer";
import { Order } from "../OrderHistoryPage";

type Props = {
  order: Order;
};

export function OrderCard({ order }: Props) {
  const totalAmount = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const firstItem = order.items[0];
  const remainingCount = order.items.length - 1;

  return (
    <div className="bg-body rounded-lg mb-6">
      <div
        className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-dark-4 text-sm
          text-gray-600 dark:text-gray-300 gap-2"
      >
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
          <span className="font-bold text-sm md:text-md">#{order.id}</span>
          <span className="text-gray-400 visible-from-md">|</span>
          <span>{order.method}</span>
          <span className="text-gray-400 visible-from-md">|</span>
          <span className="text-dimmed font-semibold text-md">{order.date}</span>
        </div>
        <span className={`font-semibold md:text-md shrink-0 ${order.statusColor}`}>
          {order.status}
        </span>
      </div>

      <FirstOrderItemPreviewer item={firstItem} remainingCount={remainingCount} />

      <div className="flex justify-between items-center px-4 pb-4 text-sm">
        <div className="text-sm text-blue-600 mt-1 inline-flex items-center cursor-pointer hover:underline">
          View details
          <ChevronRight className="size-4 ml-1" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-md">Total Amount:</span>
          <span className="text-blue-600 font-semibold text-lg">
            ${totalAmount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
