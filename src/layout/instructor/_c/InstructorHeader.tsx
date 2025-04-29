// components/instructor/InstructorHeader.tsx
import { ActionIcon, Box, Button, Drawer, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBell, IconSearch } from "@tabler/icons-react";
import { PanelLeftCloseIcon, PanelRightCloseIcon, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ThemeToggler from "../../../components/ThemeToggler";
import { useAppStore } from "../../../zustand/store";
import AvatarMenu from "../../user/_c/AvatarMenu";
import SearchBox from "../../user/_c/SearchBox";

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
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="lg"
        zIndex={1000000}
      ></Drawer>
    </Box>
  );
};

export default InstructorHeader;
