import { BookOpen, Home, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../../utils/cn";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard/enrolled-courses", label: "Learning", icon: BookOpen },
  { to: "/dashboard/my-account", label: "Profile", icon: User },
];

const mainRoutes = ["/courses"];

const BottomNav = () => {
  const location = useLocation();
  const shouldHide = mainRoutes.includes(location.pathname);
  if (shouldHide) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[calc(var(--mantine-z-index-app)+2)] bg-white dark:bg-dark-7
        border-t border-gray-200 dark:border-dark-5 grid md:hidden px-8 rounded-t-2xl
        shadow-[0_-2px_8px_rgba(0,0,0,0.08)]"
      style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}
    >
      {tabs.map(({ to, label, icon: Icon }) => {
        const isActive = location.pathname === to;

        return (
          <Link key={to} to={to} className="flex flex-col items-center justify-center py-2">
            <Icon
              size={23}
              strokeWidth={2}
              className={cn("transition-all duration-300", {
                "text-primary-6 dark:text-primary-4": isActive,
                "text-gray-400 dark:text-gray-400": !isActive,
              })}
            />
            <span
              className={cn("text-[11px] font-medium mt-0.5 transition-all duration-300", {
                "text-primary-6 dark:text-primary-4": isActive,
                "text-gray-400 dark:text-gray-400": !isActive,
              })}
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
