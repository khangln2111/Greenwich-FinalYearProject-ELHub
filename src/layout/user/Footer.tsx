import { ActionIcon, Container, Group, Text } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from "@tabler/icons-react";

const data = [
  {
    title: "About",
    links: [
      { label: "Features", link: "#" },
      { label: "Pricing", link: "#" },
      { label: "Support", link: "#" },
      { label: "Forums", link: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Contribute", link: "#" },
      { label: "Media assets", link: "#" },
      { label: "Changelog", link: "#" },
      { label: "Releases", link: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Join Discord", link: "#" },
      { label: "Follow on Twitter", link: "#" },
      { label: "Email newsletter", link: "#" },
      { label: "GitHub discussions", link: "#" },
    ],
  },
];

const Footer = () => {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
        className="block text-gray-7/80 dark:text-dark-1 text-sm md:text-sm/relaxed py-[3px] hover:underline"
      >
        {link.label}
      </Text>
    ));

    return (
      <div key={group.title} className="w-[160px]">
        <Text
          className="text-lg font-bold font-[Greycliff_CF,_var(--mantine-font-family)] mb-[5px] text-black
            dark:text-white"
        >
          {group.title}
        </Text>
        {links}
      </div>
    );
  });

  return (
    <footer className="mt-auto pt-[64px] bg-gray-0 dark:bg-dark-6 border-t border-gray-2 dark:border-dark-5">
      <Container className="flex flex-col items-center lg:flex-row lg:justify-between lg:items-normal">
        {/* Logo & Description */}
        <div className="max-w-[200px] flex flex-col items-center lg:block">
          <MantineLogo size={30} />
          <Text size="xs" c="dimmed" className="mt-[10px] text-center lg:mt-[5px] lg:text-left">
            Build fully functional accessible web applications faster than ever
          </Text>
        </div>

        {/* Groups (ẩn trên mobile) */}
        <div className="hidden lg:flex lg:flex-wrap">{groups}</div>
      </Container>

      <Container
        className="flex flex-col items-center justify-between mt-[32px] py-[32px] border-t border-gray-2
          dark:border-dark-4 lg:flex-row"
      >
        <Text c="dimmed" size="sm">
          © 2020 mantine.dev. All rights reserved.
        </Text>
        <Group gap={0} className="mt-[10px] lg:mt-0" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter className="size-[18px]" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube className="size-[18px]" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram className="size-[18px]" stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
};

export default Footer;
