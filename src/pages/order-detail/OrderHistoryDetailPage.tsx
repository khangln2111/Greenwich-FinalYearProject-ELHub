import { Title } from "@mantine/core";
import { cn } from "../../utils/cn";

const mockOrder = {
  id: "345234259800",
  paymentMethod: "Payment Card",
  date: "10/12/2025",
  status: "Success",
  items: [
    {
      id: "1",
      title: "Modern JavaScript From The Beginning 2.0 (2024)",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0jQPcLR2zDp6yPjuN6OqywK4v0ybNPxu1kw&s",
      originalPrice: 1000,
      discountedPrice: 800,
      quantity: 2,
    },
    {
      id: "2",
      title: "Advanced React Patterns (2024)",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0jQPcLR2zDp6yPjuN6OqywK4v0ybNPxu1kw&s",
      originalPrice: 1200,
      discountedPrice: 950,
      quantity: 1,
    },
  ],
};

const OrderHistoryDetailPage = () => {
  const { id, paymentMethod, date, status, items } = mockOrder;

  const totalOriginal = items.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const totalDiscounted = items.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0,
  );
  const totalDirectDiscount = totalOriginal - totalDiscounted;
  const finalTotalAmount = totalDiscounted;

  return (
    <div className="bg-gray-200 dark:bg-dark-5 text-gray-900 dark:text-white flex-1">
      <div className="p-4 md:p-6 xl:px-15 py-10 container grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] items-start gap-6">
        {/* Order info summary */}
        <div className="bg-body rounded-lg">
          <div
            className="flex justify-between items-center p-4 border-b text-sm text-gray-600 dark:text-gray-300 gap-2
              flex-wrap"
          >
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
              <span className="font-bold text-sm md:text-md">#{id}</span>
              <span className="text-gray-400 visible-from-md">|</span>
              <span>{paymentMethod}</span>
              <span className="text-gray-400 visible-from-md">|</span>
              <span className="text-dimmed font-semibold text-md">{date}</span>
            </div>
            <span className="font-semibold md:text-md text-green-600">{status}</span>
          </div>

          {/* Items */}
          <div className="p-4 divide-y">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-start gap-4 py-4",
                  idx === 0 ? "pt-0" : "",
                  idx === items.length - 1 ? "pb-0" : "",
                )}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-15 object-cover rounded-md border"
                />
                <div className="flex-1 flex flex-col justify-between gap-2 lg:flex-row lg:gap-4 lg:self-stretch lg:items-center">
                  <div className="flex-1">
                    <p className="font-medium leading-tight">{item.title}</p>
                  </div>
                  <div className="flex gap-4 items-center justify-between lg:gap-6">
                    <div className="flex flex-col items-end">
                      <p className="text-sm text-dimmed font-semibold line-through">
                        ${item.originalPrice.toLocaleString("en-US")}
                      </p>
                      <p className="text-blue-500 font-semibold">
                        ${item.discountedPrice.toLocaleString("en-US")}
                      </p>
                    </div>
                    <div className="text-md text-gray-600 dark:text-gray-300">x{item.quantity}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-body lg:rounded-2xl shadow p-4">
          <Title order={3} className="text-xl font-semibold mb-4">
            Order Summary
          </Title>
          <div className="bg-primary-filled w-[45px] h-[2px] mt-sm" />

          <div className="mt-4 space-y-2 text-lg">
            <div className="flex justify-between">
              <span>Provisional</span>
              <span className="font-semibold">${totalOriginal.toLocaleString("en-US")}</span>
            </div>
            <div className="flex justify-between">
              <span>Direct discount</span>
              <span className="text-orange-500">
                - ${totalDirectDiscount.toLocaleString("en-US")}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Voucher discount</span>
              <span className="text-orange-500">$0</span>
            </div>
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between items-center text-lg font-semibold">
            <span>Total Amount</span>
            <span className="text-blue-500 dark:text-blue-600 text-xl font-bold">
              ${finalTotalAmount.toLocaleString("en-US")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryDetailPage;
