import {
  ActionIcon,
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  HoverCard,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import {
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconNotification,
} from "@tabler/icons-react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggler from "../../components/ThemeToggler";
import CustomNavLink from "./CustomNavLink";

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
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

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
      <Group justify="space-between" h="100%">
        <Link
          to="/"
          className="no-underline select-none flex items-center text-black dark:text-white"
        >
          <MantineLogo color="primary" size={30} />
        </Link>

        {/* Nav links (desktop) */}
        <Group h="100%" gap={0} visibleFrom="md">
          <CustomNavLink to="/">Home</CustomNavLink>
          <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
            <HoverCard.Target>
              <CustomNavLink to="/">
                <div className="inline-flex items-center">
                  <Box component="span" className="mr-[5px]">
                    Features
                  </Box>
                  <IconChevronDown className="size-[16px] text-blue-6" />
                </div>
              </CustomNavLink>
            </HoverCard.Target>

            <HoverCard.Dropdown className="overflow-hidden">
              <Group justify="space-between" px="md">
                <Text fw={500}>Features</Text>
                <Anchor href="#" fz="xs">
                  View all
                </Anchor>
              </Group>

              <Divider my="sm" />

              <SimpleGrid cols={2} spacing={0}>
                {links}
              </SimpleGrid>

              <div className="bg-gray-0 dark:bg-gray-7 border-t border-gray-1 dark:border-dark-5 -m-md mt-sm p-xl pb-xl">
                <Group justify="space-between">
                  <div>
                    <Text fw={500} fz="sm">
                      Get started
                    </Text>
                    <Text size="xs" c="dimmed">
                      Their food sources have decreased, and their numbers
                    </Text>
                  </div>
                  <Button variant="default">Get started</Button>
                </Group>
              </div>
            </HoverCard.Dropdown>
          </HoverCard>
          <CustomNavLink to="/">Learn</CustomNavLink>
          <CustomNavLink to="/">Academy</CustomNavLink>
        </Group>

        <Group visibleFrom="md">
          <Button variant="default" to="/login" component={Link}>
            Log in
          </Button>
          <Button to="/register" component={Link}>
            Sign up
          </Button>
          <ThemeToggler />
          <ActionIcon variant="default" size="lg" aria-label="Shopping cart trigger">
            <ShoppingCart size={19} strokeWidth={1.5} />
          </ActionIcon>
        </Group>

        <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="md" />
      </Group>

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

          <CustomNavLink to="/">Home</CustomNavLink>
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
            <Button variant="default">Log in</Button>
            <Button to="/register" component={Link}>
              Sign up
            </Button>
            <ThemeToggler />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default Header;
