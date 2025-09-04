import { Avatar, Collapse } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconBell, IconLayoutDashboardFilled, IconSettings } from "@tabler/icons-react";
import {
  ChartNoAxesCombinedIcon,
  ChevronDown,
  ChevronUp,
  GiftIcon,
  HistoryIcon,
  LogOut,
  MonitorCheckIcon,
  PackageIcon,
  User,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import avatarPlaceholder from "../../assets/placeholder/profile-avatar-placeholder.svg";
import background from "../../assets/userDashboard/background-info.png";
import { cn } from "../../utils/cn";
import { useAppStore } from "../../zustand/stores/appStore";

type MenuItem = {
  label: string;
  icon: ReactNode;
  href: string;
};

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: <ChartNoAxesCombinedIcon className="size-5" />, href: "/dashboard" },
  { label: "My account", icon: <User className="size-5" />, href: "/dashboard/my-account" },
  {
    label: "Enrolled courses",
    icon: <MonitorCheckIcon className="size-5" />,
    href: "/dashboard/enrolled-courses",
  },
  {
    label: "Order history",
    icon: <HistoryIcon className="size-5" />,
    href: "/dashboard/order-history",
  },
  {
    label: "Inventory",
    icon: <PackageIcon className="size-5" />,
    href: "/dashboard/inventory",
  },

  { label: "Gifts", icon: <GiftIcon className="size-5" />, href: "/dashboard/gifts" },
  {
    label: "Notifications",
    icon: <IconBell className="size-5" />,
    href: "/dashboard/notifications",
  },
  { label: "Settings", icon: <IconSettings className="size-5" />, href: "/settings" },
];

export default function UserDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useAppStore((s) => s.currentUser);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const isActive = (href: string) => location.pathname === href;

  const Sidebar = () => (
    <div className="space-y-4">
      <div
        className="bg-primary text-white rounded-xl p-4 text-center"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <Avatar
          size={100}
          radius="full"
          className="mx-auto shadow-lg"
          src={currentUser?.avatarUrl || avatarPlaceholder}
        />
        <p className="mt-2 font-medium">
          {currentUser?.firstName} {currentUser?.lastName}
        </p>
        <p className="text-xs">{currentUser?.email}</p>
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
              if (!isDesktop) setSidebarOpen(false);
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
    <div className="bg-gray-200 dark:bg-dark-5 text-gray-900 dark:text-white flex-1">
      <div className="p-4 md:p-6 xl:px-15 py-10 container">
        {/* Mobile toggle */}
        <div className="lg:hidden hidden justify-between items-center mb-4">
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

        <div
          className={cn("flex flex-col lg:flex-row gap-7", {
            "gap-0": !sidebarOpen && !isDesktop,
          })}
        >
          {/* Sidebar */}
          <div className="w-full lg:max-w-[250px] xl:max-w-[300px] min-w-0">
            <Collapse in={!!(sidebarOpen || isDesktop)}>
              <div className="bg-body border border-gray-200 dark:border-gray-800 rounded-xl p-3">
                <Sidebar />
              </div>
            </Collapse>
          </div>
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
