import { Badge, Button, Card, Center, Flex, Group, Image, Text } from "@mantine/core";
import {
  IconGasStation,
  IconGauge,
  IconManualGearbox,
  IconUsers,
} from "@tabler/icons-react";
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
      <feature.icon
        size="1.05rem"
        className="mr-[5px] text-gray-5 dark:text-dark-2"
        stroke={1.5}
      />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  return (
    <Card withBorder radius={"2xl"} className="bg-body">
      <Card.Section className="flex items-center justify-center borde-b border-gray-3 dark:border-dark-4 p-0">
        <Image src={CourseImage} alt="Tesla Model S" className="size-auto" />
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

      <Card.Section className="p-md border-t border-gray-3 dark:border-dark-4" mt="md">
        <Text
          fz="sm"
          c="dimmed"
          className="mb-xs leading-[1] font-bold text-xs tracking-[-0.25px] uppercase"
        >
          Basic configuration
        </Text>

        <Group gap={8} mb={-8}>
          {features}
        </Group>
      </Card.Section>

      <Card.Section className="p-md border-t border-gray-3 dark:border-dark-4">
        <Flex direction="row" align="center" gap={{ base: "10", lg: "30" }}>
          <div>
            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
              $168.00
            </Text>
          </div>
          <Button style={{ flex: 1 }}>Add to cart</Button>
        </Flex>
      </Card.Section>
    </Card>
  );
};

export default CourseCard;
