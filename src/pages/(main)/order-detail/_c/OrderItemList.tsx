import { Link } from "react-router-dom";
import { OrderItemVm } from "../../../../features/order/order.types";

const OrderItemList = ({ items }: { items: OrderItemVm[] }) => {
  return (
    <div>
      <h2 className="text-md font-medium mt-6">Items in order</h2>
      <div className="p-4 divide-y bg-body rounded-lg mt-1">
        {items.map((item) => (
          <Link
            to={`/courses/${item.courseId}`}
            key={item.id}
            className="flex items-start gap-4 py-4 last:pb-0 first:pt-0 group"
          >
            <img
              src={item.courseImageUrl}
              alt={item.courseTitle}
              className="size-15 object-cover rounded-lg border"
            />
            <div className="flex-1 flex flex-col justify-between gap-2 lg:flex-row lg:gap-4 lg:self-stretch lg:items-center">
              <div className="flex-1">
                <p className="font-medium leading-tight group-hover:text-blue-600 group-dark:hover:text-blue-400">
                  {item.courseTitle}
                </p>
              </div>
              <div className="flex gap-4 items-center justify-between lg:gap-6">
                <div className="flex flex-row items-baseline gap-3 lg:gap-1 lg:flex-col lg:items-end lg:self-center">
                  <p className="font-semibold">${item.discountedPrice.toLocaleString("en-US")}</p>
                  <p className="text-sm text-dimmed font-semibold line-through">
                    ${item.price.toLocaleString("en-US")}
                  </p>
                </div>
                <div className="text-md text-gray-600 dark:text-gray-300">x{item.quantity}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrderItemList;
