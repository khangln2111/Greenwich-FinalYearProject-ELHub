import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@mantine/core";

const cartItems = [
  {
    id: 1,
    name: "Máy xông khí dung nén khí Yuwell 403M",
    description: "chuyển thuốc dạng dung dịch thành sương mù cho niêm mạc hô hấp",
    price: 4050000,
    quantity: 3,
    unit: "Hộp",
    image: "/images/may-xong.jpg",
  },
  {
    id: 2,
    name: "Viên sủi Kudos Vitamin C 1000mg",
    description: "hương chanh giúp bổ sung vitamin C cho cơ thể (20 viên)",
    price: 378000,
    quantity: 3,
    unit: "Tuýp",
    image: "/images/kudos-vitamin.jpg",
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
    <div className="bg-gray-50 min-h-screen p-6">
      <h2 className="text-xl font-semibold mb-4">Tiếp tục mua sắm</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="bg-white rounded-2xl shadow p-4 flex-1">
          <div className="flex items-center mb-4 font-medium">
            <input type="checkbox" checked readOnly className="mr-2" />
            Chọn tất cả ({items.length})
          </div>
          {items.map((item) => (
            <div key={item.id} className="flex border-t py-4 gap-4 items-center">
              <input type="checkbox" checked readOnly />
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="text-blue-600 font-semibold mt-1">{item.price.toLocaleString()}₫</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="xs"
                  className="rounded-full"
                  onClick={() => handleQuantityChange(item.id, -1)}
                >
                  -
                </Button>
                <span className="w-6 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="xs"
                  className="rounded-full"
                  onClick={() => handleQuantityChange(item.id, 1)}
                >
                  +
                </Button>
              </div>

              <Trash2
                className="ml-4 text-gray-500 cursor-pointer"
                onClick={() => handleRemove(item.id)}
              />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl shadow p-4 w-full lg:w-[360px]">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-xl text-sm font-medium cursor-pointer">
            Áp dụng ưu đãi để được giảm giá
          </div>
          <div className="mt-4 space-y-2 text-md">
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
            <span className="text-blue-600">{total.toLocaleString()}₫</span>
          </div>
          <Button className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700">Mua hàng</Button>
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
