import { Drawer, rem } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { cn } from "../../utils/cn";

const DASHBOARD_SIDEBAR_WIDTH = "256px";
const DASHBOARD_SIDEBAR_WIDTH_COLLAPSED = "70px";

type SidebarLayoutProps = {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  sidebarCollapsed: boolean;
  mobileSidebarOpened: boolean;
  closeMobileSidebar: () => void;
  classNames?: {
    sidebar?: string;
    header?: string;
    main?: string;
  };
};

const SidebarLayout = ({
  sidebar,
  header,
  sidebarCollapsed,
  mobileSidebarOpened,
  closeMobileSidebar,
  classNames,
}: SidebarLayoutProps) => {
  const sidebarWidth = sidebarCollapsed
    ? DASHBOARD_SIDEBAR_WIDTH_COLLAPSED
    : DASHBOARD_SIDEBAR_WIDTH;

  return (
    <div
      className="min-h-dvh bg-body text-gray-800 dark:text-white"
      style={
        {
          "--sidebar-width": rem(sidebarWidth),
        } as React.CSSProperties
      }
    >
      {/* Fixed Sidebar (desktop) */}
      <aside
        className={cn(
          `fixed top-0 left-0 h-full dark:bg-neutral-800 transition-all duration-300 border-r border-gray-200
          dark:border-dark-5 w-(--sidebar-width) z-50 hidden lg:block`,
          classNames?.sidebar,
        )}
      >
        {sidebar}
      </aside>

      {/* Main Content */}
      <div className="h-full transition-all lg:duration-300 bg-body text-gray-900 dark:text-white lg:pl-(--sidebar-width)">
        {/* Drawer Sidebar (mobile) */}
        <Drawer
          opened={mobileSidebarOpened}
          onClose={closeMobileSidebar}
          withCloseButton={false}
          transitionProps={{
            transition: "fade-right",
            duration: 200,
            timingFunction: "ease-out",
          }}
          size={DASHBOARD_SIDEBAR_WIDTH}
          padding={0}
          hiddenFrom="lg"
          zIndex={1000000}
        >
          <aside className="h-full">{sidebar}</aside>
        </Drawer>

        {header}

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
