import { useAppStore } from "../../zustand/stores/appStore";
import InstructorHeader from "./_c/InstructorHeader";
import SidebarLayout from "../../components/layout/SidebarLayout";
import InstructorSidebar from "./_c/InstructorSidebar";

const InstructorLayout = () => {
  const sidebarCollapsed = useAppStore((s) => s.desktopInstructorSidebarCollapsed);
  const mobileSidebarOpened = useAppStore((s) => s.mobileInstructorSidebarOpened);
  const closeMobileSidebar = useAppStore((s) => s.closeMobileInstructorSidebar);

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
