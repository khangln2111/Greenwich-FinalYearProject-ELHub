// components/instructor/InstructorHeader.tsx
import { ActionIcon, Box, Button, Group, Indicator, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBell, IconSearch } from "@tabler/icons-react";
import { PanelLeftCloseIcon, PanelRightCloseIcon } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import BrandLogo from "../../../components/BrandLogo/BrandLogo";
import ThemeToggler from "../../../components/ThemeToggler/ThemeToggler";
import { useGetCurrentUser } from "../../../features/auth/identity.hooks";
import { RoleName } from "../../../features/auth/identity.types";
import { useGetUnreadNotificationsCount } from "../../../features/notification/notification.hooks";
import { useAppStore } from "../../../zustand/stores/appStore";
import AvatarMenu from "../../user/_c/AvatarMenu";
import SearchBox from "../../user/_c/SearchBox";

const InstructorHeader = () => {
  const { data: currentUser } = useGetCurrentUser();

  const desktopInstructorSidebarCollapsed = useAppStore((s) => s.desktopInstructorSidebarCollapsed);
  const toggleDesktopInstructorSidebar = useAppStore((s) => s.toggleDesktopInstructorSidebar);
  const openMobileInstructorSidebar = useAppStore((s) => s.openMobileInstructorSidebar);

  const { data: unreadNotificationsCount } = useGetUnreadNotificationsCount(RoleName.Instructor);

  const [mobileSearchOpened, { open: openMobileSearch, close: closeMobileSearch }] =
    useDisclosure(false);
  // get search value from url
  const [searchParam, setSearchParam] = useQueryState("search", parseAsString.withDefault(""));

  const [searchInput, setSearchInput] = useState(searchParam);
  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/instructor/courses?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  useEffect(() => {
    setSearchInput(searchParam);
  }, [searchParam]);

  return (
    <Box
      component="header"
      className="min-h-[60px] px-4 bg-white dark:bg-dark-7 sticky top-0 z-[calc(var(--mantine-z-index-app)+1)]
        content-center shadow-md"
    >
      {/* mobile search box */}
      <Modal
        opened={mobileSearchOpened}
        onClose={closeMobileSearch}
        withCloseButton={false}
        transitionProps={{
          transition: "fade",
        }}
        size="100%"
        className="md:hidden"
        yOffset={"25%"}
        xOffset={5}
      >
        <SearchBox
          value={searchInput}
          onChange={setSearchInput}
          onSearch={() => {
            handleSearch();
            closeMobileSearch();
          }}
          onClear={() => {
            setSearchInput("");
          }}
          size="lg"
          placeholder="Search courses..."
          radius="3xl"
        />
      </Modal>
      <div className="flex items-center justify-between h-full gap-2 md:gap-5">
        {/* desktop sidebar toggler */}
        <Button
          onClick={toggleDesktopInstructorSidebar}
          className="p-2 bg-white dark:bg-dark-6 text-bright rounded hover:bg-gray-200 dark:hover:bg-dark-5 transition
            justify-center items-center visible-from-lg"
        >
          {desktopInstructorSidebarCollapsed ? (
            <PanelRightCloseIcon size={20} />
          ) : (
            <PanelLeftCloseIcon size={20} />
          )}
        </Button>

        <div className="flex items-center gap-3 sm:gap-4 lg:hidden">
          {/* mobile sidebar toggler */}
          <PanelRightCloseIcon onClick={openMobileInstructorSidebar} />
          <Link to="/">
            <BrandLogo variant="mark" />
          </Link>
        </div>

        {/* Nav links (desktop) */}
        <div className="flex flex-1 items-center visible-from-md">
          <SearchBox
            value={searchInput}
            onChange={setSearchInput}
            onSearch={handleSearch}
            onClear={() => {
              setSearchInput("");
              setSearchParam("");
            }}
            size="md"
            placeholder="Search courses..."
            radius="3xl"
          />
        </div>

        <Group>
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

          {/* <Button to="/register" component={Link}>
            Sign up
          </Button> */}
          <ActionIcon
            onClick={openMobileSearch}
            className="md:hidden"
            variant="default"
            size="lg"
            aria-label="Open search"
          >
            <IconSearch size={20} />
          </ActionIcon>
          <Button variant="subtle" visibleFrom="md" className="font-normal" component={Link} to="/">
            Student site
          </Button>
          <Indicator label={unreadNotificationsCount ?? 0} size={20} offset={2} position="top-end">
            <ActionIcon
              variant="default"
              size="lg"
              aria-label="Notification trigger"
              component={Link}
              to="/instructor/notifications"
            >
              <IconBell size={19} strokeWidth={1.5} />
            </ActionIcon>
          </Indicator>

          <ThemeToggler />
          {currentUser && <AvatarMenu />}
        </Group>
      </div>
    </Box>
  );
};

export default InstructorHeader;
