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
  Indicator,
  Modal,
  ScrollArea,
  Text,
  ThemeIcon,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import {
  IconBell,
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconNotification,
  IconSearch,
} from "@tabler/icons-react";
import { MenuIcon, PanelRightCloseIcon, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ThemeToggler from "../../components/ThemeToggler";
import { useGetCart } from "../../react-query/cart/cartHooks";
import { useAppStore } from "../../zustand/store";
import AvatarMenu from "./_c/AvatarMenu";
import CustomNavLink from "./_c/CustomNavLink";
import SearchBox from "./_c/SearchBox";

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

const Header = () => {
  const currentUser = useAppStore.use.currentUser();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const [mobileSearchOpened, { open: openMobileSearch, close: closeMobileSearch }] =
    useDisclosure(false);
  // get search value from url
  const [searchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");
  const navigate = useNavigate();

  const { data: cart } = useGetCart();

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const links = mockdata.map((item) => (
    <UnstyledButton
      className="px-md py-xs dark:hover:bg-dark-7 w-full rounded-md hover:bg-gray-50"
      key={item.title}
    >
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon className="size-[22px] text-blue-6" />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={600}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box
      component="header"
      className="min-h-[60px] px-md border-b border-gray-300 dark:border-dark-4 bg-white dark:bg-dark-7 sticky top-0
        z-[calc(var(--mantine-z-index-app)+1)] content-center shadow-sm"
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
      {/* Logo */}
      <div className="flex items-center justify-between h-full gap-2 md:gap-6 lg:gap-10">
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

        {/* Nav links (desktop) */}
        <div className="flex flex-1 justify-center items-center visible-from-md">
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
          <ActionIcon
            onClick={openMobileSearch}
            className="md:hidden"
            variant="default"
            size="lg"
            aria-label="Open search"
          >
            <IconSearch size={20} />
          </ActionIcon>
          <ActionIcon
            variant="default"
            size="lg"
            aria-label="Notification trigger"
            visibleFrom="md"
          >
            <IconBell size={19} strokeWidth={1.5} />
          </ActionIcon>
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
          {/* <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="lg" /> */}
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
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <CustomNavLink component={Link} to="/">
            Home
          </CustomNavLink>
          <CustomNavLink onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown className="size-[16px] text-primary-6" />
            </Center>
          </CustomNavLink>
          <Collapse in={linksOpened}>{links}</Collapse>
          <CustomNavLink to="/">Learn</CustomNavLink>
          <CustomNavLink to="/">Academy</CustomNavLink>

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
