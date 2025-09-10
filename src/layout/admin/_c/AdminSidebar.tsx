import { Avatar, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconMessageUser } from "@tabler/icons-react";
import {
  BellRingIcon,
  BookOpenCheckIcon,
  ChartNoAxesCombinedIcon,
  SettingsIcon,
  TagsIcon,
  Users2Icon,
} from "lucide-react";
import { Link } from "react-router-dom";
import BrandLogo from "../../../components/BrandLogo/BrandLogo";
import SidebarNavLink from "../../../components/layout/SidebarNavLink/SidebarNavLink";
import { useGetCurrentUserInfo } from "../../../features/auth/identity.hooks";
import { cn } from "../../../utils/cn";
import { useAppStore } from "../../../zustand/stores/appStore";

type AdminSidebarProps = {
  collapsedToIcon?: boolean;
};

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  subLinks?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: ChartNoAxesCombinedIcon,
  },
  {
    href: "/admin/categories",
    label: "Category management",
    icon: TagsIcon,
  },
  {
    href: "/admin/courses",
    label: "Course management",
    icon: BookOpenCheckIcon,
    subLinks: [
      { label: "All Courses", href: "/admin/courses" },
      { label: "Pending Approval", href: "/admin/courses/pending" },
    ],
  },
  {
    href: "/admin/instructor-applications",
    label: "Instructor applications",
    icon: IconMessageUser,
  },
  {
    href: "/admin/users",
    label: "User management",
    icon: Users2Icon,
  },
  {
    href: "/admin/notifications",
    label: "Notifications",
    icon: BellRingIcon,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: SettingsIcon,
  },
];

const AdminSidebar = ({ collapsedToIcon }: AdminSidebarProps) => {
  const closeMobileSidebar = useAppStore((s) => s.closeMobileAdminSidebar);
  const { data: currentUser } = useGetCurrentUserInfo();
  const isMobile = useMediaQuery("max-width: 1023px");
  return (
    <div className="flex flex-col h-full min-h-screen">
      {/* Header */}
      <div
        className={cn("flex items-center justify-between p-4", {
          "justify-center": collapsedToIcon,
        })}
      >
        <Link to="/admin/dashboard">
          <BrandLogo variant={collapsedToIcon ? "mark" : "full"} />
        </Link>
      </div>

      <Text
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
        className={cn(
          "px-4 starting:opacity-0 starting:-translate-x-full transition-all duration-600 ease-in-out",
          {
            hidden: collapsedToIcon,
          },
        )}
      >
        Admin site
      </Text>
      {/* Body */}
      <nav className="flex-1 p-2 flex flex-col gap-2">
        {navItems.map((item) => (
          <SidebarNavLink
            key={item.label}
            href={item.href}
            label={item.label}
            icon={item.icon}
            collapsedToIcon={collapsedToIcon && !isMobile}
            subLinks={item.subLinks}
            onClick={closeMobileSidebar}
          />
        ))}
      </nav>

      {/* Footer - Current User */}
      {currentUser && (
        <div
          className={cn(
            "border-t border-gray-200 dark:border-gray-800 p-3 flex items-center gap-3 mt-auto",
          )}
        >
          <Avatar src={currentUser.avatarUrl} alt={currentUser.firstName} radius="xl" size={40}>
            {currentUser.firstName?.[0] ?? currentUser.email[0]}
          </Avatar>

          {!collapsedToIcon && (
            <div className="flex flex-col truncate">
              <Text size="sm" fw={600} truncate>
                {currentUser.firstName} {currentUser.lastName}
              </Text>
              <Text size="xs" c="dimmed" truncate>
                {currentUser.email}
              </Text>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
