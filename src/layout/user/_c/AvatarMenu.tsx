import { Avatar, Indicator, Menu, Text } from "@mantine/core";
import {
  IconBell,
  IconBriefcase,
  IconMessageCircle,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import {
  ChartNoAxesCombinedIcon,
  CircleUserIcon,
  GiftIcon,
  GraduationCap,
  MonitorCheckIcon,
  PackageIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLogout } from "../../../react-query/auth/identityHooks";
import { cn } from "../../../utils/cn";
import { useAppStore } from "../../../zustand/store";

interface AvatarMenuProps {
  className?: string;
}

const AvatarMenu = ({ className }: AvatarMenuProps) => {
  const handleLogout = useLogout();
  const currentUser = useAppStore.use.currentUser();
  return (
    <Menu
      transitionProps={{ transition: "pop-top-right" }}
      withArrow
      position="bottom-end"
      trigger="click"
    >
      <Menu.Target>
        <div className="px-2 hover:bg-blue-light-hover py-1 rounded-md">
          <Indicator offset={5} processing>
            <Avatar
              className={cn("cursor-pointer", className)}
              color="initials"
              name={currentUser?.firstName || "haha"}
              allowedInitialsColors={["blue", "red"]}
            />
          </Indicator>
        </div>
      </Menu.Target>

      <Menu.Dropdown className="shadow-xl">
        <Menu.Label>Personal</Menu.Label>
        <Menu.Item leftSection={<CircleUserIcon size={14} />}>My Account</Menu.Item>
        <Menu.Item leftSection={<MonitorCheckIcon size={14} />}>Enrolled courses</Menu.Item>
        <Menu.Item leftSection={<ChartNoAxesCombinedIcon size={14} />}>Analytics</Menu.Item>
        <Menu.Item leftSection={<PackageIcon size={14} />}>Purchase History</Menu.Item>
        <Menu.Item leftSection={<GiftIcon size={14} />}>Gifts</Menu.Item>

        <Menu.Item
          leftSection={<IconSearch size={14} />}
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
        <Menu.Item leftSection={<IconBell size={14} />}>Notifications</Menu.Item>
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>Messages</Menu.Item>

        <Menu.Divider />

        <Menu.Label>Sites navigation</Menu.Label>
        <Menu.Item
          leftSection={<IconBriefcase size={14} />}
          className="cursor-pointer"
          component={Link}
          to="/instructor/courses"
        >
          Instructor Dashboard
        </Menu.Item>

        {/* menu item as link to /home student */}
        <Menu.Item
          className="cursor-pointer"
          component={Link}
          to="/"
          leftSection={<GraduationCap size={14} />}
        >
          Student Sites
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Item
          color="red"
          leftSection={<IconTrash size={14} />}
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
