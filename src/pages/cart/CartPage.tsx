import { Box, Checkbox, Loader } from "@mantine/core";
import { Anchor } from "@mantine/core";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useGetCart, useUpdateCartItem, useDeleteCartItem } from "../../react-query/cart/cartHooks";
import CartItem from "./_c/CartItem";
import CartSummary from "./_c/CartSummary";
import { UpdateCartItemCommand } from "../../react-query/cart/cart.types";

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
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-[#EDF0F3] dark:bg-dark-5 px-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-blue-100 dark:bg-blue-900/20 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-full text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 4h14l-1.5 9h-11z" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="17" cy="20" r="1" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Let’s fill your cart with knowledge 📚
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You haven't added any courses yet. Let’s explore and find something you’ll love.
          </p>
          <Anchor
            component={Link}
            to="/courses"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full
              transition"
          >
            Browse Courses
          </Anchor>
        </div>
      </div>
    );
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
          <div className="bg-body lg:rounded-2xl shadow-lg p-4">
            <div className="flex items-center mb-4 font-medium">
              <Checkbox
                checked={selectedIds.length === cartItems.length}
                indeterminate={selectedIds.length > 0 && selectedIds.length < cartItems.length}
                onChange={handleSelectAll}
                className="mr-4"
              />
              Select all ({cartItems.length})
            </div>

            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onChangeQuantity={(id, delta) => handleQuantityChange(id, delta, item.quantity)}
                onRemove={handleRemove}
                checked={selectedIds.includes(item.id)}
                onToggle={handleToggle}
              />
            ))}
          </div>

          <CartSummary selectedItems={selectedItems} />
        </div>
      </Box>
    </div>
  );
}
