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
import { Link, useParams } from "react-router";
import {
  useGetCoursesByInstructorId,
  useGetInstructorById,
} from "../../../features/instructor/instructor.hooks";
import CourseCard from "../../../components/course-cards/CourseCard";
import avatarPlaceholder from "../../../assets/placeholder/profile-avatar-placeholder.svg";
import { usePageSEO } from "../../../hooks/usePageSEO";

export default function InstructorDetailPage() {
  const { instructorId } = useParams<{ instructorId: string }>();
  const {
    data: instructor,
    isLoading: isInstructorLoading,
    isError: isInstructorError,
  } = useGetInstructorById(instructorId!);

  usePageSEO({
    title: instructor ? `${instructor.name}, ${instructor.professionalTitle}` : "Instructor",
  });
  const { data: courses, isLoading: isCoursesLoading } = useGetCoursesByInstructorId(instructorId!);

  if (isInstructorLoading || !instructor) return <Container py="xl">Loading...</Container>;
  if (isInstructorError) return <Container py="xl">Instructor not found.</Container>;

  return (
    <div className="bg-gray-50 dark:bg-body pb-20">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-12 md:pb-20 text-white">
        <Container
          size="lg"
          className="flex flex-col items-center justify-center gap-1 text-center md:pb-13 px-4"
        >
          <Avatar
            src={instructor.avatarUrl || avatarPlaceholder}
            size={150}
            radius={999}
            className="outline-4 outline-white shadow-lg mb-4"
            name={instructor.name}
          />
          <p className="text-xs sm:text-sm uppercase tracking-widest">Instructor</p>
          <h1 className="text-2xl sm:text-3xl font-bold">{instructor.name}</h1>
          <p className="text-sm sm:text-lg">{instructor.professionalTitle}</p>
          <p className="text-xs sm:text-sm tracking-widest">{instructor.email}</p>
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
      <Container size="lg" className="px-4 pt-14 md:-translate-y-1/2 md:pt-0">
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

      {/* Content */}
      <Container size="lg" className="px-4 mt-18 md:mt-0 space-y-15">
        {/* quote */}
        {instructor.favoriteQuote && (
          <Blockquote
            icon={<IconQuote size={18} />}
            color="blue"
            className="max-w-2xl mx-auto text-xl text-center dark:bg-blue-900/20 dark:border-blue-500"
            cite={
              instructor.favoriteQuoteCite ? `- ${instructor.favoriteQuoteCite}` : instructor.name
            }
          >
            {instructor.favoriteQuote}
          </Blockquote>
        )}
        {/* about me */}
        <div className="space-y-2 text-justify">
          <Title order={2}>About Me</Title>
          {instructor.about ? (
            <Text className="leading-relaxed text-lg text-gray-800 dark:text-gray-300">
              {instructor.about}
            </Text>
          ) : (
            <Text c="dimmed">This instructor has not written an about section yet.</Text>
          )}
        </div>

        {/* courses */}
        <div className="space-y-3">
          <Title order={2}>Courses by {instructor.name}</Title>
          {isCoursesLoading ? (
            <Text>Loading courses...</Text>
          ) : courses?.items.length ? (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
              {courses.items.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  className="border border-gray-200 dark:border-gray-800"
                  component={Link}
                  to={`/courses/${course.id}`}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Text c="dimmed">No published courses yet.</Text>
          )}
        </div>
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
