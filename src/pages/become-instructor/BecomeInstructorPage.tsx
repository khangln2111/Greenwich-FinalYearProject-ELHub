import {
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Breadcrumbs,
  Anchor,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../zustand/store";
import { BookOpenIcon, DollarSignIcon, RocketIcon, UsersIcon } from "lucide-react";
import piggyBank from "../../assets/becomeInstructorImages/piggy-bank.svg";
import onlineClass from "../../assets/becomeInstructorImages/online-class.svg";
import communityLove from "../../assets/becomeInstructorImages/community-love.svg";

const benefits = [
  {
    icon: <DollarSignIcon size={24} />,
    title: "Earn Money",
    description: "Monetize your expertise and get paid for every student who enrolls.",
  },
  {
    icon: <RocketIcon size={24} />,
    title: "Grow Your Brand",
    description: "Build your reputation and become a known expert in your field.",
  },
  {
    icon: <BookOpenIcon size={24} />,
    title: "Share Knowledge",
    description: "Make an impact by educating learners all around the world.",
  },
  {
    icon: <UsersIcon size={24} />,
    title: "Build Community",
    description: "Connect with students and foster a learning environment.",
  },
];

const discoverItems = [
  {
    icon: piggyBank,
    title: "Earn Money",
    description:
      "Earn money every time a student purchases your course. Get paid monthly through PayPal or Payoneer, it’s your choice.",
  },
  {
    icon: onlineClass,
    title: "Inspire Students",
    description:
      "Help people learn new skills, advance their careers, and explore their hobbies by sharing your knowledge.",
  },
  {
    icon: communityLove,
    title: "Join Our Community",
    description:
      "Take advantage of our active community of instructors to help you through your course creation process.",
  },
];

const InstructorIntroPage = () => {
  const navigate = useNavigate();
  const currentUser = useAppStore.use.currentUser();

  const handleGetStarted = () => {
    if (!currentUser) {
      navigate("/login", { state: { from: "/become-an-instructor" } });
    } else if (currentUser.roles.includes("Instructor")) {
      navigate("/instructor/dashboard");
    } else {
      navigate("/instructor/become");
    }
  };

  const breadcrumbItems = [
    { title: "Home", href: "/" },
    { title: "Become an Instructor", href: "/become-instructor" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index} c="dimmed" size="sm">
      {item.title}
    </Anchor>
  ));

  return (
    <>
      {/* ✅ BANNER SECTION */}
      <div className="relative bg-gradient-to-b from-gray-50 to-[#eef1fd] py-20 mb-8">
        <Container size="lg" className="text-center">
          <Title className="text-5xl font-extrabold tracking-tight mb-6 text-gray-900">
            Become an Instructor
          </Title>
          <div className="flex justify-center">
            <Breadcrumbs separator="›" className="text-sm text-gray-500">
              {breadcrumbItems}
            </Breadcrumbs>
          </div>
        </Container>
      </div>

      {/* ✅ DISCOVER SECTION */}
      <div className="py-20 bg-white">
        <Container size="lg">
          <Stack align="center" className="text-center mb-16">
            <Title order={2} className="text-4xl font-bold tracking-tight">
              Discover Your Potential
            </Title>
            <Text size="lg" c="dimmed" maw={700}>
              During this era, online learning unexpectedly increased. The single person relay on
              the internet to learning somethings!
            </Text>
          </Stack>

          <Grid gutter="xl">
            {discoverItems.map((item, index) => (
              <Grid.Col key={index} span={{ base: 12, md: 4 }}>
                <Stack align="center" className="text-center px-4">
                  <img src={item.icon} alt={item.title} className="w-16 h-16 mb-4" />
                  <Title order={4} className="font-semibold">
                    {item.title}
                  </Title>
                  <Text c="dimmed">{item.description}</Text>
                </Stack>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </div>

      {/* ✅ MAIN CONTENT */}
      <div className="py-12">
        <Container size="lg">
          <Stack align="center" className="text-center mx-auto mb-12">
            <Title order={2} className="text-4xl font-bold tracking-tight">
              Discover Your Potential
            </Title>
            <Text size="lg" c="dimmed">
              Join our global instructor community and turn your knowledge into opportunity.
            </Text>
            <Button size="md" radius="xl" onClick={handleGetStarted}>
              Get Started
            </Button>
          </Stack>

          <Grid gutter="xl">
            {benefits.map((item, index) => (
              <Grid.Col key={index} span={{ base: 12, md: 6 }}>
                <Paper withBorder radius="md" p="lg" className="h-full">
                  <Stack gap="xs">
                    <ThemeIcon variant="light" size="lg" color="blue" radius="xl">
                      {item.icon}
                    </ThemeIcon>
                    <Title order={4}>{item.title}</Title>
                    <Text c="dimmed">{item.description}</Text>
                  </Stack>
                </Paper>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default InstructorIntroPage;
