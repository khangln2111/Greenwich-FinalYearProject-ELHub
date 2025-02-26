import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Center,
  Button,
  Flex,
} from "@mantine/core";
import {
  IconGasStation,
  IconGauge,
  IconManualGearbox,
  IconUsers,
} from "@tabler/icons-react";
import classes from "./CourseCard.module.css";
import CourseImage from "../../../../assets/react-course-image.svg";

const mockdata = [
  { label: "4 passengers", icon: IconUsers },
  { label: "100 km/h in 4 seconds", icon: IconGauge },
  { label: "Automatic gearbox", icon: IconManualGearbox },
  { label: "Electric", icon: IconGasStation },
];

const CourseCard = () => {
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  return (
    <Card withBorder radius="lg" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src={CourseImage} alt="Tesla Model S" />
      </Card.Section>

      <Group justify="space-between" mt="md">
        <div>
          <Text fw={500}>Tesla Model S</Text>
          <Text fz="xs" c="dimmed">
            Free recharge at any station
          </Text>
        </div>
        <Badge variant="outline">25% off</Badge>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Basic configuration
        </Text>

        <Group gap={8} mb={-8}>
          {features}
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Flex direction="row" align="center" gap={{ base: "10", lg: "30" }}>
          <div>
            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
              $168.00
            </Text>
          </div>
          <Button radius="xl" style={{ flex: 1 }} color="primary.5">
            Add to cart
          </Button>
        </Flex>
      </Card.Section>
    </Card>
  );
};

export default CourseCard;
