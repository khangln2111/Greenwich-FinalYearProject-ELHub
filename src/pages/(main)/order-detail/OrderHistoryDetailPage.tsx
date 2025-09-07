import { Anchor } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import CenterLoader from "../../../components/CenterLoader/CenterLoader";
import SummaryDecorator from "../../../components/SummaryDecorator/SummaryDecorator";
import { useGetOrderDetailSelf } from "../../../features/order/order.hooks";
import OrderDetailHeader from "./_c/OrderDetailHeader";
import OrderItemList from "./_c/OrderItemList";
import OrderSummary from "./_c/OrderSummary";
import { usePageSEO } from "../../../hooks/usePageSEO";

export default function OrderHistoryDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { data, isPending, error } = useGetOrderDetailSelf(orderId!);

  usePageSEO({ title: `Order #${data?.id}` });

  if (error || !orderId) return <Navigate to="/404" replace />;
  if (isPending) return <CenterLoader />;

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
          <div>
            <OrderDetailHeader order={data} />
            <OrderItemList items={data.orderItems} />
          </div>

          <div>
            <OrderSummary data={data} />
            <SummaryDecorator />
          </div>
        </div>
      </div>
    </div>
  );
}
