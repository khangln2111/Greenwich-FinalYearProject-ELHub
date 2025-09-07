import { Select, Title } from "@mantine/core";
import { ArrowUpDownIcon } from "lucide-react";
import { parseAsInteger, parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";
import { decodeOrderOption, encodeOrderOption, OrderBy } from "../../../api-client/api.types";
import AppPagination from "../../../components/AppPagination/AppPagination";
import CenterLoader from "../../../components/CenterLoader/CenterLoader";
import { useGetOrdersSelf } from "../../../features/order/order.hooks";
import { OrderOrderableFields, OrderStatus } from "../../../features/order/order.types";
import { OrderCard } from "./_c/OrderCard";
import OrderHistoryPageEmptyState from "./_c/OrderHistoryPageEmptyState";
import { OrderHistoryTabs } from "./_c/OrderHistoryTabs";
import { PageSEO } from "../../../components/PageSEO/PageSEO";

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
      <PageSEO title="Order History" description="View and manage all your orders on ELHub" />

      <div className="flex items-baseline-last md:items-center gap-10 justify-between mb-4">
        <Title order={1} className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          My Orders
        </Title>

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
        <OrderHistoryPageEmptyState />
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
