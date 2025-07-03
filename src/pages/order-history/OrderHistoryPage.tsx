import { Select } from "@mantine/core";
import { IconReceipt } from "@tabler/icons-react";
import { ArrowUpDownIcon } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CenterLoader from "../../components/CenterLoader";
import { OrderOrderableFields, OrderStatus } from "../../react-query/order/order.types";
import { useGetOrdersSelf } from "../../react-query/order/orderHooks";
import { OrderCard } from "./_c/OrderCard";
import { OrderHistoryTabs } from "./_c/OrderHistoryTabs";
import { decodeOrderOption, encodeOrderOption, OrderBy } from "../../http-client/api.types";

const ORDER_BY_OPTIONS: {
  label: string;
  value: OrderBy<OrderOrderableFields>;
}[] = [
  { label: "Date: Newest first", value: { field: "createdAt", direction: "desc" } },
  { label: "Date: Oldest first", value: { field: "createdAt", direction: "asc" } },
  { label: "Total: Low to High", value: { field: "totalAmount", direction: "asc" } },
  { label: "Total: High to Low", value: { field: "totalAmount", direction: "desc" } },
];

function parseStatus(param: string | null): OrderStatus | undefined {
  // Nếu không có hoặc là "All", không filter status
  if (!param || param === "All") return undefined;

  // Kiểm tra có phải 1 trong các giá trị OrderStatus không
  if (Object.values(OrderStatus).includes(param as OrderStatus)) {
    return param as OrderStatus;
  }
  return undefined; // fallback không filter
}

export default function OrderHistoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Lấy status param, mặc định "All"
  const initialStatus = searchParams.get("status") ?? "All";
  const [activeTab, setActiveTab] = useState(initialStatus);

  // Lấy orderBy param, mặc định createdAt_desc
  const orderByParamValue =
    searchParams.get("orderBy") ||
    encodeOrderOption<OrderOrderableFields>({ field: "createdAt", direction: "desc" });
  const orderBy = decodeOrderOption<OrderOrderableFields>(orderByParamValue, "createdAt", "desc");

  // Tính status filter cho API call
  const statusFilter = parseStatus(activeTab);

  const { data, isPending, error } = useGetOrdersSelf({
    orderBy: orderBy,
    status: statusFilter,
  });

  // Khi orderBy thay đổi
  const onOrderByChange = (value: string | null) => {
    if (!value) return;
    searchParams.set("orderBy", value);
    setSearchParams(searchParams);
  };

  // Khi tab status thay đổi
  const onTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
    if (tabValue === "All") {
      searchParams.delete("status");
    } else {
      searchParams.set("status", tabValue);
    }
    setSearchParams(searchParams);
  };

  if (error) return <div>Error loading orders: {error.message}</div>;

  return (
    <div>
      <div className="flex items-center gap-10 justify-between mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">My Orders</h1>

        <Select
          data={ORDER_BY_OPTIONS.map((opt) => ({
            label: opt.label,
            value: encodeOrderOption(opt.value),
          }))}
          value={orderByParamValue}
          onChange={onOrderByChange}
          rightSection={<ArrowUpDownIcon size={16} />}
          searchable={false}
          clearable={false}
          placeholder="Sort by"
          style={{ width: 220 }}
        />
      </div>

      <OrderHistoryTabs activeTab={activeTab} onTabChange={onTabChange} />

      {isPending ? (
        <CenterLoader />
      ) : data.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <IconReceipt className="w-16 h-16 text-blue-500" />

          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">No orders found</h2>
          <p className="text-gray-600 dark:text-gray-400">
            You haven't purchased anything yet. Discover top-rated courses and start learning today!
          </p>
          <Link
            to="/courses"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium
              transition"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="mx-auto mt-4">
          {data.items.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
