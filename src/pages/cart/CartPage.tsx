import { ActionIcon, Anchor, Box, Button, Checkbox, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { ArrowLeft, Minus, MinusIcon, Plus, PlusIcon, Trash2 } from "lucide-react";
import { useState } from "react";

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
        <Anchor className="text-xl font-semibold mb-4 flex items-center ml-5 lg:ml-0">
          <ArrowLeft className="inline-block mr-2" /> Continue to shopping
        </Anchor>
        <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] items-start gap-6">
          {/* left part */}
          <div className="bg-body lg:rounded-2xl shadow-lg p-4">
            <div className="flex items-center mb-4 font-medium">
              <Checkbox defaultChecked className="mr-4" />
              Select all ({items.length})
            </div>
            {items.map((item) => (
              <div key={item.id} className="flex items-start border-t py-4 gap-4">
                {/* image of cart item */}
                <div className="flex gap-5 items-center">
                  <Checkbox defaultChecked />
                  <img
                    src={item.image}
                    alt={item.name}
                    className="size-20 object-cover rounded-md border"
                  />
                </div>
                {/* content of cart item */}
                <div className="flex-1 flex flex-col gap-2 lg:flex-row lg:gap-4 lg:self-stretch justify-between">
                  {/* information */}
                  <div className="flex lg:block items-center">
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-end justify-between">
                        <p className="font-medium">{item.name}</p>
                        {/* delete icon on mobile */}
                        <Trash2
                          className="text-dimmed cursor-pointer lg:hidden"
                          onClick={() => handleRemove(item.id)}
                          size={20}
                        />
                      </div>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  {/* price - controls - delete */}
                  <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-6 lg:self-center">
                    <div className="flex flex-row items-baseline gap-3 lg:gap-1 lg:flex-col lg:items-end lg:self-center">
                      <Text className="text-blue-500 font-semibold">
                        ${item.price.toLocaleString("en-US")}
                      </Text>
                      {/* Discount price */}
                      <Text className="text-sm text-dimmed font-semibold line-through">
                        ${item.price.toLocaleString("en-US")}
                      </Text>
                    </div>
                    <div
                      className="inline-flex items-center border rounded-md overflow-hidden divide-x divide-gray-200
                        dark:divide-gray-700 h-8 lg:self-center"
                    >
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="w-8 h-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100
                          dark:hover:bg-gray-800"
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, Number(e.target.value) - item.quantity)
                        }
                        className="w-8 h-full flex items-center text-center justify-center font-semibold text-gray-800
                          dark:text-gray-100"
                      />
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="w-8 h-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100
                          dark:hover:bg-gray-800"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <Trash2
                      className="text-dimmed cursor-pointer hidden lg:block self-center"
                      onClick={() => handleRemove(item.id)}
                      size={20}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* right part */}
          <div className="bg-body lg:rounded-2xl shadow p-4">
            {/* <div
              className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200 p-3 rounded-xl text-sm font-medium
                cursor-pointer"
            >
              Áp dụng ưu đãi để được giảm giá
            </div> */}
            <Button variant="light" autoContrast size="md" className="rounded-xl text-start w-full">
              Apply voucher to get discount
            </Button>
            <div className="mt-4 space-y-2 text-lg">
              <div className="flex justify-between">
                <span>Provisional</span>
                <span className="font-semibold">${total.toLocaleString("en-US")}</span>
              </div>
              <div className="flex justify-between">
                <span>Direct discount</span>
                <span className="text-orange-500">$0</span>
              </div>
              <div className="flex justify-between">
                <span>Voucher discount</span>
                <span className="text-orange-500">$0</span>
              </div>
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between items-center text-lg font-semibold">
              <span>Total Amount</span>
              <span className="text-primary">${total.toLocaleString("en-US")}</span>
            </div>
            <Button
              size="lg"
              className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-800 dark:bg-blue-700 rounded-full"
              rightSection={<IconArrowRight className="ml-2" />}
            >
              Proceed to checkout
            </Button>
            <p className="text-xs text-center mt-3 text-gray-500">
              By proceeding with your purchase, you agree to the <br />
              <span className="underline">Terms of Service</span> and{" "}
              <span className="underline">Privacy Policy</span>
              <br /> of ElearningHub.
            </p>
          </div>
        </div>
      </Box>
    </div>
  );
}
