// components/instructor/InstructorHeader.tsx
import {
  ActionIcon,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  Modal,
  rem,
  ScrollArea,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { IconBell, IconChevronDown, IconSearch } from "@tabler/icons-react";
import { ShoppingCart } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppStore } from "../../../zustand/store";
import ThemeToggler from "../../../components/ThemeToggler";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import AvatarMenu from "../../user/_c/AvatarMenu";
import CustomNavLink from "../../user/_c/CustomNavLink";
import SearchBox from "../../user/_c/SearchBox";

const InstructorHeader = () => {
  const currentUser = useAppStore.use.currentUser();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
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
      className="min-h-[60px] px-md border-b border-gray-300 dark:border-dark-4 bg-white dark:bg-dark-7 sticky top-0
        z-[calc(var(--mantine-z-index-app)+1)] content-center shadow-sm"
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
      <div className="flex items-center justify-between h-full gap-2 md:gap-10">
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
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="md" />
        </Group>
      </div>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        transitionProps={{
          transition: "fade-right",
          duration: 200,
          timingFunction: "ease-out",
        }}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="md"
        zIndex={1000000}
      ></Drawer>
    </Box>
  );
};

export default InstructorHeader;
