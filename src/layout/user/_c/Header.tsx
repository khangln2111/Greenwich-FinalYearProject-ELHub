import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Drawer,
  Group,
  Indicator,
  ScrollArea,
  rem,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import { IconBell, IconSearch } from "@tabler/icons-react";
import { ArrowLeftIcon, PanelRightCloseIcon, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggler from "../../../components/ThemeToggler";
import { useGetCart } from "../../../features/cart/cartHooks";
import { useAppStore } from "../../../zustand/stores/appStore";
import AvatarMenu from "./AvatarMenu";
import CustomNavLink from "./CustomNavLink";
import SearchBox from "./SearchBox";
import { useCourseQueryState } from "../../../hooks/useCoursesQueryState";

const Header = () => {
  const currentUser = useAppStore((s) => s.currentUser);
  const [isSearching, setIsSearching] = useState(false);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [{ search }, setCoursesQuery] = useCourseQueryState();
  const location = useLocation();
  const isInCoursesPage = location.pathname === "/courses";
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [searchInput, setSearchInput] = useState<string>(search);
  const navigate = useNavigate();
  const { data: cart } = useGetCart();

  const handleSearch = () => {
    const trimmed = searchInput.trim();
    if (!trimmed) return;

    if (location.pathname === "/courses") {
      setCoursesQuery({ search: trimmed });
    } else {
      navigate(`/courses?search=${encodeURIComponent(trimmed)}`);
    }
    setIsSearching(false);
  };

  return (
    <Box
      component="header"
      className="min-h-[55px] px-md dark:border-b dark:border-dark-4 bg-white dark:bg-dark-7 sticky top-0
        z-[calc(var(--mantine-z-index-app)+1)] content-center shadow-md"
    >
      {/* Search mode (mobile full width) */}
      {(isSearching || isInCoursesPage) && isMobile ? (
        <div className="flex items-center justify-center gap-4 h-full w-full">
          <ActionIcon
            variant="default"
            size="lg"
            onClick={() => {
              if (isInCoursesPage) {
                setCoursesQuery({ search: "" });
                navigate("");
              }
              setIsSearching(false);
            }}
            aria-label="Back"
          >
            <ArrowLeftIcon size={20} />
          </ActionIcon>

          <SearchBox
            autoFocus
            value={searchInput}
            onChange={setSearchInput}
            onSearch={handleSearch}
            onClear={() => {
              setSearchInput("");
              setCoursesQuery({ search: "" });
            }}
            size="md"
            placeholder="Search courses..."
            radius="3xl"
            className="flex-1"
          />
        </div>
      ) : (
        // Default header
        <div className="flex items-center justify-between h-full gap-2 md:gap-4 lg:gap-10">
          {/* Logo + drawer toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            <PanelRightCloseIcon onClick={toggleDrawer} className="hidden-from-lg block" />
            <Link
              to="/"
              className="no-underline select-none flex items-center text-black dark:text-white gap-2 font-semibold text-2xl"
            >
              <MantineLogo color="primary" size={30} type="mark" />
              <span className="hidden md:block font-[Inter] tracking-wide font-bold">ELHub</span>
            </Link>
          </div>

          {/* Tablet & Desktop search  */}
          <div className="hidden md:flex flex-1 justify-center">
            <SearchBox
              value={searchInput}
              onChange={setSearchInput}
              onSearch={handleSearch}
              onClear={() => {
                setSearchInput("");
                setCoursesQuery({ search: "" });
              }}
              size="md"
              placeholder="Search courses..."
              radius="3xl"
            />
          </div>

          {/* Action icons */}
          <Group className="h-full">
            {currentUser === null && (
              <Button
                to="/login"
                component={Link}
                variant="gradient"
                gradient={{ from: "blue", to: "cyan" }}
              >
                Log in
              </Button>
            )}

            {/* Search icon (mobile only) */}
            <ActionIcon
              onClick={() => setIsSearching(true)}
              className="md:hidden"
              variant="default"
              size="lg"
              aria-label="Open search"
            >
              <IconSearch size={20} />
            </ActionIcon>

            {/* Notification (desktop only) */}
            <ActionIcon
              variant="default"
              size="lg"
              aria-label="Notification trigger"
              visibleFrom="lg"
            >
              <IconBell size={19} strokeWidth={1.5} />
            </ActionIcon>

            {/* Cart */}
            {currentUser && (
              <Indicator
                label={cart?.cartItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0}
                size={20}
                color="indigo"
                offset={2}
                position="top-end"
              >
                <ActionIcon
                  variant="default"
                  size="lg"
                  aria-label="Shopping cart trigger"
                  component={Link}
                  to="/cart"
                >
                  <ShoppingCart size={19} strokeWidth={1.5} />
                </ActionIcon>
              </Indicator>
            )}

            <ThemeToggler />
            {currentUser && <AvatarMenu />}
          </Group>
        </div>
      )}

      {/* Drawer cho mobile nav */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        transitionProps={{ transition: "fade-right", duration: 200, timingFunction: "ease-out" }}
        size="330"
        padding="md"
        title="Navigation"
        hiddenFrom="md"
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          <CustomNavLink component={Link} to="/">
            Home
          </CustomNavLink>
          <CustomNavLink component={Link} to="/courses">
            Courses
          </CustomNavLink>
          <CustomNavLink component={Link} to="/become-instructor">
            Become Instructor
          </CustomNavLink>
          <CustomNavLink component={Link} to="/faqs">
            FAQs
          </CustomNavLink>
          <CustomNavLink component={Link} to="/contact">
            Contact
          </CustomNavLink>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default" component={Link} to="/login">
              Log in
            </Button>
            <ThemeToggler />
            <ActionIcon
              variant="default"
              size="lg"
              aria-label="Shopping cart trigger"
              component={Link}
              to="/cart"
              onClick={closeDrawer}
            >
              <ShoppingCart size={19} strokeWidth={1.5} />
            </ActionIcon>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default Header;
