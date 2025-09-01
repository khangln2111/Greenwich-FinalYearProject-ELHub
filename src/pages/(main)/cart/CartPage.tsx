import { Anchor, Box, Checkbox, Divider, Loader } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SummaryDecorator from "../../../components/SummaryDecorator/SummaryDecorator";
import { UpdateCartItemCommand } from "../../../features/cart/cart.types";
import { useDeleteCartItem, useGetCart, useUpdateCartItem } from "../../../features/cart/cartHooks";
import CartItemCard from "./_c/CartItemCard";
import CartSummary from "./_c/CartSummary";
import EmptyCartPlaceholder from "./_c/EmptyCartPlaceholder";

export default function CartPage() {
  const { data, isLoading } = useGetCart();
  const updateCartItem = useUpdateCartItem();
  const deleteCartItem = useDeleteCartItem();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );

  if (!data) return <div>No data</div>;

  const cartItems = data?.cartItems ?? [];
  const selectedItems = cartItems.filter((item) => selectedIds.includes(item.id));

  if ((data?.cartItems ?? []).length === 0) {
    return <EmptyCartPlaceholder />;
  }

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
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onChangeQuantity={(id, delta) => handleQuantityChange(id, delta, item.quantity)}
                  onRemove={handleRemove}
                  checked={selectedIds.includes(item.id)}
                  onToggle={handleToggle}
                  className="last:pb-0"
                />
              ))}
            </div>
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
