import { Anchor, Box, Checkbox } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import CartItem from "./_c/CartItem";
import CartSummary from "./_c/CartSummary";
import { Link } from "react-router-dom";

const cartItems = [
  {
    id: 1,
    name: "100 Days of Code: The Complete Python Pro Bootcamp",
    description: "By Khakha khakha",
    price: 4050000,
    quantity: 3,
    image:
      "https://hoidanit.vn/_next/image?url=https%3A%2F%2Fhoidanit.vn%2Fimages%2Fc1d33e4e76fee563c29bd4101ca7651910.png&w=3840&q=75",
  },
  {
    id: 2,
    name: "Automate the Boring Stuff with Python Programming",
    description: "By John Doe",
    price: 378000,
    quantity: 3,
    image:
      "https://hoidanit.vn/_next/image?url=https%3A%2F%2Fhoidanit.vn%2Fimages%2Fc1d33e4e76fee563c29bd4101ca7651910.png&w=3840&q=75",
  },
];

export default function CartPage() {
  const [items, setItems] = useState(cartItems);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleQuantityChange = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item,
      ),
    );
  };

  const handleRemove = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
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
          <div className="bg-body lg:rounded-2xl shadow-lg p-4">
            <div className="flex items-center mb-4 font-medium">
              <Checkbox defaultChecked className="mr-4" />
              Select all ({items.length})
            </div>

            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onChangeQuantity={handleQuantityChange}
                onRemove={handleRemove}
              />
            ))}
          </div>

          <CartSummary total={total} />
        </div>
      </Box>
    </div>
  );
}
