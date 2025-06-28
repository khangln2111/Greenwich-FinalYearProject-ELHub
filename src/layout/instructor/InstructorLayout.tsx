import { useAppStore } from "../../zustand/store";
import InstructorHeader from "./_c/InstructorHeader";
import DashboardLayout from "../../components/layout/DashboardLayout";
import InstructorSidebar from "./_c/InstructorSideBar";

const InstructorLayout = () => {
  const sidebarCollapsed = useAppStore.use.desktopInstructorSidebarCollapsed();
  const mobileSidebarOpened = useAppStore.use.mobileInstructorSidebarOpened();
  const closeMobileSidebar = useAppStore.use.closeMobileInstructorSidebar();

  return (
    <DashboardLayout
      sidebar={<InstructorSidebar collapsedToIcon={sidebarCollapsed} />}
      header={<InstructorHeader />}
      sidebarCollapsed={sidebarCollapsed}
      mobileSidebarOpened={mobileSidebarOpened}
      closeMobileSidebar={closeMobileSidebar}
    />
  );
};

export default InstructorLayout;
