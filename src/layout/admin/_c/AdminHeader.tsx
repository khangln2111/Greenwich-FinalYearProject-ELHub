// components/instructor/InstructorHeader.tsx
import { ActionIcon, Box, Button, Group, Indicator, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBell, IconSearch } from "@tabler/icons-react";
import { PanelLeftCloseIcon, PanelRightCloseIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import ThemeToggler from "../../../components/ThemeToggler/ThemeToggler";
import { useAppStore } from "../../../zustand/stores/appStore";
import AvatarMenu from "../../user/_c/AvatarMenu";
import SearchBox from "../../user/_c/SearchBox";
import BrandLogo from "../../../components/BrandLogo/BrandLogo";
import { useGetUnreadNotificationsCount } from "../../../features/notification/notification.hooks";
import { RoleName } from "../../../features/auth/identity.types";
import { useGetCurrentUser } from "../../../features/auth/identity.hooks";

const InstructorHeader = () => {
  const { data: currentUser } = useGetCurrentUser();
  const desktopAdminSidebarCollapsed = useAppStore((s) => s.desktopAdminSidebarCollapsed);
  const toggleDesktopAdminSidebar = useAppStore((s) => s.toggleDesktopAdminSidebar);
  const openMobileAdminSidebar = useAppStore((s) => s.openMobileAdminSidebar);

  const { data: unreadNotificationsCount } = useGetUnreadNotificationsCount(RoleName.Admin);

  const [mobileSearchOpened, { open: openMobileSearch, close: closeMobileSearch }] =
    useDisclosure(false);
  // get search value from url
  const [searchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");
  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <Box
      component="header"
      className="min-h-[60px] px-4 shadow-md bg-white dark:bg-dark-7 sticky top-0
        z-[calc(var(--mantine-z-index-app)+1)] content-center"
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
          value={searchValue}
          onChange={setSearchValue}
          onSearch={() => {
            handleSearch();
            closeMobileSearch();
          }}
          onClear={() => setSearchValue("")}
          size="lg"
          placeholder="Search courses..."
          radius="3xl"
        />
      </Modal>
      <div className="flex items-center justify-between h-full gap-2 md:gap-5">
        {/* desktop sidebar toggler */}
        <Button
          onClick={toggleDesktopAdminSidebar}
          className="p-2 bg-white dark:bg-dark-6 text-bright rounded hover:bg-gray-200 dark:hover:bg-dark-5 transition
            justify-center items-center visible-from-lg"
        >
          {desktopAdminSidebarCollapsed ? (
            <PanelRightCloseIcon size={20} />
          ) : (
            <PanelLeftCloseIcon size={20} />
          )}
        </Button>
        <div className="flex items-center gap-3 sm:gap-4 lg:hidden">
          {/* mobile sidebar toggler */}
          <PanelRightCloseIcon onClick={openMobileAdminSidebar} />
          <Link to="/">
            <BrandLogo variant="mark" />
          </Link>
        </div>

        {/* Nav links (desktop) */}
        <div className="flex flex-1 items-center visible-from-md">
          <SearchBox
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handleSearch}
            onClear={() => setSearchValue("")}
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
          <Indicator label={unreadNotificationsCount ?? 0} size={20} offset={2} position="top-end">
            <ActionIcon
              variant="default"
              size="lg"
              aria-label="Notification trigger"
              component={Link}
              to="/admin/notifications"
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
