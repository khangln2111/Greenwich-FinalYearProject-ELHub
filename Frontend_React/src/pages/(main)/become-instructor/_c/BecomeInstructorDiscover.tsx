import { Container, Grid, Stack, Text, Title } from "@mantine/core";
import piggyBank from "../../../../assets/becomeInstructorImages/piggy-bank.svg";
import onlineClass from "../../../../assets/becomeInstructorImages/online-class.svg";
import communityLove from "../../../../assets/becomeInstructorImages/community-love.svg";

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

const BecomeInstructorDiscover = () => {
  return (
    <div className="py-20">
      <Container size="lg">
        <Stack align="center" className="text-center mb-16">
          <Title
            order={2}
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Discover Your Potential
          </Title>
          <Text size="lg" className="text-gray-600 dark:text-gray-400" maw={700}>
            During this era, online learning unexpectedly increased. The single person relay on the
            internet to learning somethings!
          </Text>
        </Stack>

        <Grid gutter="xl">
          {discoverItems.map((item, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 4 }}>
              <Stack align="center" className="text-center px-4">
                <img src={item.icon} alt={item.title} className="w-16 h-16 mb-4" />
                <Title order={4} className="font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </Title>
                <Text className="text-gray-600 dark:text-gray-400">{item.description}</Text>
              </Stack>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default BecomeInstructorDiscover;
