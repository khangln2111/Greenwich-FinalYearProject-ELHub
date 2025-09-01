import { Select } from "@mantine/core";
import { IconReceipt } from "@tabler/icons-react";
import { ArrowUpDownIcon } from "lucide-react";
import { parseAsInteger, parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";
import { Link } from "react-router-dom";
import { decodeOrderOption, encodeOrderOption, OrderBy } from "../../../api-client/api.types";
import AppPagination from "../../../components/AppPagination/AppPagination";
import CenterLoader from "../../../components/CenterLoader/CenterLoader";
import { OrderOrderableFields, OrderStatus } from "../../../features/order/order.types";
import { useGetOrdersSelf } from "../../../features/order/order.hooks";
import { OrderCard } from "./_c/OrderCard";
import { OrderHistoryTabs } from "./_c/OrderHistoryTabs";

const ORDER_SORT_OPTIONS: {
  label: string;
  value: OrderBy<OrderOrderableFields>;
}[] = [
  { label: "Date: Newest first", value: { field: "createdAt", direction: "desc" } },
  { label: "Date: Oldest first", value: { field: "createdAt", direction: "asc" } },
  { label: "Total: Low to High", value: { field: "totalAmount", direction: "asc" } },
  { label: "Total: High to Low", value: { field: "totalAmount", direction: "desc" } },
];

export default function OrderHistoryPage() {
  const [statusParam, setStatusParam] = useQueryState(
    "status",
    parseAsStringLiteral(["All", ...Object.values(OrderStatus)]).withDefault("All"),
  );
  const [orderByParam, setOrderByParam] = useQueryState(
    "orderBy",
    parseAsString.withDefault(encodeOrderOption({ field: "createdAt", direction: "desc" })),
  );
  const decodedOrderBy = decodeOrderOption<OrderOrderableFields>(orderByParam, "createdAt", "desc");

  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ scroll: true }),
  );
  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(3));

  const { data, isPending, error } = useGetOrdersSelf({
    orderBy: decodedOrderBy,
    status: statusParam === "All" ? undefined : statusParam,
    page: page,
    pageSize: pageSize,
  });

  if (error) return <div>Error loading orders: {error.message}</div>;

  return (
    <div>
      <div className="flex items-baseline-last md:items-center gap-10 justify-between mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">My Orders</h1>

        <Select
          data={ORDER_SORT_OPTIONS.map((opt) => ({
            label: opt.label,
            value: encodeOrderOption(opt.value),
          }))}
          value={orderByParam}
          onChange={(value) => value && setOrderByParam(value)}
          rightSection={<ArrowUpDownIcon size={16} />}
          placeholder="Sort by"
          style={{ width: 220 }}
          checkIconPosition="right"
        />
      </div>

      <OrderHistoryTabs activeTab={statusParam} onTabChange={setStatusParam} />

      {isPending ? (
        <CenterLoader />
      ) : data.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <IconReceipt className="w-16 h-16 text-primary-5" />

          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">No orders found</h2>
          <p className="text-gray-600 dark:text-gray-400">
            You haven't purchased anything yet. Discover top-rated courses and start learning today!
          </p>
          <Link
            to="/courses"
            className="inline-block bg-primary-6 hover:bg-primary-7 text-white px-5 py-2 rounded-lg text-sm font-medium
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
      <AppPagination
        page={page}
        pageSize={pageSize}
        itemsCount={data?.count ?? 0}
        onPageChange={setPage}
        withEdges
        className="flex justify-center items-center mt-10"
      />
    </div>
  );
}
