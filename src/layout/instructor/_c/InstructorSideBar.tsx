import { Text } from "@mantine/core";
import { IconBellRinging } from "@tabler/icons-react";
import {
  ChartNoAxesCombinedIcon,
  ScreenShareIcon,
  SettingsIcon,
  TicketPercentIcon,
  User2Icon,
} from "lucide-react";
import { Link } from "react-router-dom";
import BrandLogo from "../../../components/BrandLogo/BrandLogo";
import SidebarNavLink from "../../../components/layout/SidebarNavLink/SidebarNavLink";
import { cn } from "../../../utils/cn";
import { useAppStore } from "../../../zustand/stores/appStore";

type InstructorSidebarProps = {
  collapsedToIcon?: boolean;
};

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  subLinks?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  { href: "/instructor/dashboard", label: "Dashboard", icon: ChartNoAxesCombinedIcon },
  {
    href: "/instructor/courses",
    label: "Course management",
    icon: ScreenShareIcon,
  },
  {
    href: "/instructor/profile",
    label: "Instructor profile",
    icon: User2Icon,
  },
  {
    href: "/instructor/coupons",
    label: "Coupons",
    icon: TicketPercentIcon,
  },
  { href: "/instructor/notifications", label: "Notifications", icon: IconBellRinging },
  { href: "/instructor/settings", label: "Settings", icon: SettingsIcon },
];

const InstructorSidebar = ({ collapsedToIcon }: InstructorSidebarProps) => {
  const closeMobileSidebar = useAppStore((s) => s.closeMobileInstructorSidebar);

  return (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div
        className={cn("flex items-center justify-between p-4", {
          "justify-center": collapsedToIcon,
        })}
      >
        <Link to="/instructor/dashboard">
          <BrandLogo variant={collapsedToIcon ? "mark" : "full"} />
        </Link>
      </div>
      {/* header: instructor sidebar */}
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
        Instructor site
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
            onClick={closeMobileSidebar}
          />
        ))}
      </nav>
    </div>
  );
};

export default InstructorSidebar;
