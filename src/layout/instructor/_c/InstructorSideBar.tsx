import { MantineLogo } from "@mantinex/mantine-logo";
import { IconBellRinging, IconFingerprint } from "@tabler/icons-react";
import {
  LayoutDashboardIcon,
  ScreenShareIcon,
  SettingsIcon,
  TicketPercentIcon,
  User2Icon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../../utils/cn";
import SidebarNavLink from "./InstructorSidebarNavLink/SidebarNavLink";
import { Text } from "@mantine/core";

type InstructorSidebarProps = {
  collapsedToIcon?: boolean;
};

const navItems = [
  { href: "/instructor", label: "Dashboard", icon: LayoutDashboardIcon },
  {
    href: "/instructor/courses",
    label: "Course Management",
    icon: ScreenShareIcon,
  },
  {
    href: "/instructor/profile",
    label: "Instructor Profile",
    icon: User2Icon,
  },
  {
    href: "/instructor/coupons",
    label: "Coupons",
    icon: TicketPercentIcon,
  },
  { href: "/instructor/notifications", label: "Notifications", icon: IconBellRinging },
  {
    href: "#",
    label: "Students",
    icon: IconFingerprint,
    subLinks: [
      { label: "All Students", href: "/instructor/students" },
      { label: "Messages", href: "/instructor/messages" },
    ],
  },
  { href: "/instructor/settings", label: "Settings", icon: SettingsIcon },
];

const InstructorSidebar = ({ collapsedToIcon }: InstructorSidebarProps) => {
  return (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div
        className={cn("flex items-center justify-between p-4", {
          "justify-center": collapsedToIcon,
        })}
      >
        <Link
          to="/instructor"
          className="no-underline select-none flex items-center text-black dark:text-white"
        >
          {collapsedToIcon ? (
            <MantineLogo color="primary" size={30} type="mark" />
          ) : (
            <MantineLogo color="primary" size={30} />
          )}
        </Link>
      </div>
      {/* header: instructor sidebar */}
      <Text
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
        className="px-4"
      >
        Instructor dashboard
      </Text>
      {/* Sidebar Body */}
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

export default InstructorSidebar;
