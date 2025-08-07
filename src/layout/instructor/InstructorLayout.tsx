import { useAppStore } from "../../zustand/store";
import InstructorHeader from "./_c/InstructorHeader";
import SidebarLayout from "../../components/layout/SidebarLayout";
import InstructorSidebar from "./_c/InstructorSidebar";

const InstructorLayout = () => {
  const sidebarCollapsed = useAppStore.use.desktopInstructorSidebarCollapsed();
  const mobileSidebarOpened = useAppStore.use.mobileInstructorSidebarOpened();
  const closeMobileSidebar = useAppStore.use.closeMobileInstructorSidebar();

  return (
    <SidebarLayout
      sidebar={<InstructorSidebar collapsedToIcon={sidebarCollapsed} />}
      header={<InstructorHeader />}
      sidebarCollapsed={sidebarCollapsed}
      mobileSidebarOpened={mobileSidebarOpened}
      closeMobileSidebar={closeMobileSidebar}
    />
  );
};

export default InstructorLayout;
