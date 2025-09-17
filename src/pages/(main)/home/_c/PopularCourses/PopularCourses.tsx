import { Anchor, Group, SimpleGrid, Text, Title } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router";
import CourseCard from "../../../../../components/course-cards/CourseCard";
import CourseCardSkeleton from "../../../../../components/course-cards/CourseCardSkeleton";
import { useGetPublishedCourses } from "../../../../../features/course/course.hooks";
import HomePageSectionWrapper from "../HomePageSectionWrapper";

const PopularCourses = () => {
  const {
    data: courses,
    isPending,
    isError,
  } = useGetPublishedCourses({
    page: 1,
    pageSize: 6,
    orderBy: {
      field: "enrollmentCount",
      direction: "desc",
    },
  });

  if (isError) return <div>Failed to load courses</div>;

  return (
    <HomePageSectionWrapper>
      <Group justify="space-between">
        <Title order={1}>Popular Courses</Title>
        <Anchor
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
      </Group>
      <Text c="dimmed" mt="md">
        Several popular categories of courses are available on the platform. You can choose from a
        variety of categories to learn from.
      </Text>
      {/* Auto column grid */}

      <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg" my={25}>
        {isPending
          ? Array.from({ length: 6 }).map((_, index) => <CourseCardSkeleton key={index} />)
          : courses.items.map((course) => (
              <CourseCard key={course.id} course={course} className="border" />
            ))}
      </SimpleGrid>
    </HomePageSectionWrapper>
  );
};
export default PopularCourses;
