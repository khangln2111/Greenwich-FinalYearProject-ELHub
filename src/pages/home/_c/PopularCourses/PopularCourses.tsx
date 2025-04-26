import {
  ActionIcon,
  Anchor,
  Button,
  Container,
  Group,
  Modal,
  rem,
  ScrollArea,
  SimpleGrid,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowRight, IconAt, IconX } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";

const PopularCourses = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>Modal with scroll</p>);

  return (
    <Container className="mb-64" size="lg">
      <Group justify="space-between">
        <Title order={1}>Popular Courses</Title>
        <Anchor
          c="blue"
          fz="lg"
          underline="hover"
          fw={600}
          gradient={{ from: "pink", to: "yellow" }}
          className="flex items-center text-center"
          to="/courses"
          component={Link}
        >
          View more courses
          <IconArrowRight size="1.2rem" style={{ marginLeft: 5 }} />
        </Anchor>
        {/* <p className="font-bold text-xl text-blue-500 font-[Poppins]">
          View all courses
        </p> */}
      </Group>
      <Text c="dimmed" mt="md">
        Several popular categories of courses are available on the platform. You can choose from a
        variety of categories to learn from.
      </Text>
      {/* Auto column grid */}

      <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg" my={25}>
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </SimpleGrid>

      {/* <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg" my={25}>
        <TestCard />
        <TestCard />
        <TestCard />
        <TestCard />
        <TestCard />
        <TestCard />
      </SimpleGrid> */}
      {/* beautiful button to view all courses */}
      <Button
        variant="gradient"
        gradient={{ from: "pink", to: "yellow" }}
        fullWidth
        style={{ maxWidth: 200, margin: "0 auto" }}
        radius={40}
        onClick={open}
      >
        View all courses
      </Button>

      <Modal.Root
        opened={opened}
        onClose={close}
        centered
        classNames={{ content: "flex flex-col" }}
        size="100%"
        transitionProps={{
          transition: "fade",
          duration: 400,
          timingFunction: "linear",
        }}
      >
        <Modal.Overlay />
        <Modal.Content>
          {/* Header */}
          <Group justify="space-between" className="border-b-2 p-3">
            <Title order={1}>All Courses</Title>
            <ActionIcon radius="lg" variant="default" size="md" onClick={close}>
              <IconX size={20} stroke={1.5} />
            </ActionIcon>
          </Group>
          {/* Scrollable Content */}
          <ScrollArea.Autosize
            classNames={{
              root: "flex-grow",
              viewport: "p-4",
            }}
          >
            {content}
          </ScrollArea.Autosize>
          {/* Footer */}
          <Group justify="flex-end" className="border-t-2 p-4 space-x-0.">
            <Button variant="gradient" gradient={{ from: "pink", to: "yellow" }}>
              Save
            </Button>
            <Button variant="light" color="red" onClick={close}>
              Close
            </Button>
          </Group>
        </Modal.Content>
      </Modal.Root>
    </Container>
  );
};
export default PopularCourses;
