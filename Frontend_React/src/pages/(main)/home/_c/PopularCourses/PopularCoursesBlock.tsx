import { Anchor, Button, Group, SimpleGrid, Text, Title } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router";
import CourseCard from "../../../../../components/course-cards/CourseCard";
import CourseCardSkeleton from "../../../../../components/course-cards/CourseCardSkeleton";
import { useGetPublishedCourses } from "../../../../../features/course/course.hooks";
import HomePageBlockWrapper from "../HomePageBlockWrapper";

const PopularCoursesBlock = () => {
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
    <HomePageBlockWrapper className="bg-[#F8F8FF] dark:bg-zinc-950">
      <Group justify="space-between" data-aos="fade-up">
        <Title order={2} className="dark:text-white text-3xl">
          Popular Courses
        </Title>
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
      <Text c="dimmed" mt="md" data-aos="fade-up" data-aos-delay={200}>
        Several popular categories of courses are available on the platform. You can choose from a
        variety of categories to learn from.
      </Text>
      {/* Auto column grid */}

      <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl" className="mt-6">
        {isPending
          ? Array.from({ length: 6 }).map((_, index) => <CourseCardSkeleton key={index} />)
          : courses.items.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                data-aos="zoom-in-down"
                data-aos-delay={100 + index * 100}
                className="shadow-xl border"
                component={Link}
                to={`/courses/${course.id}`}
              />
            ))}
      </SimpleGrid>

      <Button
        variant="gradient"
        gradient={{ from: "pink", to: "yellow" }}
        fullWidth
        className="mt-15 max-w-[200px] mx-auto"
        radius={40}
        component={Link}
        to="/courses"
        data-aos="zoom-in-up"
      >
        View all courses
      </Button>
    </HomePageBlockWrapper>
  );
};
export default PopularCoursesBlock;
