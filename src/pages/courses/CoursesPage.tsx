import {
  Accordion,
  Checkbox,
  Chip,
  Divider,
  Flex,
  Grid,
  Group,
  Pagination,
  Paper,
  Select,
  SimpleGrid,
  Slider,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconFilterCog } from "@tabler/icons-react";
import CourseCard from "../home/components/PopularCourses/CourseCard";
import { useState } from "react";

const CoursesPage = () => {
  const [value, setValue] = useState<string[]>(["Apple", "Banana"]);

  return (
    <Paper
      className="bg-gray-1 dark:bg-dark-6"
      radius={0}
      px={{ base: "15px", md: "20px", lg: "40px", xl: "90px" }}
      py="xl"
    >
      <Grid py="md" gutter="xl">
        <Grid.Col visibleFrom="lg" span={2.8}>
          <Paper py="lg" px="sm" withBorder radius="md" shadow="md">
            <Group align="center">
              <IconFilterCog />
              <Title order={3} fw={700}>
                Advanced filters
              </Title>
            </Group>
            {/* stretching divider to take up all the horizontal space */}
            <Divider my="lg" mx="-sm" />
            {/* Price Range Filter */}
            <Stack>
              <Text fw={500} size="sm" mb={5}>
                Price Range:
              </Text>
              <Slider
                min={0}
                max={100}
                step={1}
                marks={[
                  { value: 0, label: "$0" },
                  { value: 100, label: "$100" },
                ]}
              />
            </Stack>

            <Divider my="xl" />

            {/* Duration Filter */}
            <Stack mb="xl">
              <Text fw={500} size="sm" mb={5}>
                Duration (minutes):
              </Text>
              <Slider
                min={0}
                max={120}
                step={1}
                marks={[
                  { value: 0, label: "0" },
                  { value: 120, label: "120" },
                ]}
              />
            </Stack>

            <Divider my="xl" />

            {/* Category Filter */}
            <Stack>
              <Text fw={500} size="sm" mb={5}>
                Category
              </Text>
              <Select placeholder="Select category" />
            </Stack>

            <Divider my="xl" />

            {/* Rating Filter */}
            <Checkbox label="Show only high-rated items" />

            <Accordion
              my="lg"
              mx="-sm"
              multiple
              value={value}
              onChange={setValue}
              transitionDuration={400}
            >
              <Accordion.Item value="Price range">
                <Accordion.Control>
                  <Text fw={500} size="sm" mb={5}>
                    Price Range
                  </Text>
                </Accordion.Control>
                <Accordion.Panel my="50">
                  <Select placeholder="Select category" />
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="Apple">
                <Accordion.Control>
                  <Text fw={500} size="sm" mb={5}>
                    Apple
                  </Text>
                </Accordion.Control>
                <Accordion.Panel>
                  Crisp and refreshing fruit. Apples are known for their versatility and nutritional
                  benefits. They come in a variety of flavors and are great for snacking, baking, or
                  adding to salads
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="Banana">
                <Accordion.Control>
                  <Text fw={500} size="sm" mb={5}>
                    Banana
                  </Text>
                </Accordion.Control>
                <Accordion.Panel>
                  Crisp and refreshing fruit. Apples are known for their versatility and nutritional
                  benefits. They come in a variety of flavors and are great for snacking, baking, or
                  adding to salads
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Paper>
        </Grid.Col>
        <Grid.Col span="auto">
          <Group justify="space-between">
            <Title order={2}>Courses List</Title>
            {/* //Sort by */}
            <Group align="center">
              <Text c="dimmed">Sort by:</Text>
              <Chip defaultChecked variant="outline">
                Popularity
              </Chip>
              <Chip defaultChecked variant="outline">
                Price (low to high)
              </Chip>
              <Chip defaultChecked variant="outline">
                Price (high to low)
              </Chip>
            </Group>
          </Group>
          <SimpleGrid cols={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing="md" my={25}>
            {/* Courses Card */}
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </SimpleGrid>
          <Flex justify="center" mt="50">
            <Pagination total={10} withEdges />
          </Flex>
        </Grid.Col>
      </Grid>
      {/* Pagination */}
    </Paper>
  );
};
export default CoursesPage;
