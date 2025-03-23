import { Badge, Group, Title, Text, Card, SimpleGrid, Container } from "@mantine/core";
import { IconGauge, IconUser, IconCookie } from "@tabler/icons-react";

const mockdata = [
  {
    title: "Extreme performance",
    description:
      "This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit",
    icon: IconGauge,
  },
  {
    title: "Privacy focused",
    description:
      "People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma",
    icon: IconUser,
  },
  {
    title: "No third parties",
    description:
      "They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves",
    icon: IconCookie,
  },
];

const Features = () => {
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className="border border-gray-1 dark:border-dark-5"
      padding="xl"
    >
      <feature.icon stroke={2} className="text-primary-6 size-[50px]" />
      <Text fz="lg" fw={500} mt="md">
        {feature.title}
        <div className="bg-primary-filled w-[45px] h-[2px] mt-sm"></div>
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container mb="100">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          Best company ever
        </Badge>
      </Group>

      <Title
        order={2}
        className="text-[24px] lg:text-[34px] font-black"
        ta="center"
        mt="sm"
      >
        Integrate effortlessly with any technology stack
      </Title>

      <Text c="dimmed" className="m-auto max-w-[600px]" ta="center" mt="md">
        Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens
        when hunger drives it to try biting a Steel-type Pokémon.
      </Text>
      <div className="bg-primary-filled w-[45px] h-[2px] mt-sm mx-auto"></div>

      <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
};

export default Features;
