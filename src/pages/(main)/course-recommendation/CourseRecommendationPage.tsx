import { Container, Title } from "@mantine/core";
import CourseChat from "../../../components/CourseChat/CourseChat";

export default function CourseRecommendationPage() {
  return (
    <Container size="lg" className="h-screen flex flex-col py-8">
      <Title order={2} className="text-center mb-6">
        Find Your Perfect Courses
      </Title>
      <div className="flex-1">
        <CourseChat />
      </div>
    </Container>
  );
}
