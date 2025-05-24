import {
  LogOut,
  MapPin,
  Menu,
  Package,
  Syringe,
  Truck,
  User,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Collapse } from "@mantine/core";
import { ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";

type MenuItem = {
  label: string;
  icon: ReactNode;
  href: string;
};

const menuItems: MenuItem[] = [
  { label: "Thông tin cá nhân", icon: <User className="w-5 h-5" />, href: "/user/profile" },
  { label: "Đơn hàng của tôi", icon: <Package className="w-5 h-5" />, href: "/user/orders" },
  { label: "Quản lý sổ địa chỉ", icon: <MapPin className="w-5 h-5" />, href: "/user/addresses" },
  {
    label: "Lịch hẹn tiêm chủng",
    icon: <Syringe className="w-5 h-5" />,
    href: "/user/vaccine-appointments",
  },
  {
    label: "Đơn hàng tiêm chủng",
    icon: <Truck className="w-5 h-5" />,
    href: "/user/vaccine-orders",
  },
  { label: "Đơn thuốc của tôi", icon: <Truck className="w-5 h-5" />, href: "/user/prescriptions" },
];

export default function UserDashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (href: string) => location.pathname === href;

  const Sidebar = () => (
    <div className="space-y-4">
      <div className="bg-blue-600 text-white rounded-xl p-4 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center">
          <User className="w-8 h-8" />
        </div>
        <p className="mt-2 font-medium">Khang</p>
        <p className="text-sm">0931296160</p>
      </div>

      <ul className="space-y-1">
        {menuItems.map((item) => (
          <li
            key={item.href}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer text-sm transition",
              isActive(item.href)
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800",
            )}
            onClick={() => {
              navigate(item.href);
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
          >
            {item.icon}
            {item.label}
          </li>
        ))}
      </ul>

      <button className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:underline px-4 py-2 text-sm">
        <LogOut className="w-5 h-5" />
        Đăng xuất
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-6 lg:px-20 py-6">
      {/* Mobile toggle */}
      <div className="lg:hidden flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Trang cá nhân</h2>
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="p-2 rounded-md border dark:border-gray-700"
        >
          {sidebarOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar (Collapse ở mobile, luôn hiện ở md+) */}
        <div className="w-full lg:max-w-[300px]">
          <Collapse in={sidebarOpen || window.innerWidth >= 1024}>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-4">
              <Sidebar />
            </div>
          </Collapse>
        </div>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
