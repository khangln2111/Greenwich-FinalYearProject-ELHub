import { Anchor, Box, Checkbox, Divider } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import { Link } from "react-router";
import AppPagination from "../../../components/AppPagination/AppPagination";
import SummaryDecorator from "../../../components/SummaryDecorator/SummaryDecorator";
import {
  useDeleteCartItem,
  useGetCartItemsSelf,
  useUpdateCartItem,
} from "../../../features/cart/cart.hooks";
import { UpdateCartItemCommand } from "../../../features/cart/cart.types";
import { usePageSEO } from "../../../hooks/usePageSEO";
import CartItemCard from "./_c/CartItemCard";
import CartItemCardSkeleton from "./_c/CartItemCardSkeleton";
import CartSummary from "./_c/CartSummary";
import EmptyCartPlaceholder from "./_c/EmptyCartPlaceholder";

export default function CartPage() {
  usePageSEO({ title: "Cart" });
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ scroll: true }),
  );

  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(20));

  const { data, isPending, error } = useGetCartItemsSelf({
    page,
    pageSize,
  });
  const updateCartItem = useUpdateCartItem();
  const deleteCartItem = useDeleteCartItem();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  if (error) return <div>Error loading cart. Please try again later.</div>;

  const cartItems = data?.items || [];
  const selectedItems = cartItems.filter((item) => selectedIds.includes(item.id));

  if (cartItems.length === 0 && !isPending) {
    return <EmptyCartPlaceholder />;
  }

  const handleQuantityChange = (id: string, delta: number, currentQuantity: number) => {
    const newQuantity = Math.max(1, currentQuantity + delta);
    const payload: UpdateCartItemCommand = { id, quantity: newQuantity };
    updateCartItem.mutate(payload);
  };

  const handleRemove = (id: string) => {
    deleteCartItem.mutate(id);
    setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const handleToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    const allIds = cartItems.map((item) => item.id);
    if (selectedIds.length === allIds.length) setSelectedIds([]);
    else setSelectedIds(allIds);
  };

  return (
    <div className="flex-1 bg-[#EDF0F3] dark:bg-dark-5">
      <Box
        className="container pt-[20px] pb-[100px]"
        px={{ base: "0px", lg: "30px", xl: "90px" }}
        size="xl"
      >
        <Anchor
          className="text-xl font-semibold mb-4 flex items-center ml-5 lg:ml-0"
          component={Link}
          to="/courses"
        >
          <ArrowLeft className="inline-block mr-2" /> Continue to shopping
        </Anchor>

        <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] items-start gap-6">
          {/* left section: cart items */}
          <div className="bg-body lg:rounded-2xl shadow-lg p-4">
            <div className="flex items-center font-medium">
              <Checkbox
                checked={selectedIds.length === cartItems.length}
                indeterminate={selectedIds.length > 0 && selectedIds.length < cartItems.length}
                onChange={handleSelectAll}
                className="mr-4"
              />
              Select all ({cartItems.length})
            </div>
            <Divider className="-mx-4 mt-2 border-[#EDF0F3] dark:border-dark-5" size="md" />

            <div className="divide-y">
              {isPending
                ? Array.from({ length: pageSize }).map((_, index) => (
                    <CartItemCardSkeleton key={index} />
                  ))
                : cartItems.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      onChangeQuantity={(id, delta) =>
                        handleQuantityChange(id, delta, item.quantity)
                      }
                      onRemove={handleRemove}
                      checked={selectedIds.includes(item.id)}
                      onToggle={handleToggle}
                      className="last:pb-0"
                    />
                  ))}
            </div>

            <AppPagination
              page={page}
              pageSize={pageSize}
              itemsCount={data?.count ?? 0}
              onPageChange={setPage}
              withEdges
              className="flex justify-center items-center mt-10"
            />
          </div>

          {/* right section: cart summary */}
          <div>
            <CartSummary selectedItems={selectedItems} />
            <SummaryDecorator />
          </div>
        </div>
      </Box>
    </div>
  );
}
