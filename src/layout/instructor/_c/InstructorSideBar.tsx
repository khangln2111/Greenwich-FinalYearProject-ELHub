import { MantineLogo } from "@mantinex/mantine-logo";
import { IconBellRinging, IconFingerprint, IconReceipt2 } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { cn } from "../../../utils/cn";
import SidebarNavLink from "./InstructorSidebarNavLink/SidebarNavLink";

type InstructorSidebarProps = {
  collapsedToIcon?: boolean;
};

const navItems = [
  { href: "/instructor", label: "Dashboard", icon: IconBellRinging },
  {
    href: "#",
    label: "Course Management",
    icon: IconReceipt2,
    subLinks: [
      { label: "All Courses", href: "/instructor/courses" },
      { label: "Create Course", href: "/instructor/courses/create" },
      { label: "Drafts", href: "/instructor/drafts" },
    ],
  },
  {
    href: "#",
    label: "Students",
    icon: IconFingerprint,
    subLinks: [
      { label: "All Students", href: "/instructor/students" },
      { label: "Messages", href: "/instructor/messages" },
    ],
  },
  { href: "/instructor/settings", label: "Settings", icon: IconReceipt2 },
  { href: "/instructor/reports", label: "Reports", icon: IconFingerprint },
  {
    href: "#",
    label: "Billing",
    icon: IconReceipt2,
    subLinks: [
      { label: "Payment History", href: "/instructor/billing/history" },
      { label: "Subscription", href: "/instructor/billing/subscription" },
    ],
  },
  { href: "/instructor/security", label: "Security", icon: IconFingerprint },
  { href: "/instructor/notifications", label: "Notifications", icon: IconBellRinging },
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

      {/* Sidebar Body */}
      <nav className="flex-1 p-2 space-y-2">
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
