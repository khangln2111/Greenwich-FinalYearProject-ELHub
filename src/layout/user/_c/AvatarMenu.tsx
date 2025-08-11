import { Avatar, Indicator, Menu, Text } from "@mantine/core";
import {
  IconBell,
  IconBriefcase,
  IconMessageCircle,
  IconSearch,
  IconSettings,
  IconTrash,
  IconUserCog,
} from "@tabler/icons-react";
import {
  ChartNoAxesCombinedIcon,
  CircleUserIcon,
  GiftIcon,
  GraduationCap,
  HistoryIcon,
  MonitorCheckIcon,
  PackageIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLogout } from "../../../features/auth/identityHooks";
import { cn } from "../../../utils/cn";
import { useAppStore } from "../../../zustand/stores/appStore";

interface AvatarMenuProps {
  className?: string;
}

const AvatarMenu = ({ className }: AvatarMenuProps) => {
  const handleLogout = useLogout();
  const currentUser = useAppStore((s) => s.currentUser);
  return (
    <Menu
      transitionProps={{ transition: "pop-top-right" }}
      withArrow
      position="bottom-end"
      trigger="click"
    >
      <Menu.Target>
        <div className="px-2 hover:bg-blue-light-hover py-1 rounded-md">
          <Indicator offset={5}>
            <Avatar
              className={cn("cursor-pointer shadow-sm border", className)}
              color="initials"
              src={currentUser?.avatarUrl}
              name={
                `${currentUser?.firstName?.trim()} ${currentUser?.lastName?.trim()}`.trim() ||
                "Nguyen Khang"
              }
              allowedInitialsColors={["blue", "red"]}
            />
          </Indicator>
        </div>
      </Menu.Target>

      <Menu.Dropdown className="shadow-xl max-h-[90dvh] overflow-y-auto">
        <Menu.Label>Personal</Menu.Label>
        <Menu.Item leftSection={<ChartNoAxesCombinedIcon size={15} />}>Analytics</Menu.Item>
        <Menu.Item
          component={Link}
          to="/dashboard/my-account"
          leftSection={<CircleUserIcon size={15} />}
        >
          My account
        </Menu.Item>
        <Menu.Item
          leftSection={<MonitorCheckIcon size={15} />}
          component={Link}
          to="/dashboard/enrolled-courses"
        >
          Enrolled courses
        </Menu.Item>
        <Menu.Item
          leftSection={<HistoryIcon size={15} />}
          component={Link}
          to="/dashboard/order-history"
        >
          Purchase history
        </Menu.Item>
        <Menu.Item
          leftSection={<PackageIcon size={15} />}
          component={Link}
          to="/dashboard/inventory"
        >
          Inventory
        </Menu.Item>
        <Menu.Item leftSection={<GiftIcon size={15} />} component={Link} to="/dashboard/gifts">
          Gifts
        </Menu.Item>

        <Menu.Item
          leftSection={<IconSearch size={15} />}
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />
        <Menu.Label>Communication</Menu.Label>
        <Menu.Item leftSection={<IconBell size={15} />}>Notifications</Menu.Item>
        <Menu.Item leftSection={<IconMessageCircle size={15} />}>Messages</Menu.Item>

        <Menu.Divider />

        <Menu.Label>Sites navigation</Menu.Label>

        {/* menu item as link to /home student */}
        <Menu.Item
          className="cursor-pointer"
          component={Link}
          to="/"
          leftSection={<GraduationCap size={15} />}
        >
          Student sites
        </Menu.Item>
        <Menu.Item
          leftSection={<IconBriefcase size={15} />}
          className="cursor-pointer"
          component={Link}
          to="/instructor/courses"
        >
          Instructor dashboard
        </Menu.Item>
        <Menu.Item
          className="cursor-pointer"
          component={Link}
          to="/admin/analytics"
          leftSection={<IconUserCog size={15} />}
        >
          Admin dashboard
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item leftSection={<IconSettings size={15} />}>Settings</Menu.Item>
        <Menu.Item
          color="red"
          leftSection={<IconTrash size={15} />}
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AvatarMenu;
