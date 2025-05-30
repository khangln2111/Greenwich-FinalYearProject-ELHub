import { Select } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import CenterLoader from "../../components/CenterLoader";
import { useGetOrdersSelf } from "../../react-query/order/orderHooks";
import { OrderCard } from "./_c/OrderCard";
import { OrderHistoryTabs } from "./_c/OrderHistoryTabs";
import { ArrowUpDownIcon } from "lucide-react";
import { useState } from "react";
import { OrderSortableFields, OrderStatus } from "../../react-query/order/order.types";

const ORDER_BY_OPTIONS = [
  { value: "createdAt_desc", label: "Date: Newest first" },
  { value: "createdAt_asc", label: "Date: Oldest first" },
  { value: "totalAmount_asc", label: "Total: Low to High" },
  { value: "totalAmount_desc", label: "Total: High to Low" },
];

function parseOrderBy(param: string | null) {
  if (!param) return ORDER_BY_OPTIONS[0].value;
  return ORDER_BY_OPTIONS.some((o) => o.value === param) ? param : ORDER_BY_OPTIONS[0].value;
}

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
  const orderByParam = parseOrderBy(searchParams.get("orderBy"));
  const [field, direction] = orderByParam.split("_");

  // Tính status filter cho API call
  const statusFilter = parseStatus(activeTab);

  const { data, isPending, error } = useGetOrdersSelf({
    orderBy: { field: field as OrderSortableFields, direction: direction as "asc" | "desc" },
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
          data={ORDER_BY_OPTIONS}
          value={orderByParam}
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
