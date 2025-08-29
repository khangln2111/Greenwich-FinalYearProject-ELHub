import { ActionIcon } from "@mantine/core";
import { Home, BookOpen, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/cart", label: "Cart", icon: ShoppingCart },
  { to: "/profile", label: "Profile", icon: User },
];

// Các route chính mà BottomNav được phép hiển thị
const mainRoutes = ["/", "/courses", "/cart", "/profile"];

const BottomNav = () => {
  const location = useLocation();

  // Chỉ render nếu pathname nằm trong mainRoutes
  const shouldShow = mainRoutes.includes(location.pathname);
  if (!shouldShow) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[calc(var(--mantine-z-index-app)+2)] bg-white dark:bg-dark-7 flex
        justify-around py-2 rounded-t-2xl shadow-2xl md:hidden transition-all duration-300"
    >
      {tabs.map(({ to, label, icon: Icon }) => {
        const isActive = location.pathname === to;

        return (
          <Link key={to} to={to} className="flex flex-col items-center flex-1">
            <ActionIcon
              size="lg"
              radius="xl"
              variant={isActive ? "filled" : "subtle"}
              color={isActive ? "primary" : "gray"}
            >
              <Icon size="60%" strokeWidth={1.8} />
            </ActionIcon>
            <span
              className={clsx(
                "text-xs mt-1 font-medium",
                isActive
                  ? "text-primary-6 dark:text-primary-4"
                  : "text-gray-500 dark:text-gray-400",
              )}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
