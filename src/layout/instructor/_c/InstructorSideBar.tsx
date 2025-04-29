// components/instructor/_c/InstructorSidebar.tsx
import { MantineLogo } from "@mantinex/mantine-logo";
import { IconBellRinging, IconFingerprint, IconReceipt2 } from "@tabler/icons-react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../../utils/cn";
import { useAppStore } from "../../../zustand/store";

const navItems = [
  { href: "/instructor", label: "Notifications", icon: IconBellRinging },
  { href: "", label: "Billing", icon: IconReceipt2 },
  { href: "", label: "Security", icon: IconFingerprint },
];

const InstructorSidebar = ({ inDrawer = false }: { inDrawer?: boolean }) => {
  const sidebarCollapsed = useAppStore.use.sidebarCollapsed();
  const toggleSidebar = useAppStore.use.toggleSidebar();
  const location = useLocation();

  return (
    <aside
      className={cn("h-full flex flex-col border-r border-gray-200 dark:border-dark-5 bg-body", {
        "w-full": inDrawer,
        "w-[256px]": !sidebarCollapsed && !inDrawer,
        "w-[70px]": sidebarCollapsed && !inDrawer,
      })}
    >
      <div
        className={cn("flex items-center p-4", {
          "justify-center": sidebarCollapsed,
        })}
      >
        <Link
          to="/instructor"
          className="no-underline select-none flex items-center text-black dark:text-white"
        >
          {sidebarCollapsed ? (
            <MantineLogo color="primary" size={30} type="mark" />
          ) : (
            <MantineLogo color="primary" size={30} className="visible-from-md" />
          )}
        </Link>
      </div>

      <nav className="flex-1 p-2 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              data-active={isActive || undefined}
              className={cn(
                `flex items-center gap-3 text-sm font-medium rounded-md px-3 py-2 transition-all group justify-start
                text-gray-7 dark:text-dark-1 hover:bg-gray-1 dark:hover:bg-dark-6 hover:text-text
                data-active:bg-primary-light data-active:text-primary-light-color data-active:font-bold
                data-active:border-e-3 data-active:border-e-primary data-active:rounded-e-none`,
                {
                  "justify-center aspect-square": sidebarCollapsed,
                },
              )}
            >
              <item.icon
                stroke={1.5}
                className={cn(
                  `size-[25px] shrink-0 text-gray-6 dark:text-dark-2 group-hover:text-text
                  group-data-active:text-primary-light-color`,
                )}
              />
              {!sidebarCollapsed && (
                <p className="origin-left starting:opacity-0 starting:-translate-x-full transition-all">
                  {item.label}
                </p>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default InstructorSidebar;
