import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
  Box,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import image from "../../../../assets/homePageImages/HeroImage-transformed.webp";

const Hero = () => {
  return (
    <Container>
      <Box className="flex justify-center py-[calc(var(--mantine-spacing-xl)*4)]">
        <Box className="mr-0 max-w-full md:mr-[calc(var(--mantine-spacing-xl)*3)] md:max-w-[480px]">
          <Title
            className="font-['Greycliff_CF',var(--mantine-font-family)] text-[28px] leading-[1.2]
              font-extrabold text-black md:text-[44px] dark:text-white"
          >
            A{" "}
            <span className="bg-primary-light relative rounded-sm px-[12px] py-[4px]">
              modern
            </span>{" "}
            E-learning <br /> platform
          </Title>
          <Text c="dimmed" mt="md">
            Build fully functional accessible web applications faster than ever
            – Mantine includes more than 120 customizable components and hooks
            to cover you in any situation
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Project based</b> – build type safe applications, all
              components and hooks export types
            </List.Item>
            <List.Item>
              <b>Affordable and economy</b> – all packages have MIT license, you
              can use Mantine in any project
            </List.Item>
            <List.Item>
              <b>No annoying focus ring</b> – focus ring will appear only when
              user navigates with keyboard
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="md" className="flex-1 sm:flex-initial">
              Get started
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className="flex-1 sm:flex-initial"
            >
              Source code
            </Button>
          </Group>
        </Box>
        <Image
          src={image}
          className="hidden h-auto w-full md:block md:h-[356px] md:w-[376px]"
        />
      </Box>
    </Container>
  );
};

export default Hero;
