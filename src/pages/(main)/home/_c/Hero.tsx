import { Button, Container, Image, List, Text, ThemeIcon, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import image1 from "../../../../assets/homePageImages/HeroImage2.png";
import { Link } from "react-router";

const Hero = () => {
  return (
    <Container size="lg">
      <div className="mx-auto items-center grid grid-cols-1 lg:grid-cols-2 gap-10 py-[50px]">
        <div className="mr-0">
          <Title
            className="text-black dark:text-white font-['Greycliff_CF',var(--mantine-font-family)] leading-[1.2] font-black
              text-[28px] md:text-[44px]"
          >
            A{" "}
            <span className="relative bg-primary-light rounded-sm py-[4px] px-[12px]">modern</span>{" "}
            E-learning <br /> platform
          </Title>
          <Text c="dimmed" mt="md">
            Build fully functional accessible web applications faster than ever – Mantine includes
            more than 120 customizable components and hooks to cover you in any situation
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck size={12} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Project based</b> – build type safe applications, all components and hooks export
              types
            </List.Item>
            <List.Item>
              <b>Affordable and economy</b> – all packages have MIT license, you can use Mantine in
              any project
            </List.Item>
            <List.Item>
              <b>No annoying focus ring</b> – focus ring will appear only when user navigates with
              keyboard
            </List.Item>
          </List>

          {/* <Group mt={30}>
            <Button size="md" className="flex-1 md:flex-initial">
              Get started
            </Button>
            <Button variant="default" size="md" className="flex-1 md:flex-initial">
              Source code
            </Button>
          </Group> */}
          <div className="grid grid-cols-2 md:grid-cols-[min-content_min-content] gap-md mt-[30px]">
            <Button size="md" component={Link} to="/courses" className="flex-1">
              Get started
            </Button>
            <Button variant="default" size="md">
              Help
            </Button>
          </div>
        </div>
        <Image src={image1} alt="" width={800} height={800} className="hidden lg:block mx-auto" />
      </div>
    </Container>
  );
};

export default Hero;
