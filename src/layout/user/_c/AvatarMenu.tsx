import { Avatar, Indicator, Menu, Text } from "@mantine/core";
import {
  IconArrowsLeftRight,
  IconBriefcase,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import { GraduationCap } from "lucide-react";
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
        <Menu.Label>Application</Menu.Label>
        <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>Messages</Menu.Item>
        <Menu.Item leftSection={<IconPhoto size={14} />}>Gallery</Menu.Item>
        <Menu.Item
          leftSection={<IconBriefcase size={14} />}
          className="cursor-pointer"
          component={Link}
          to="/instructor/courses"
        >
          Instructor Dashboard
        </Menu.Item>
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
        {/* menu item as link to /home student */}
        <Menu.Item
          className="cursor-pointer"
          component={Link}
          to="/"
          leftSection={<GraduationCap size={14} />}
        >
          Student
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item leftSection={<IconArrowsLeftRight size={14} />}>Transfer my data</Menu.Item>
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
