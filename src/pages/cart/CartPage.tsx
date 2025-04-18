import { useState } from "react";
import { ArrowLeft, MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import { ActionIcon, Anchor, Button, Checkbox, Text } from "@mantine/core";

const cartItems = [
  {
    id: 1,
    name: "100 Days of Code: The Complete Python Pro Bootcamp",
    description: "By Khakha khakha",
    price: 4050000,
    quantity: 3,
    unit: "Hộp",
    image:
      "https://hoidanit.vn/_next/image?url=https%3A%2F%2Fhoidanit.vn%2Fimages%2Fc1d33e4e76fee563c29bd4101ca7651910.png&w=3840&q=75",
  },
  {
    id: 2,
    name: "Automate the Boring Stuff with Python Programming",
    description: "By John Doe",
    price: 378000,
    quantity: 3,
    unit: "Tuýp",
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
    <div className="flex-1 px-3 md:px-20 py-[30px] bg-[#EDF0F3] dark:bg-dark-5">
      <Anchor className="text-xl font-semibold mb-4 flex items-center">
        <ArrowLeft className="inline-block mr-2" /> Continue to shopping
      </Anchor>
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* left part */}
        <div className="bg-body rounded-2xl shadow-lg p-4 flex-1">
          <div className="flex items-center mb-4 font-medium">
            <Checkbox defaultChecked className="mr-4" />
            Select all ({items.length})
          </div>
          {items.map((item) => (
            <div key={item.id} className="flex items-start border-t py-4 gap-4">
              <div className="flex gap-5 items-center">
                <Checkbox defaultChecked />
                <img
                  src={item.image}
                  alt={item.name}
                  className="size-20 object-cover rounded-md border"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between gap-3">
                <p className="font-medium leading-tight">{item.name}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
                <div className="flex items-center justify-between">
                  <Text className="text-blue-600 font-semibold leading-none">
                    ${item.price.toLocaleString()}
                  </Text>
                  <div className="flex items-center md:hidden">
                    <ActionIcon
                      variant="outline"
                      size="xs"
                      className="rounded-full"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      <MinusIcon />
                    </ActionIcon>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <ActionIcon
                      variant="outline"
                      size="xs"
                      className="rounded-full"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      <PlusIcon />
                    </ActionIcon>
                  </div>
                </div>
              </div>
              <div className="items-center gap-2 hidden md:flex self-center">
                <ActionIcon
                  variant="outline"
                  size="md"
                  className="rounded-full"
                  onClick={() => handleQuantityChange(item.id, -1)}
                >
                  <MinusIcon />
                </ActionIcon>
                <span className="w-6 text-center">{item.quantity}</span>
                <ActionIcon
                  variant="outline"
                  size="md"
                  className="rounded-full"
                  onClick={() => handleQuantityChange(item.id, 1)}
                >
                  <PlusIcon />
                </ActionIcon>
                <Trash2
                  className="text-dimmed cursor-pointer"
                  onClick={() => handleRemove(item.id)}
                  size={20}
                />
              </div>
            </div>
          ))}
        </div>
        {/* right part */}
        <div className="bg-body rounded-2xl shadow p-4 w-full lg:w-[360px]">
          {/* <div
            className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200 p-3 rounded-xl text-sm font-medium
              cursor-pointer"
          >
            Áp dụng ưu đãi để được giảm giá
          </div> */}
          <Button variant="light" autoContrast size="md" className="rounded-xl text-start w-full">
            Áp dụng ưu đãi để được giảm giá
          </Button>
          <div className="mt-4 space-y-2 text-lg">
            <div className="flex justify-between">
              <span>Tổng tiền</span>
              <span className="font-semibold">{total.toLocaleString()}₫</span>
            </div>
            <div className="flex justify-between">
              <span>Giảm giá trực tiếp</span>
              <span className="text-orange-500">0₫</span>
            </div>
            <div className="flex justify-between">
              <span>Giảm giá voucher</span>
              <span className="text-orange-500">0₫</span>
            </div>
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between items-center text-lg font-semibold">
            <span>Thành tiền</span>
            <span className="text-primary">{total.toLocaleString()}₫</span>
          </div>
          <Button
            size="lg"
            className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-800 dark:bg-blue-700 rounded-full"
          >
            Mua hàng
          </Button>
          <p className="text-xs text-center mt-3 text-gray-500">
            Bằng việc tiến hành đặt mua hàng, bạn đồng ý với <br />
            <span className="underline">Điều khoản dịch vụ</span> và{" "}
            <span className="underline">Chính sách xử lý dữ liệu cá nhân</span>
            <br /> của Nhà thuốc FPT Long Châu
          </p>
        </div>
      </div>
    </div>
  );
}
