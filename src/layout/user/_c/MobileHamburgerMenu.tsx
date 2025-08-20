import { ActionIcon, Divider, Drawer, Group, NavLink, ScrollArea, Text } from "@mantine/core";
import {
  ChartNoAxesCombinedIcon,
  CircleUserIcon,
  GiftIcon,
  HistoryIcon,
  MonitorCheckIcon,
  PackageIcon,
  ShoppingCart,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggler from "../../../components/ThemeToggler";
import { MantineLogo } from "@mantinex/mantine-logo";

interface MobileHamburgerMenuProps {
  opened: boolean;
  onClose: () => void;
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Text
    size="sm"
    className="font-bold uppercase px-md mt-sm mb-xs text-gray-600 dark:text-gray-300"
    style={{ letterSpacing: 0.5 }}
  >
    {children}
  </Text>
);

const MobileHamburgerMenu = ({ opened, onClose }: MobileHamburgerMenuProps) => {
  const location = useLocation();

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      transitionProps={{ transition: "fade-right", duration: 200, timingFunction: "ease-out" }}
      size="280"
      padding="md"
      title={
        <Link
          to="/"
          className="no-underline select-none flex items-center text-black dark:text-white gap-2 font-semibold text-2xl"
        >
          <MantineLogo color="primary" size={30} type="mark" />
          <span className="font-[Inter] tracking-wide font-bold">ELHub</span>
        </Link>
      }
      hiddenFrom="md"
    >
      <ScrollArea mx="-md">
        {/* COMMON ROUTES */}
        <Divider />
        <SectionTitle>COMMON</SectionTitle>
        <NavLink
          component={Link}
          to="/"
          label="Home"
          active={location.pathname === "/"}
          onClick={onClose}
        />
        <NavLink
          component={Link}
          to="/courses"
          label="Courses"
          active={location.pathname.startsWith("/courses")}
          onClick={onClose}
        />

        <NavLink
          component={Link}
          to="/become-instructor"
          label="Become Instructor"
          active={location.pathname === "/become-instructor"}
          onClick={onClose}
        />

        <NavLink
          component={Link}
          to="/faqs"
          label="FAQs"
          active={location.pathname === "/faqs"}
          onClick={onClose}
        />
        <NavLink
          component={Link}
          to="/contact"
          label="Contact"
          active={location.pathname === "/contact"}
          onClick={onClose}
        />

        {/* Account */}
        <Divider mt="md" />
        <SectionTitle>Account</SectionTitle>
        <NavLink
          component={Link}
          label="My account"
          to="/dashboard/my-account"
          leftSection={<CircleUserIcon size={16} />}
          active={location.pathname === "/dashboard/my-account"}
          onClick={onClose}
        />
        <NavLink
          component={Link}
          label="Dashboard"
          to="/dashboard"
          leftSection={<ChartNoAxesCombinedIcon size={16} />}
          active={location.pathname === "/dashboard"}
          onClick={onClose}
        />
        <NavLink
          component={Link}
          label="Enrolled courses"
          to="/dashboard/enrolled-courses"
          leftSection={<MonitorCheckIcon size={16} />}
          active={location.pathname === "/dashboard/enrolled-courses"}
          onClick={onClose}
        />
        <NavLink
          component={Link}
          label="Order history"
          to="/dashboard/order-history"
          leftSection={<HistoryIcon size={16} />}
          active={location.pathname === "/dashboard/order-history"}
          onClick={onClose}
        />
        <NavLink
          component={Link}
          label="Inventory"
          to="/dashboard/inventory"
          leftSection={<PackageIcon size={16} />}
          active={location.pathname === "/dashboard/inventory"}
          onClick={onClose}
        />
        <NavLink
          component={Link}
          label="Gifts"
          to="/dashboard/gifts"
          leftSection={<GiftIcon size={16} />}
          active={location.pathname === "/dashboard/gifts"}
          onClick={onClose}
        />

        {/* FOOTER */}
        <Divider my="md" />
        <Group justify="center" grow pb="xl" px="md">
          <ThemeToggler />
          <ActionIcon
            variant="default"
            size="lg"
            aria-label="Shopping cart trigger"
            component={Link}
            to="/cart"
            onClick={onClose}
          >
            <ShoppingCart size={19} strokeWidth={1.5} />
          </ActionIcon>
        </Group>
      </ScrollArea>
    </Drawer>
  );
};

export default MobileHamburgerMenu;
