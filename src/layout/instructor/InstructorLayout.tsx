import { rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import { IconBellRinging, IconFingerprint, IconReceipt2 } from "@tabler/icons-react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { useAppStore } from "../../zustand/store";
import InstructorHeader from "./_c/InstructorHeader";

const InstructorLayout = () => {
  const sidebarCollapsed = useAppStore.use.sidebarCollapsed();
  const location = useLocation();

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const sidebarWidth = isDesktop ? (sidebarCollapsed ? 70 : 256) : 0;

  const navItems = [
    { href: "/instructor", label: "Notifications", icon: IconBellRinging },
    { href: "", label: "Billing", icon: IconReceipt2 },
    { href: "", label: "Security", icon: IconFingerprint },
  ];

  return (
    <div className="h-screen flex relative bg-body text-gray-800 dark:text-white">
      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 h-full bg-body transition-all duration-300 ease-in-out flex flex-col border-r
          border-gray-200 dark:border-dark-5 visible-from-lg"
        style={{ width: `${rem(sidebarWidth)}` }}
      >
        {/* Sidebar Header */}
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

        {/* Sidebar Body */}
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

        <div className="p-4">
          <button
            className="w-full flex items-center justify-center p-2 bg-white dark:bg-dark-6 text-primary-6 rounded
              hover:bg-gray-100 dark:hover:bg-dark-5 transition"
          >
            {sidebarCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
          </button>
        </div>
      </aside>

      {/* Content */}
      <div
        className="flex flex-col flex-1 h-full transition-all duration-300 bg-body text-gray-900 dark:text-white"
        style={{ marginLeft: `${rem(sidebarWidth)}` }}
      >
        <InstructorHeader />
        <main className="flex-1 overflow-y-auto bg-body">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstructorLayout;
