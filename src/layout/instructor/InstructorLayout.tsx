import { rem } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { useAppStore } from "../../zustand/store";
import InstructorHeader from "./_c/InstructorHeader";
import InstructorSidebar from "./_c/InstructorSideBar";

const InstructorLayout = () => {
  const desktopSidebarCollapsed = useAppStore.use.desktopSidebarCollapsed();
  const sidebarWidth = desktopSidebarCollapsed ? 70 : 256; //px

  return (
    <div
      className="h-screen flex relative bg-body text-gray-800 dark:text-white"
      style={
        {
          "--sidebar-width": `${rem(sidebarWidth)}`,
        } as React.CSSProperties
      }
    >
      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 h-full bg-body transition-all duration-300 ease-in-out border-r border-gray-200
          dark:border-dark-5 w-(--sidebar-width) visible-from-lg"
      >
        <InstructorSidebar collapsedToIcon={desktopSidebarCollapsed} />
      </aside>

      {/* Content */}
      <div
        className="flex flex-col flex-1 h-full transition-all lg:duration-300 bg-body text-gray-900 dark:text-white
          lg:ml-(--sidebar-width)"
      >
        <InstructorHeader />
        <main className="flex-1 overflow-y-auto bg-body">
          <div className="p-lg">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstructorLayout;
