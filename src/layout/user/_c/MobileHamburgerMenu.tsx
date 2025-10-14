import { ActionIcon, Button, Drawer, Group, NavLink, ScrollArea, Stack, Text } from "@mantine/core";
import {
  ChartNoAxesCombinedIcon,
  CircleUserIcon,
  GiftIcon,
  GraduationCapIcon,
  HistoryIcon,
  LogInIcon,
  LogOutIcon,
  MonitorCheckIcon,
  PackageIcon,
  ShieldCheckIcon,
  ShoppingCart,
  UserPlusIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import BrandLogo from "../../../components/BrandLogo/BrandLogo";
import ThemeToggler from "../../../components/ThemeToggler/ThemeToggler";
import { useGetCurrentUser, useLogout } from "../../../features/auth/identity.hooks";
import { IconBell, IconSettings } from "@tabler/icons-react";

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
  const { data: currentUser } = useGetCurrentUser();
  const logout = useLogout();

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      transitionProps={{ transition: "fade-right", duration: 200, timingFunction: "ease-out" }}
      size="280"
      padding="md"
      classNames={{
        header: "border-b",
      }}
      title={
        <>
          <Link to="/">
            <BrandLogo />
          </Link>
        </>
      }
    >
      <ScrollArea mx="-md">
        {!currentUser ? (
          <div>
            {/* Auth Section if not logged in */}
            <Group px="md" py="md" grow className="border-b">
              <Button
                component={Link}
                to="/login"
                leftSection={<LogInIcon size={16} />}
                variant="filled"
                onClick={onClose}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                leftSection={<UserPlusIcon size={16} />}
                variant="light"
                onClick={onClose}
              >
                Sign Up
              </Button>
            </Group>
          </div>
        ) : (
          <div className="pb-xs border-b">
            {/* Account section */}
            <SectionTitle>Account</SectionTitle>
            <NavLink
              component={Link}
              label="My account"
              to="/dashboard/my-profile"
              leftSection={<CircleUserIcon size={16} />}
              active={location.pathname === "/dashboard/my-profile"}
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
              to="/dashboard/my-learning"
              leftSection={<MonitorCheckIcon size={16} />}
              active={location.pathname === "/dashboard/my-learning"}
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
            <NavLink
              component={Link}
              label="Notifications"
              to="/dashboard/notifications"
              leftSection={<IconBell size={16} />}
              active={location.pathname === "/dashboard/notifications"}
              onClick={onClose}
            />
            <NavLink
              component={Link}
              label="Settings"
              to="/dashboard/settings"
              leftSection={<IconSettings size={16} />}
              active={location.pathname === "/dashboard/settings"}
              onClick={onClose}
            />

            <NavLink
              component={Link}
              to="/instructor/dashboard"
              label="Instructor Site"
              leftSection={<GraduationCapIcon size={16} />}
              active={location.pathname.startsWith("/instructor/dashboard")}
              onClick={onClose}
            />
            <NavLink
              component={Link}
              to="/admin/dashboard"
              label="Admin Site"
              leftSection={<ShieldCheckIcon size={16} />}
              active={location.pathname.startsWith("/admin/dashboard")}
              onClick={onClose}
            />
          </div>
        )}

        {/* COMMON ROUTES */}
        <div className="pb-xs">
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
            to="/faq"
            label="FAQs"
            active={location.pathname === "/faq"}
            onClick={onClose}
          />
          <NavLink
            component={Link}
            to="/contact"
            label="Contact"
            active={location.pathname === "/contact"}
            onClick={onClose}
          />
        </div>

        {/* FOOTER */}
        <Stack gap={20} className="border-t px-md py-md">
          <Group justify="center" grow>
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
          {currentUser && (
            <Button
              variant="light"
              color="red"
              leftSection={<LogOutIcon size={16} />}
              onClick={() => logout.mutate()}
            >
              Logout
            </Button>
          )}
        </Stack>
      </ScrollArea>
    </Drawer>
  );
};

export default MobileHamburgerMenu;
