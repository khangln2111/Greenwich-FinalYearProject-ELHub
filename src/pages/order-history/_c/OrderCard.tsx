import { ChevronRight } from "lucide-react";
import { FirstOrderItemPreviewer } from "./FirstOrderItemPreviewer";
import { Box } from "@mantine/core";
import { Link } from "react-router-dom";
import { OrderStatus, OrderVm } from "../../../react-query/order/order.types";
import { formatDate } from "../../../utils/format";

type Props = {
  order: OrderVm;
};
function getStatusStyle(status: OrderStatus) {
  switch (status) {
    case "Completed":
      return "text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded text-xs font-semibold";
    case "Failed":
      return "text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/40 px-2 py-1 rounded text-xs font-semibold";
    case "Incomplete":
      return "text-yellow-800 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/40 px-2 py-1 rounded text-xs font-semibold";
    default:
      return "text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900/40 px-2 py-1 rounded text-xs font-semibold";
  }
}

export function OrderCard({ order }: Props) {
  const totalAmount = order.totalAmount.toFixed(2);

  const firstItem = order.firstOrderItem;
  const remainingCount = order.itemCount > 1 ? order.itemCount - 1 : 0;

  return (
    <div className="bg-body rounded-lg mb-6">
      <div
        className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-dark-4 text-sm
          text-gray-600 dark:text-gray-300 gap-2 flex-wrap"
      >
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
          <span className="font-bold text-sm md:text-md uppercase">#{order.id}</span>
          <span className="text-gray-400 visible-from-md">|</span>
          <span className="capitalize">Paid via: {order.paymentMethodType ?? "None"}</span>
          <span className="text-gray-400 visible-from-md">|</span>
          <span className="text-dimmed font-semibold text-md">{formatDate(order.createdAt)}</span>
        </div>
        <span className={getStatusStyle(order.status)}>{order.status}</span>
      </div>

      {firstItem && <FirstOrderItemPreviewer item={firstItem} remainingCount={remainingCount} />}

      <div className="flex justify-between items-center px-4 pb-4 text-sm">
        <Box
          component={Link}
          to={`/dashboard/order-history/${order.id}`}
          className="text-sm text-blue-600 mt-1 inline-flex items-center cursor-pointer hover:underline"
        >
          View details
          <ChevronRight className="size-4 ml-1" />
        </Box>
        <div className="flex items-center gap-2">
          <span className="text-md">Total Amount:</span>
          <span className="text-blue-600 font-semibold text-lg">${totalAmount}</span>
        </div>
      </div>
    </div>
  );
}
