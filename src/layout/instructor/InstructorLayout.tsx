import { Drawer, rem } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { useAppStore } from "../../zustand/store";
import InstructorHeader from "./_c/InstructorHeader";
import InstructorSidebar from "./_c/InstructorSideBar";

const INSTRUCTOR_SIDEBAR_WIDTH = "256px";
const INSTRUCTOR_SIDEBAR_WIDTH_COLLAPSED_TO_ICONS = "70px";

const InstructorLayout = () => {
  const desktopSidebarCollapsed = useAppStore.use.desktopInstructorSidebarCollapsed();
  const sidebarWidth = desktopSidebarCollapsed
    ? INSTRUCTOR_SIDEBAR_WIDTH_COLLAPSED_TO_ICONS
    : INSTRUCTOR_SIDEBAR_WIDTH;
  const mobileInstructorSidebarOpened = useAppStore.use.mobileInstructorSidebarOpened();
  const closeMobileInstructorSidebar = useAppStore.use.closeMobileInstructorSidebar();

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
        className="fixed top-0 left-0 h-full bg-neutral-50 dark:bg-neutral-800 transition-all duration-300 ease-in-out
          border-r border-gray-200 dark:border-dark-5 w-(--sidebar-width) visible-from-lg"
      >
        <InstructorSidebar collapsedToIcon={desktopSidebarCollapsed} />
      </aside>

      {/* Content */}
      <div
        className="flex flex-col flex-1 h-full transition-all lg:duration-300 bg-body text-gray-900 dark:text-white
          lg:ml-[calc(var(--sidebar-width)+1px)]"
      >
        {/* mobile sidebar */}
        <Drawer
          opened={mobileInstructorSidebarOpened}
          onClose={closeMobileInstructorSidebar}
          withCloseButton={false}
          transitionProps={{
            transition: "fade-right",
            duration: 200,
            timingFunction: "ease-out",
          }}
          size={INSTRUCTOR_SIDEBAR_WIDTH}
          padding={0}
          hiddenFrom="lg"
          zIndex={1000000}
        >
          <aside className="h-full transition-all duration-300 ease-in-out flex flex-col w-full">
            <InstructorSidebar />
          </aside>
        </Drawer>
        <InstructorHeader />
        <main className="flex flex-col flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default InstructorLayout;
