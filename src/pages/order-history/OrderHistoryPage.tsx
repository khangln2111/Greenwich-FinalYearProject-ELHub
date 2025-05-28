import { useState } from "react";
import CenterLoader from "../../components/CenterLoader";
import { useGetOrdersSelf } from "../../react-query/order/orderHooks";
import { OrderCard } from "./_c/OrderCard";
import { OrderHistorySearchbar } from "./_c/OrderHistorySearchbar";
import { OrderHistoryTabs } from "./_c/OrderHistoryTabs";

export default function OrderHistoryPage() {
  const [activeTab, setActiveTab] = useState("All");

  const { data, isPending, error } = useGetOrdersSelf();

  if (isPending) return <CenterLoader />;

  if (error) {
    return <div>Error loading orders: {error.message}</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-10 justify-between">
        <h1 className="text-2xl font-bold mb-4 flex-1">My Orders</h1>
        <OrderHistorySearchbar />
      </div>

      <OrderHistoryTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mx-auto">
        {data.items.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
