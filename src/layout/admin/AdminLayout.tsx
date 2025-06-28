import { useAppStore } from "../../zustand/store";
import AdminSidebar from "./_c/AdminSidebar";
import AdminHeader from "./_c/AdminHeader";
import DashboardLayout from "../../components/layout/DashboardLayout";

const AdminLayout = () => {
  const sidebarCollapsed = useAppStore.use.desktopAdminSidebarCollapsed();
  const mobileSidebarOpened = useAppStore.use.mobileAdminSidebarOpened();
  const closeMobileSidebar = useAppStore.use.closeMobileAdminSidebar();

  return (
    <DashboardLayout
      sidebar={<AdminSidebar collapsedToIcon={sidebarCollapsed} />}
      header={<AdminHeader />}
      sidebarCollapsed={sidebarCollapsed}
      mobileSidebarOpened={mobileSidebarOpened}
      closeMobileSidebar={closeMobileSidebar}
    />
  );
};

export default AdminLayout;
