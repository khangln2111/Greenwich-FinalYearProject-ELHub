import { Anchor, Divider, Title } from "@mantine/core";
import { cn } from "../../utils/cn";
import { Link, Navigate, useParams } from "react-router-dom";
import SummaryDecorator from "../../components/SummaryDecorator";
import { ArrowLeft } from "lucide-react";
import { useGetOrderDetailSelf } from "../../react-query/order/orderHooks";
import CenterLoader from "../../components/CenterLoader";

const mockOrder = {
  id: "132E97B7-9543-4E90-A32D-BAAE4A09D705",
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
  const { orderId } = useParams<{ orderId: string }>();

  const { data, isPending, error } = useGetOrderDetailSelf(orderId!);

  if (error || !orderId) return <Navigate to="/404" replace />;

  if (isPending) return <CenterLoader />;

  console.log("Order Detail Data:", data);

  const totalOriginal = items.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const totalDiscounted = items.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0,
  );
  const totalDirectDiscount = totalOriginal - totalDiscounted;
  const finalTotalAmount = totalDiscounted;

  return (
    <div className="bg-gray-200 dark:bg-dark-5 text-gray-900 dark:text-white flex-1">
      <div className="container p-4 md:p-6 xl:px-25 py-10">
        <Anchor
          className="text-xl font-semibold mb-4 flex items-center ml-5 lg:ml-0"
          component={Link}
          to="/dashboard/order-history"
        >
          <ArrowLeft className="inline-block mr-2" /> Back to order history
        </Anchor>

        <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] items-start gap-6">
          {/* left section:  header and items*/}
          <div>
            {/* Order header */}
            <div className="p-4 border-b bg-body rounded-lg text-sm text-gray-600 dark:text-gray-300 flex flex-col gap-4">
              {/* Section: Order ID + Status */}
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div className="flex items-center gap-2 font-bold text-md text-gray-900 dark:text-white">
                  <span className="text-primary">#{id}</span>
                </div>
                <div
                  className={cn(
                    "text-sm font-medium px-3 py-1 rounded-full",
                    status === "Success"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
                  )}
                >
                  {status}
                </div>
              </div>
              <Divider className="-mx-4 -mt-2 border-gray-200 dark:border-dark-5" size="md" />
              {/* Section: Payment */}
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">Payment Method</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {paymentMethod}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">Purchase Date</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{date}</p>
                </div>
              </div>
              <Divider variant="dashed" className="border-default-border" />
              {/* Section: Access Info */}
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
            {/* items list title */}
            <h2 className="text-md font-medium mt-6">Items in order</h2>
            {/* Items */}
            <div className="p-4 divide-y bg-body rounded-lg mt-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-4 py-4 last:pb-0 first:pt-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="size-15 object-cover rounded-lg border"
                  />
                  <div className="flex-1 flex flex-col justify-between gap-2 lg:flex-row lg:gap-4 lg:self-stretch lg:items-center">
                    <div className="flex-1">
                      <p className="font-medium leading-tight">{item.title}</p>
                    </div>
                    <div className="flex gap-4 items-center justify-between lg:gap-6">
                      <div className="flex flex-row items-baseline gap-3 lg:gap-1 lg:flex-col lg:items-end lg:self-center">
                        <p className="font-semibold">
                          ${item.discountedPrice.toLocaleString("en-US")}
                        </p>
                        <p className="text-sm text-dimmed font-semibold line-through">
                          ${item.originalPrice.toLocaleString("en-US")}
                        </p>
                      </div>
                      <div className="text-md text-gray-600 dark:text-gray-300">
                        x{item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Order summary */}
          <div>
            <div className="bg-body rounded-t-lg shadow p-4">
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
              <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                <span>Paid via</span>
                <div className="flex items-center gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                    alt="Visa"
                    className="h-5"
                  />
                  <span className="font-medium text-gray-700 dark:text-gray-300">Debit Card</span>
                </div>
              </div>
            </div>
            <SummaryDecorator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryDetailPage;
