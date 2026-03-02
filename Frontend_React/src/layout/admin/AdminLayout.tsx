import { useAppStore } from "../../zustand/stores/appStore";
import AdminSidebar from "./_c/AdminSidebar";
import AdminHeader from "./_c/AdminHeader";
import SidebarLayout from "../../components/layout/SidebarLayout";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";

export default function AdminLayout() {
  const sidebarCollapsed = useAppStore((s) => s.desktopAdminSidebarCollapsed);
  const mobileSidebarOpened = useAppStore((s) => s.mobileAdminSidebarOpened);
  const closeMobileSidebar = useAppStore((s) => s.closeMobileAdminSidebar);
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
}
