import { useState } from "react";
import { OrderCard } from "./_c/OrderCard";
import { OrderHistorySearchbar } from "./_c/OrderHistorySearchbar";
import { OrderHistoryTabs } from "./_c/OrderHistoryTabs";

export type OrderItem = {
  title: string;
  price: number;
  quantity: number;
  thumbnail?: string;
  discountedPrice?: number;
};

export type Order = {
  id: string;
  date: string;
  method: string;
  status: string;
  statusColor: string;
  items: OrderItem[];
};

const mockOrders: Order[] = [
  {
    id: "132E97B7-9543-4E90-A32D-BAAE4A09D705",
    date: "10/04/2025",
    method: "Card payment",
    status: "Success",
    statusColor: "text-green",
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
    id: "132E97B7-1111-4E90-A32D-BAAE4A09D705",
    date: "12/14/2024",
    method: "Card payment",
    status: "Success",
    statusColor: "text-green",
    items: [
      {
        title: "KamiCare Antibacterial Cotton Buds (160 pcs) for kids - dual end",
        price: 32000,
        discountedPrice: 25600,
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

export default function OrderHistoryPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div>
      <div className="flex items-center gap-10 justify-between">
        <h1 className="text-2xl font-bold mb-4 flex-1">My Orders</h1>
        <OrderHistorySearchbar />
      </div>

      <OrderHistoryTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mx-auto">
        {mockOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
