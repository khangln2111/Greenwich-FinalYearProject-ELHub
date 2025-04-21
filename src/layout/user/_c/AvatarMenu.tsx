import { Avatar, Indicator, Menu, Text } from "@mantine/core";
import {
  IconSettings,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconArrowsLeftRight,
  IconTrash,
} from "@tabler/icons-react";
import { cn } from "../../../utils/cn";

interface AvatarMenuProps {
  className?: string;
}

const AvatarMenu = ({ className }: AvatarMenuProps) => {
  return (
    <Menu
      transitionProps={{ transition: "pop-top-right" }}
      withArrow
      position="bottom-end"
      trigger="click-hover"
    >
      <Menu.Target>
        <Indicator offset={5} processing>
          <Avatar
            className={cn("cursor-pointer", className)}
            color="initials"
            name="Nguyen Khang"
            allowedInitialsColors={["blue", "red"]}
          />
        </Indicator>
      </Menu.Target>

      <Menu.Dropdown className="shadow-xl">
        <Menu.Label>Application</Menu.Label>
        <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>Messages</Menu.Item>
        <Menu.Item leftSection={<IconPhoto size={14} />}>Gallery</Menu.Item>
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

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item leftSection={<IconArrowsLeftRight size={14} />}>Transfer my data</Menu.Item>
        <Menu.Item color="red" leftSection={<IconTrash size={14} />}>
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AvatarMenu;
