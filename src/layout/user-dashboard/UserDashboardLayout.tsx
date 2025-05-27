import { Avatar, Collapse } from "@mantine/core";
import {
  IconBell,
  IconDashboard,
  IconLayoutDashboardFilled,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import {
  ChartNoAxesCombinedIcon,
  ChevronDown,
  ChevronUp,
  GiftIcon,
  LogOut,
  MonitorCheckIcon,
  PackageIcon,
  User,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";
import { useAppStore } from "../../zustand/store";
import avatarPlaceHolder from "../../assets/placeholder/profile-avatar-placeholder.svg";
import background from "../../assets/userDashboard/background-info.png";

type MenuItem = {
  label: string;
  icon: ReactNode;
  href: string;
};

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: <IconDashboard className="size-5" />, href: "/dashboard" },
  { label: "My Account", icon: <User className="size-5" />, href: "/dashboard/my-account" },
  {
    label: "Enrolled Courses",
    icon: <MonitorCheckIcon className="size-5" />,
    href: "/dashboard/enrolled-courses",
  },
  {
    label: "Purchase History",
    icon: <PackageIcon className="size-5" />,
    href: "/dashboard/order-history",
  },
  { label: "Gifts", icon: <GiftIcon className="size-5" />, href: "/dashboard/gifts" },
  {
    label: "Notifications",
    icon: <IconBell className="size-5" />,
    href: "/dashboard/notifications",
  },
  {
    label: "Analytics",
    icon: <ChartNoAxesCombinedIcon className="size-5" />,
    href: "/dashboard/analytics",
  },
  {
    label: "Messages",
    icon: <IconMessageCircle className="size-5" />,
    href: "/dashboard/messages",
  },
  { label: "Settings", icon: <IconSettings className="size-5" />, href: "/settings" },
];

export default function UserDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const currentUser = useAppStore.use.currentUser();

  const isActive = (href: string) => location.pathname === href;

  const Sidebar = () => (
    <div className="space-y-4">
      <div
        className="bg-blue text-white rounded-xl p-4 text-center"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <Avatar
          size={100}
          radius="full"
          className="mx-auto shadow-lg dark:border"
          src={currentUser?.avatarUrl || avatarPlaceHolder}
        />
        <p className="mt-2 font-medium">Khang</p>
        <p className="text-xs">lenguyenkhang21112003@gmail.com</p>
      </div>

      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            to={item.href}
            key={item.href}
            className={cn(
              "flex items-center gap-2 px-5 py-3 rounded-lg cursor-pointer text-lg transition",
              isActive(item.href)
                ? "bg-primary-light text-primary-light-color hover:bg-primary-light-hover"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800",
            )}
            onClick={() => {
              navigate(item.href);
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>

      <button className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:underline px-4 py-2 text-sm">
        <LogOut className="size-5" />
        Log out
      </button>
    </div>
  );

  return (
    <div className="bg-gray-100 dark:bg-dark-5 text-gray-900 dark:text-white flex-1">
      <div className="p-6 lg:px-15 py-10 container">
        {/* Mobile toggle */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <IconLayoutDashboardFilled />
            <h2 className="text-2xl font-semibold">User Dashboard</h2>
          </div>
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="p-2 rounded-md border dark:border-gray-700"
          >
            {sidebarOpen ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar (Collapse ở mobile, luôn hiện ở md+) */}
          <div className="w-full lg:basis-[270px]">
            <Collapse in={sidebarOpen || window.innerWidth >= 1024}>
              <div className="bg-body border border-gray-200 dark:border-gray-800 rounded-xl p-3">
                <Sidebar />
              </div>
            </Collapse>
          </div>
          {/* Main Content */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
