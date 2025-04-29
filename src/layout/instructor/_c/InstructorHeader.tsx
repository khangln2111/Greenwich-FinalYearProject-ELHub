// components/instructor/InstructorHeader.tsx
import { ActionIcon, Box, Button, Drawer, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import {
  IconBell,
  IconBellRinging,
  IconFingerprint,
  IconReceipt2,
  IconSearch,
} from "@tabler/icons-react";
import { PanelLeftCloseIcon, PanelRightCloseIcon, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ThemeToggler from "../../../components/ThemeToggler";
import { cn } from "../../../utils/cn";
import { useAppStore } from "../../../zustand/store";
import AvatarMenu from "../../user/_c/AvatarMenu";
import SearchBox from "../../user/_c/SearchBox";

const navItems = [
  { href: "/instructor", label: "Notifications", icon: IconBellRinging },
  { href: "", label: "Billing", icon: IconReceipt2 },
  { href: "", label: "Security", icon: IconFingerprint },
];

const InstructorHeader = () => {
  const currentUser = useAppStore.use.currentUser();
  const sidebarCollapsed = useAppStore.use.sidebarCollapsed();
  const toggleSidebar = useAppStore.use.toggleSidebar();
  const [mobileDrawerOpened, { open: openMobileDrawer, close: closeMobileDrawer }] =
    useDisclosure();
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
      className="min-h-[60px] px-md border-b border-gray-200 dark:border-dark-5 bg-white dark:bg-dark-7 sticky top-0
        z-[calc(var(--mantine-z-index-app)+1)] content-center"
    >
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
          autoFocus
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
        {/* toggle sidebar */}
        <Button
          onClick={toggleSidebar}
          className="p-2 bg-white dark:bg-dark-6 text-dark-6 rounded hover:bg-gray-100 dark:hover:bg-dark-5 transition
            justify-center items-center visible-from-lg"
        >
          {sidebarCollapsed ? <PanelRightCloseIcon size={20} /> : <PanelLeftCloseIcon size={20} />}
        </Button>
        <Button
          onClick={openMobileDrawer}
          className="p-2 bg-white dark:bg-dark-6 text-dark-6 rounded hover:bg-gray-100 dark:hover:bg-dark-5 transition
            justify-center items-center hidden-from-lg"
        >
          <PanelRightCloseIcon size={20} />
        </Button>

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
          <ActionIcon variant="default" size="lg" aria-label="Notification trigger">
            <IconBell size={19} strokeWidth={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="default"
            size="lg"
            aria-label="Shopping cart trigger"
            component={Link}
            to="/cart"
          >
            <ShoppingCart size={19} strokeWidth={1.5} />
          </ActionIcon>
          <ThemeToggler />
          {currentUser && <AvatarMenu />}
        </Group>
      </div>

      <Drawer
        opened={mobileDrawerOpened}
        onClose={closeMobileDrawer}
        transitionProps={{
          transition: "fade-right",
          duration: 200,
          timingFunction: "ease-out",
        }}
        size={260}
        padding="sm"
        title={<MantineLogo color="primary" size={30} />}
        hiddenFrom="lg"
        zIndex={1000000}
      >
        <aside className="h-full bg-body transition-all duration-300 ease-in-out flex flex-col w-full">
          {/* Sidebar Header */}

          {/* Sidebar Body */}
          <nav className="flex-1 py-2 space-y-2 -mx-sm">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  data-active={isActive || undefined}
                  className={cn(
                    `flex items-center gap-3 text-sm font-medium rounded-md px-3 py-2 transition-all group justify-start
                    text-gray-7 dark:text-dark-1 hover:bg-gray-1 dark:hover:bg-dark-6 hover:text-text
                    data-active:bg-primary-light data-active:text-primary-light-color data-active:font-bold
                    data-active:border-e-3 data-active:border-e-primary data-active:rounded-e-none`,
                    {
                      "justify-center aspect-square": sidebarCollapsed,
                    },
                  )}
                >
                  <item.icon
                    stroke={1.5}
                    className={cn(
                      `size-[25px] shrink-0 text-gray-6 dark:text-dark-2 group-hover:text-text
                      group-data-active:text-primary-light-color`,
                    )}
                  />
                  {!sidebarCollapsed && (
                    <p className="origin-left starting:opacity-0 starting:-translate-x-full transition-all">
                      {item.label}
                    </p>
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>
      </Drawer>
    </Box>
  );
};

export default InstructorHeader;
