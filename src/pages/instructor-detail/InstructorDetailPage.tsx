import {
  Avatar,
  Badge,
  Blockquote,
  Button,
  Container,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import {
  IconBooks,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
  IconExternalLink,
  IconQuote,
  IconStar,
  IconUsers,
} from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import {
  useGetCoursesByInstructorId,
  useGetInstructorById,
} from "../../react-query/instructor/instructorHooks";
import CourseCard from "../home/_c/PopularCourses/CourseCard";

export default function InstructorDetailPage() {
  const { instructorId } = useParams<{ instructorId: string }>();
  const {
    data: instructor,
    isLoading: isInstructorLoading,
    isError: isInstructorError,
  } = useGetInstructorById(instructorId!);
  const { data: courses, isLoading: isCoursesLoading } = useGetCoursesByInstructorId(instructorId!);

  if (isInstructorLoading || !instructor) {
    return <Container py="xl">Loading...</Container>;
  }

  if (isInstructorError) {
    return <Container py="xl">Instructor not found.</Container>;
  }

  return (
    <div>
      {/* Header Section */}
      <div className="relative bg-blue-100 dark:bg-blue-900/10 pb-40">
        <Container size="lg" py="xl" className="relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-[120px] h-[120px]">
              <Avatar
                src={instructor.avatarUrl}
                size={120}
                radius={999}
                className="border-4 border-white dark:border-gray-900 shadow-lg"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <p className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
                Instructor
              </p>
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300">
                {instructor.name}
              </h2>
              <p className="font-medium mt-2">{instructor.professionalTitle}</p>
              <Badge mt="sm" color="blue" variant="light" radius="md">
                Udemy Instructor Partner
              </Badge>

              <div className="flex gap-2 mt-3 justify-center md:justify-start flex-wrap">
                <SocialIcon icon={<IconExternalLink size={18} />} />
                <SocialIcon icon={<IconBrandLinkedin size={18} />} />
                <SocialIcon icon={<IconBrandX size={18} />} />
                <SocialIcon icon={<IconBrandYoutube size={18} />} />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Stats Section */}
      <Container size="lg" className="-mt-20 z-10 relative">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            icon={<IconUsers size={28} />}
            label="Total Students"
            value={instructor.studentCount.toLocaleString()}
            iconColor="text-violet-600"
            iconBg="bg-violet-100"
          />
          <StatCard
            icon={<IconStar size={28} />}
            label="Reviews"
            value={instructor.reviewCount.toLocaleString()}
            iconColor="text-orange-500"
            iconBg="bg-orange-100"
          />
          <StatCard
            icon={<IconBooks size={28} />}
            label="Courses"
            value={instructor.courseCount}
            iconColor="text-blue-600"
            iconBg="bg-blue-100"
          />
        </div>
      </Container>

      {/* About */}
      <Container size="lg" py="xl">
        <Title order={3} mb="md">
          About me
        </Title>
        {instructor.about ? (
          <Text className="leading-relaxed text-md text-gray-800 dark:text-gray-300">
            {instructor.about}
          </Text>
        ) : (
          <Text c="dimmed">This instructor has not written an about section yet.</Text>
        )}

        {instructor.favoriteQuote && (
          <Blockquote
            icon={<IconQuote size={18} />}
            mt="xl"
            color="blue"
            cite={
              instructor.favoriteQuoteCite ? `- ${instructor.favoriteQuoteCite}` : instructor.name
            }
          >
            {instructor.favoriteQuote}
          </Blockquote>
        )}
      </Container>

      {/* Courses */}
      <Container size="lg" pb="xl">
        <Title order={3} my="md">
          Courses by {instructor.name}
        </Title>
        {isCoursesLoading ? (
          <Text>Loading courses...</Text>
        ) : courses?.items.length ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {courses.items.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </SimpleGrid>
        ) : (
          <Text c="dimmed">No published courses yet.</Text>
        )}
      </Container>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  iconColor,
  iconBg,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  iconColor: string;
  iconBg: string;
}) {
  return (
    <Paper
      shadow="md"
      radius="lg"
      p="lg"
      className="bg-white dark:bg-gray-800 text-center flex flex-col items-center"
    >
      <div
        className={`size-14 flex items-center justify-center rounded-full shadow-md mb-4 ${iconBg}`}
      >
        <div className={`${iconColor}`}>{icon}</div>
      </div>
      <Text fw={700} size="xl" className="text-gray-900 dark:text-white">
        {value}
      </Text>
      <Text size="sm" className="text-gray-600 dark:text-gray-400 uppercase tracking-wide mt-1">
        {label}
      </Text>
    </Paper>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <Button variant="outline" color="blue" size="sm" radius="md" px="sm">
      {icon}
    </Button>
  );
}
