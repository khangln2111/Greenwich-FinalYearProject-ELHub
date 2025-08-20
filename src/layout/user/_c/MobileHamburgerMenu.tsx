import { ActionIcon, Divider, Drawer, Group, NavLink, ScrollArea } from "@mantine/core";
import { ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggler from "../../../components/ThemeToggler";

interface MobileHamburgerMenuProps {
  opened: boolean;
  onClose: () => void;
}

const MobileHamburgerMenu = ({ opened, onClose }: MobileHamburgerMenuProps) => {
  const location = useLocation();

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      transitionProps={{ transition: "fade-right", duration: 200, timingFunction: "ease-out" }}
      size="330"
      padding="md"
      title="Navigation"
      hiddenFrom="md"
    >
      <ScrollArea mx="-md">
        <Divider my="sm" />

        {/* User routes */}
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
          to="/cart"
          label="Cart"
          active={location.pathname === "/cart"}
          onClick={onClose}
        />
        <NavLink
          component={Link}
          to="/checkout"
          label="Checkout"
          active={location.pathname.startsWith("/checkout")}
          onClick={onClose}
        />
        <NavLink
          component={Link}
          to="/become-instructor"
          label="Become Instructor"
          active={location.pathname === "/become-instructor"}
          onClick={onClose}
        />

        <NavLink label="User Dashboard" defaultOpened={location.pathname.startsWith("/dashboard")}>
          <NavLink
            component={Link}
            to="/dashboard/my-account"
            label="My Account"
            active={location.pathname === "/dashboard/my-account"}
            onClick={onClose}
          />
          <NavLink
            component={Link}
            to="/dashboard/enrolled-courses"
            label="Enrolled Courses"
            active={location.pathname === "/dashboard/enrolled-courses"}
            onClick={onClose}
          />
          <NavLink
            component={Link}
            to="/dashboard/inventory"
            label="Inventory"
            active={location.pathname === "/dashboard/inventory"}
            onClick={onClose}
          />
          <NavLink
            component={Link}
            to="/dashboard/analytics"
            label="Analytics"
            active={location.pathname === "/dashboard/analytics"}
            onClick={onClose}
          />
          <NavLink
            component={Link}
            to="/dashboard/order-history"
            label="Order History"
            active={location.pathname.startsWith("/dashboard/order-history")}
            onClick={onClose}
          />
          <NavLink
            component={Link}
            to="/dashboard/gifts"
            label="Gifts"
            active={location.pathname === "/dashboard/gifts"}
            onClick={onClose}
          />
        </NavLink>

        {/* Instructor routes */}
        <NavLink
          label="Instructor"
          childrenOffset={28}
          defaultOpened={location.pathname.startsWith("/instructor")}
        >
          <NavLink
            component={Link}
            to="/instructor/analytics"
            label="Analytics"
            active={location.pathname === "/instructor/analytics"}
            onClick={onClose}
          />
          <NavLink
            component={Link}
            to="/instructor/students"
            label="Students"
            active={location.pathname === "/instructor/students"}
            onClick={onClose}
          />
          <NavLink
            component={Link}
            to="/instructor/courses"
            label="Courses"
            active={location.pathname.startsWith("/instructor/courses")}
            onClick={onClose}
          />
          <NavLink
            component={Link}
            to="/instructor/profile"
            label="Profile"
            active={location.pathname === "/instructor/profile"}
            onClick={onClose}
          />
          <NavLink
            component={Link}
            to="/instructor/coupons"
            label="Coupons"
            active={location.pathname === "/instructor/coupons"}
            onClick={onClose}
          />
        </NavLink>

        {/* Admin routes */}
        <NavLink
          label="Admin"
          childrenOffset={28}
          defaultOpened={location.pathname.startsWith("/admin")}
        >
          <NavLink
            component={Link}
            to="/admin/analytics"
            label="Analytics"
            active={location.pathname === "/admin/analytics"}
            onClick={onClose}
          />
          <NavLink
            component={Link}
            to="/admin/categories"
            label="Categories"
            active={location.pathname === "/admin/categories"}
            onClick={onClose}
          />
          <NavLink
            component={Link}
            to="/admin/instructor-applications"
            label="Instructor Applications"
            active={location.pathname === "/admin/instructor-applications"}
            onClick={onClose}
          />
          <NavLink
            component={Link}
            to="/admin/courses"
            label="Courses"
            active={location.pathname === "/admin/courses"}
            onClick={onClose}
          />
          <NavLink
            component={Link}
            to="/admin/courses/pending"
            label="Pending Courses"
            active={location.pathname === "/admin/courses/pending"}
            onClick={onClose}
          />
          <NavLink
            component={Link}
            to="/admin/users"
            label="Users"
            active={location.pathname === "/admin/users"}
            onClick={onClose}
          />
        </NavLink>

        {/* Auth */}
        <Divider my="sm" label="Account" />
        <NavLink
          component={Link}
          to="/login"
          label="Login"
          active={location.pathname === "/login"}
          onClick={onClose}
        />
        <NavLink
          component={Link}
          to="/register"
          label="Register"
          active={location.pathname === "/register"}
          onClick={onClose}
        />
        <NavLink
          component={Link}
          to="/forgot-password"
          label="Forgot Password"
          active={location.pathname === "/forgot-password"}
          onClick={onClose}
        />
        <NavLink
          component={Link}
          to="/verify-email"
          label="Verify Email"
          active={location.pathname === "/verify-email"}
          onClick={onClose}
        />

        {/* Extra pages */}
        <Divider my="sm" label="Extra" />
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

        <Divider my="sm" />
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
