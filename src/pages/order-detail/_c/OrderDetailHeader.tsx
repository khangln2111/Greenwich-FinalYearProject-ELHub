import { Divider } from "@mantine/core";
import { OrderDetailVm, OrderStatus } from "../../../features/order/order.types";
import { cn } from "../../../utils/cn";
import { formatDate } from "../../../utils/format";

export function getStatusStyle(status: OrderStatus) {
  switch (status) {
    case "Completed":
      return "text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/40";
    case "Failed":
      return "text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/40";
    case "Incomplete":
      return "text-yellow-800 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/40";
    default:
      return "text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900/40";
  }
}

const OrderDetailHeader = ({ order }: { order: OrderDetailVm }) => {
  return (
    <div className="p-4 border-b bg-body rounded-lg text-sm text-gray-600 dark:text-gray-300 flex flex-col gap-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-2 font-bold text-md text-gray-900 dark:text-white">
          <span className="text-primary uppercase">#{order.id}</span>
        </div>
        <div
          className={cn("text-sm font-medium px-3 py-1 rounded-md", getStatusStyle(order.status))}
        >
          {order.status}
        </div>
      </div>

      <Divider className="-mx-4 -mt-2 border-gray-200 dark:border-dark-5" size="md" />

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <p className="text-gray-500 dark:text-gray-400 mb-1">Payment Method</p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100 capitalize">
            {order.paymentMethodType ?? "None"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 mb-1">Purchase Date</p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            {formatDate({ input: order.createdAt, formatType: "longMonthWithTime" })}
          </p>
        </div>
      </div>

      <Divider variant="dashed" className="border-default-border" />

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <p className="text-gray-500 dark:text-gray-400 mb-1">Access Type</p>
          <p className="text-sm text-primary-6 dark:text-primary-700">Lifetime Access</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 mb-1">Download Option</p>
          <p className="text-sm text-gray-800 dark:text-gray-100">Stream only</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailHeader;
