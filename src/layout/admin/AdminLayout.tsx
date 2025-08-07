import { useAppStore } from "../../zustand/store";
import AdminSidebar from "./_c/AdminSidebar";
import AdminHeader from "./_c/AdminHeader";
import SidebarLayout from "../../components/layout/SidebarLayout";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";

const AdminLayout = () => {
  const sidebarCollapsed = useAppStore.use.desktopAdminSidebarCollapsed();
  const mobileSidebarOpened = useAppStore.use.mobileAdminSidebarOpened();
  const closeMobileSidebar = useAppStore.use.closeMobileAdminSidebar();
  const theme = useMantineTheme();
  const isTabletOrSmaller = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  return (
    <SidebarLayout
      sidebar={<AdminSidebar collapsedToIcon={isTabletOrSmaller ? false : sidebarCollapsed} />}
      header={<AdminHeader />}
      sidebarCollapsed={sidebarCollapsed}
      mobileSidebarOpened={mobileSidebarOpened}
      closeMobileSidebar={closeMobileSidebar}
    />
  );
};

export default AdminLayout;
