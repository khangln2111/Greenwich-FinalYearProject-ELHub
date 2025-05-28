import { Anchor, Divider, Title } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import CenterLoader from "../../components/CenterLoader";
import SummaryDecorator from "../../components/SummaryDecorator";
import { OrderStatus } from "../../react-query/order/order.types";
import { useGetOrderDetailSelf } from "../../react-query/order/orderHooks";
import { cn } from "../../utils/cn";
import { formatDate } from "../../utils/format";

const OrderHistoryDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();

  const { data, isPending, error } = useGetOrderDetailSelf(orderId!);

  if (error || !orderId) return <Navigate to="/404" replace />;

  if (isPending) return <CenterLoader />;

  console.log("Order Detail Data:", data);

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
                  <span className="text-primary uppercase">#{data.id}</span>
                </div>
                <div
                  className={cn(
                    "text-sm font-medium px-3 py-1 rounded-full",
                    getStatusStyle(data.status),
                  )}
                >
                  {data.status}
                </div>
              </div>
              <Divider className="-mx-4 -mt-2 border-gray-200 dark:border-dark-5" size="md" />
              {/* Section: Payment */}
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">Payment Method</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 capitalize">
                    {data.paymentMethodType ?? "None"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">Purchase Date</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {formatDate(data.createdAt)}
                  </p>
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
              {data.orderItems.map((item) => (
                <div key={item.id} className="flex items-start gap-4 py-4 last:pb-0 first:pt-0">
                  <img
                    src={item.courseImageUrl}
                    alt={item.courseTitle}
                    className="size-15 object-cover rounded-lg border"
                  />
                  <div className="flex-1 flex flex-col justify-between gap-2 lg:flex-row lg:gap-4 lg:self-stretch lg:items-center">
                    <div className="flex-1">
                      <p className="font-medium leading-tight">{item.courseTitle}</p>
                    </div>
                    <div className="flex gap-4 items-center justify-between lg:gap-6">
                      <div className="flex flex-row items-baseline gap-3 lg:gap-1 lg:flex-col lg:items-end lg:self-center">
                        <p className="font-semibold">
                          ${item.discountedPrice.toLocaleString("en-US")}
                        </p>
                        <p className="text-sm text-dimmed font-semibold line-through">
                          ${item.price.toLocaleString("en-US")}
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
                  <span className="font-semibold">
                    ${data.provisionalAmount.toLocaleString("en-US")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Direct discount</span>
                  <span className="text-orange-500">
                    - ${data.totalDirectDiscount.toLocaleString("en-US")}
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
                  ${data.totalAmount.toLocaleString("en-US")}
                </span>
              </div>
              {data.status !== OrderStatus.Incomplete && (
                <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                  <span>Paid via</span>
                  <div className="flex items-center gap-2">
                    <img
                      src={getPaymentBrandIcon(data.paymentMethodBrand)}
                      alt={data.paymentMethodBrand ?? "Card"}
                      className="h-5"
                    />
                    <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {data.paymentMethodBrand ?? "Card"} •••• {data.paymentMethodLast4 ?? "XXXX"}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <SummaryDecorator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryDetailPage;

function getPaymentBrandIcon(brand?: string): string {
  switch (brand?.toLowerCase()) {
    case "visa":
      return "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg";
    case "mastercard":
      return "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg";
    default:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Credit_card_font_awesome.svg/1200px-Credit_card_font_awesome.svg.png"; // Generic card icon
  }
}

function getStatusStyle(status: OrderStatus) {
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
