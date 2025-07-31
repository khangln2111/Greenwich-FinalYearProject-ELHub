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
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
  IconExternalLink,
  IconPlayerPlay,
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

  if (isInstructorLoading || !instructor) return <Container py="xl">Loading...</Container>;
  if (isInstructorError) return <Container py="xl">Instructor not found.</Container>;

  return (
    <div className="bg-gray-50 dark:bg-body relative">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 pb-20 pt-12 text-white">
        <Container size="lg" className="flex flex-col items-center gap-1 text-center mb-10 px-4">
          <Avatar
            src={instructor.avatarUrl}
            size={150}
            radius={999}
            className="outline-4 outline-white shadow-lg mb-4"
          />
          <p className="text-xs sm:text-sm uppercase tracking-widest">Instructor</p>
          <h1 className="text-2xl sm:text-3xl font-bold">{instructor.name}</h1>
          <p className="text-sm sm:text-lg">{instructor.professionalTitle}</p>
          <Badge mt="sm" color="dark" variant="filled" radius="md">
            ELHub INSTRUCTOR PARTNER
          </Badge>

          <div className="flex gap-2 mt-4 flex-wrap justify-center">
            <SocialIcon icon={<IconExternalLink size={18} />} label="Website" />
            <SocialIcon icon={<IconBrandLinkedin size={18} />} label="LinkedIn" />
            <SocialIcon icon={<IconBrandX size={18} />} label="X" />
            <SocialIcon icon={<IconBrandYoutube size={18} />} label="YouTube" />
          </div>
        </Container>
      </div>

      {/* Stats */}
      <Container size="lg" className="-mt-16 px-4">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
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
            icon={<IconPlayerPlay size={28} />}
            label="Courses"
            value={instructor.courseCount}
            iconColor="text-blue-600"
            iconBg="bg-blue-100"
          />
        </SimpleGrid>
      </Container>

      {/* About */}
      <Container size="lg" pb="xl" pt="xl" className="px-4">
        {instructor.favoriteQuote && (
          <Blockquote
            icon={<IconQuote size={18} />}
            mt="xl"
            color="blue"
            className="max-w-(--container-2xl) mx-auto text-xl text-center dark:bg-blue-900/20 dark:border-blue-500"
            cite={
              instructor.favoriteQuoteCite ? `- ${instructor.favoriteQuoteCite}` : instructor.name
            }
          >
            {instructor.favoriteQuote}
          </Blockquote>
        )}
        <Title order={2} className="mt-15">
          About Me
        </Title>
        {instructor.about ? (
          <Text className="leading-relaxed text-lg text-gray-800 dark:text-gray-300 mt-5">
            {instructor.about}
          </Text>
        ) : (
          <Text c="dimmed">This instructor has not written an about section yet.</Text>
        )}
      </Container>

      {/* Courses */}
      <Container size="lg" pb="xl" className="px-4">
        <Title order={2} my="md">
          Courses by {instructor.name}
        </Title>
        {isCoursesLoading ? (
          <Text>Loading courses...</Text>
        ) : courses?.items.length ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {courses.items.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                className="border border-gray-200 dark:border-gray-800"
              />
            ))}
          </SimpleGrid>
        ) : (
          <Text c="dimmed">No published courses yet.</Text>
        )}
      </Container>
    </div>
  );
}

// Stats Card
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
      radius="lg"
      p="lg"
      className="bg-white dark:bg-dark-6 text-center flex flex-col items-center shadow-md"
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

// Social Button
function SocialIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Button
      variant="white"
      color="dark"
      size="sm"
      radius="md"
      px="sm"
      className="shadow-sm hover:bg-white/10"
      aria-label={label}
    >
      {icon}
    </Button>
  );
}
