// PurchaseHistoryPage.tsx
import { ChevronRight, SearchIcon } from "lucide-react";
import { useState } from "react";

type OrderItem = {
  title: string;
  price: number;
  quantity: number;
  thumbnail?: string;
  discountPrice?: number;
};

type Order = {
  id: string;
  date: string;
  method: string;
  status: string;
  statusColor: string;
  items: OrderItem[];
};

const mockOrders: Order[] = [
  {
    id: "2020640",
    date: "10/04/2025",
    method: "Card payment",
    status: "Delivered",
    statusColor: "text-green-600",
    items: [
      {
        title: "GLUMEFORM 1000 XR DHG 3X10",
        price: 2200,
        quantity: 2,
        thumbnail:
          "https://cdn.nhathuoclongchau.com.vn/unsafe/50x50/https://cms-prod.s3-sgn09.fptcloud.com/00503114_tam_bong_tre_em_kamicare_hop_tron_160_que_1_dau_xoan_1_dau_thuong_1958_642c_large_f9db5145e5.jpg",
      },
      {
        title: "Another Product",
        price: 2900,
        quantity: 1,
      },
    ],
  },
  {
    id: "1008724",
    date: "12/14/2024",
    method: "Card payment",
    status: "Delivered",
    statusColor: "text-green-600",
    items: [
      {
        title: "KamiCare Antibacterial Cotton Buds (160 pcs) for kids - dual end",
        price: 25600,
        discountPrice: 32000,
        quantity: 1,
        thumbnail:
          "https://cdn.nhathuoclongchau.com.vn/unsafe/50x50/https://cms-prod.s3-sgn09.fptcloud.com/DSC_00198_f2f6e60ea0.jpg",
      },
      {
        title: "Another product",
        price: 8000,
        quantity: 1,
      },
    ],
  },
];

export default function PurchaseHistoryPage() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Pending", "Success", "Canceled", "Refunded"];

  return (
    <div>
      <div className="flex items-center gap-10 justify-between">
        <h1 className="text-2xl font-bold mb-4 flex-1">My Orders</h1>
        <div className="relative mb-4 flex-1">
          <input
            type="text"
            placeholder="Search by name, order ID or product..."
            className="w-full border rounded-full py-2 px-4 pl-10 shadow-sm focus:ring-2 focus:ring-blue-500
              focus:outline-none"
          />
          <SearchIcon className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
      </div>
      <div className="mx-auto">
        {/* Search */}

        {/* Tabs */}
        <div className="flex gap-x-4 overflow-x-auto mb-4 bg-body rounded-t-xl">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-3 font-medium flex-1 ${
              activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500" }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders */}
        {mockOrders.map((order) => (
          <div key={order.id} className="bg-body rounded-lg mb-6">
            <div
              className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-zinc-800 text-sm
                text-gray-600 dark:text-gray-300"
            >
              <div className="space-x-2">
                <span className="font-bold text-md">Order {order.date}</span>
                <span className="text-gray-400">|</span>
                <span>{order.method}</span>
                <span className="text-gray-400">|</span>
                <span className="text-dimmed font-semibold">#{order.id}</span>
              </div>
              <span className={`font-semibold ${order.statusColor}`}>{order.status}</span>
            </div>

            {/* First Product Preview */}
            <div className="flex items-center p-4 gap-4">
              <div className="size-16 flex items-center justify-center border rounded-lg">
                <img
                  src={order.items[0].thumbnail}
                  alt={order.items[0].title}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{order.items[0].title}</p>
                {order.items.length > 1 && (
                  <p className="text-sm text-gray-500 dark:text-dark-2">
                    +{order.items.length - 1} more item
                  </p>
                )}
                <div className="text-sm text-blue-600 mt-1 inline-flex items-center cursor-pointer hover:underline">
                  View details
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>

              <div className="text-right text-sm">
                <p>
                  <span className="text-gray-700">{order.items[0].price.toLocaleString()}₫</span>
                  {order.items[0].discountPrice && (
                    <span className="line-through text-gray-400 ml-1 text-xs">
                      {order.items[0].discountPrice.toLocaleString()}₫
                    </span>
                  )}
                </p>
                <p className="text-gray-500">
                  x{order.items[0].quantity}{" "}
                  {order.items[0].title.includes("Buds") ? "Box" : "Pack"}
                </p>
              </div>
            </div>

            {/* Bottom total + action */}
            <div className="flex justify-between items-center px-4 pb-4 text-sm">
              <p>
                Total:{" "}
                <span className="text-blue-600 font-semibold">
                  {order.items
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toLocaleString()}
                  ₫
                </span>
              </p>
              <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-700 transition">
                Buy Again
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
