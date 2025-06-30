import { Text } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { IconMessageUser } from "@tabler/icons-react";
import {
  BellRingIcon,
  BookOpenCheckIcon,
  ChartNoAxesCombinedIcon,
  FlagTriangleRightIcon,
  PackageIcon,
  SettingsIcon,
  TagsIcon,
  Users2Icon,
} from "lucide-react";
import { Link } from "react-router-dom";
import SidebarNavLink from "../../../components/layout/SidebarNavLink/SidebarNavLink";
import { cn } from "../../../utils/cn";

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
    href: "/admin/analytics",
    label: "Analytics",
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
    href: "/admin/instructors",
    label: "Instructor management",
    icon: IconMessageUser,
  },
  {
    href: "/admin/users",
    label: "User management",
    icon: Users2Icon,
  },
  {
    href: "/admin/reports",
    label: "Reports",
    icon: FlagTriangleRightIcon,
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: PackageIcon,
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
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className={cn("flex items-center justify-between p-4", {
          "justify-center": collapsedToIcon,
        })}
      >
        <Link
          to="/admin"
          className="no-underline select-none flex items-center text-black dark:text-white"
        >
          {collapsedToIcon ? (
            <MantineLogo color="primary" size={30} type="mark" />
          ) : (
            <MantineLogo color="primary" size={30} />
          )}
        </Link>
      </div>
      <Text
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
        className={cn("px-4", {
          hidden: collapsedToIcon,
        })}
      >
        Admin dashboard
      </Text>
      {/* Body */}
      <nav className="flex-1 p-2 flex flex-col gap-2">
        {navItems.map((item) => (
          <SidebarNavLink
            key={item.label}
            href={item.href}
            label={item.label}
            icon={item.icon}
            collapsedToIcon={collapsedToIcon}
            subLinks={item.subLinks}
          />
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
