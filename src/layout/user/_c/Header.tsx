import { ActionIcon, Box, Button, Group, Indicator, Skeleton } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconBell, IconSearch } from "@tabler/icons-react";
import { ArrowLeftIcon, PanelRightCloseIcon, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import BrandLogo from "../../../components/BrandLogo/BrandLogo";
import ThemeToggler from "../../../components/ThemeToggler/ThemeToggler";
import { useGetCurrentUser } from "../../../features/auth/identity.hooks";
import { RoleName } from "../../../features/auth/identity.types";
import { useGetCartItemCountSelf } from "../../../features/cart/cart.hooks";
import { useGetUnreadNotificationsCount } from "../../../features/notification/notification.hooks";
import { useCourseQueryState } from "../../../hooks/useCoursesQueryState";
import AvatarMenu from "./AvatarMenu";
import MobileHamburgerMenu from "./MobileHamburgerMenu";
import SearchBox from "./SearchBox";
import { cn } from "../../../utils/cn";

const Header = () => {
  const { data: currentUser, isLoading: isUserLoading } = useGetCurrentUser();
  const [isMobileSearching, setIsMobileSearching] = useState(false);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [{ search }, setCoursesQuery] = useCourseQueryState();
  const location = useLocation();
  const isInCoursesPage = location.pathname === "/courses";
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [searchInput, setSearchInput] = useState<string>(search);
  const navigate = useNavigate();
  const { data: cartItemCount } = useGetCartItemCountSelf();
  const { data: unreadNotificationsCount } = useGetUnreadNotificationsCount(RoleName.Learner);

  const [windowScrolled, setWindowScrolled] = useState(false);

  const isHomePage = location.pathname === "/";

  const shouldBeSticky = windowScrolled || !isHomePage || (isMobileSearching && isMobile);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setWindowScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    const trimmed = searchInput.trim();
    if (!trimmed) return;

    if (location.pathname === "/courses") {
      setCoursesQuery({ search: trimmed });
    } else {
      navigate(`/courses?search=${encodeURIComponent(trimmed)}`);
    }
    setIsMobileSearching(false);
  };

  return (
    <Box
      component="header"
      className={cn(
        `min-h-[55px] px-4 lg:px-7 content-center z-[calc(var(--mantine-z-index-app)+1)] transition-all
        bg-transparent border-b-0 shadow-none absolute left-0 right-0`,
        {
          [`fixed top-0 left-0 right-0 bg-white dark:bg-dark-7 shadow-md backdrop-blur-sm dark:border-b
          dark:border-dark-4`]: shouldBeSticky,
          "sticky top-0 bg-white dark:bg-dark-7 shadow-md backdrop-blur-sm dark:border-b dark:border-dark-4":
            !isHomePage,
        },
      )}
    >
      {/* Search mode (mobile full width) */}
      {(isMobileSearching || isInCoursesPage) && isMobile ? (
        <div className="flex items-center justify-center gap-4 h-full w-full">
          <ActionIcon
            variant="default"
            size="lg"
            onClick={() => {
              if (isInCoursesPage) {
                setCoursesQuery({ search: "" });
                navigate("");
              }
              setIsMobileSearching(false);
            }}
            aria-label="Back"
          >
            <ArrowLeftIcon size={20} />
          </ActionIcon>

          <SearchBox
            value={searchInput}
            onChange={setSearchInput}
            onSearch={handleSearch}
            onClear={() => {
              setSearchInput("");
              setCoursesQuery({ search: "" });
            }}
            size="md"
            rightIconSize={28}
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
            <Link to="/">
              <BrandLogo
                classNames={{
                  text: "hidden lg:block tracking-wide",
                }}
              />
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
            {!currentUser && !isUserLoading && (
              <>
                <ThemeToggler />
                <Button
                  to="/login"
                  component={Link}
                  prefetch="render"
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan" }}
                >
                  Log in
                </Button>
              </>
            )}

            {/* Search icon (mobile only) */}
            <ActionIcon
              onClick={() => setIsMobileSearching(true)}
              className="md:hidden"
              variant="default"
              size="lg"
              aria-label="Open search"
            >
              <IconSearch size={20} />
            </ActionIcon>

            {/* Notification (desktop only) */}
            {isUserLoading ? (
              <Skeleton visibleFrom="lg" width={34} height={34} />
            ) : (
              currentUser && (
                <Indicator
                  label={unreadNotificationsCount ?? 0}
                  size={20}
                  offset={2}
                  position="top-end"
                  visibleFrom="lg"
                >
                  <ActionIcon
                    variant="default"
                    size="lg"
                    aria-label="Notification trigger"
                    component={Link}
                    to="/dashboard/notifications"
                  >
                    <IconBell size={19} strokeWidth={1.5} />
                  </ActionIcon>
                </Indicator>
              )
            )}

            {/* Cart */}
            {isUserLoading ? (
              <Skeleton width={34} height={34} />
            ) : (
              currentUser && (
                <Indicator
                  label={cartItemCount && cartItemCount > 99 ? "99+" : (cartItemCount ?? 0)}
                  size={20}
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
              )
            )}

            {isUserLoading ? (
              <>
                <Skeleton width={34} height={34} />
                <div className="px-2 py-1">
                  <Skeleton width={38} height={38} radius="full" />
                </div>
              </>
            ) : (
              currentUser && (
                <>
                  <ThemeToggler />
                  <AvatarMenu />
                </>
              )
            )}
          </Group>
        </div>
      )}

      {/* Drawer for mobile nav */}
      <MobileHamburgerMenu opened={drawerOpened} onClose={closeDrawer} />
    </Box>
  );
};

export default Header;
