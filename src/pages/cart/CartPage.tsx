import { Box, Checkbox, Loader } from "@mantine/core";
import { Anchor } from "@mantine/core";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useGetCart, useUpdateCartItem, useDeleteCartItem } from "../../react-query/cart/cartHooks";
import CartItem from "./_c/CartItem";
import CartSummary from "./_c/CartSummary";
import { UpdateCartItemCommand } from "../../react-query/cart/cart.types";

export default function CartPage() {
  const { data, isLoading } = useGetCart();
  const updateCartItem = useUpdateCartItem();
  const deleteCartItem = useDeleteCartItem();

  const handleQuantityChange = (id: string, delta: number, currentQuantity: number) => {
    const newQuantity = Math.max(1, currentQuantity + delta);
    const payload: UpdateCartItemCommand = { id, quantity: newQuantity };
    updateCartItem.mutate(payload);
  };

  const handleRemove = (id: string) => {
    deleteCartItem.mutate(id);
  };

  if (isLoading) return <Loader />;
  if (!data) return <div>No data</div>;

  const cartItems = data?.cartItems ?? [];
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

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
              <Checkbox defaultChecked className="mr-4" />
              Select all ({cartItems.length})
            </div>

            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onChangeQuantity={(id, delta) => handleQuantityChange(id, delta, item.quantity)}
                onRemove={handleRemove}
              />
            ))}
          </div>

          <CartSummary
            provisional={data.provisional}
            totalDirectDiscount={data.totalDirectDiscount}
            finalTotalAmount={data.totalAmount}
          />
        </div>
      </Box>
    </div>
  );
}
