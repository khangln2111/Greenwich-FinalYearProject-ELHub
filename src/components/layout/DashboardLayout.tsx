import { Drawer, rem } from "@mantine/core";
import { Outlet } from "react-router-dom";

const DASHBOARD_SIDEBAR_WIDTH = "256px";
const DASHBOARD_SIDEBAR_WIDTH_COLLAPSED = "70px";

type DashboardLayoutProps = {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  sidebarCollapsed: boolean;
  mobileSidebarOpened: boolean;
  closeMobileSidebar: () => void;
};

const DashboardLayout = ({
  sidebar,
  header,
  sidebarCollapsed,
  mobileSidebarOpened,
  closeMobileSidebar,
}: DashboardLayoutProps) => {
  const sidebarWidth = sidebarCollapsed
    ? DASHBOARD_SIDEBAR_WIDTH_COLLAPSED
    : DASHBOARD_SIDEBAR_WIDTH;

  return (
    <div
      className="min-h-dvh flex relative bg-body text-gray-800 dark:text-white"
      style={
        {
          "--sidebar-width": `${rem(sidebarWidth)}`,
        } as React.CSSProperties
      }
    >
      {/* Desktop Sidebar */}
      <aside
        className="fixed top-0 left-0 h-full bg-neutral-50 dark:bg-neutral-800 transition-all duration-300 border-r
          border-gray-200 dark:border-dark-5 w-[var(--sidebar-width)] visible-from-lg"
      >
        {sidebar}
      </aside>

      {/* Main Content */}
      <div
        className="flex flex-col flex-1 h-full transition-all lg:duration-300 bg-body text-gray-900 dark:text-white
          lg:ml-[calc(var(--sidebar-width)+1px)]"
      >
        {/* Mobile Sidebar */}
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
          <aside className="h-full transition-all duration-300 ease-in-out flex flex-col w-full">
            {sidebar}
          </aside>
        </Drawer>

        {header}

        <main className="flex flex-col flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
