import { Title, ThemeIcon, Text, Divider, AspectRatio, Paper } from "@mantine/core";
import { AwardIcon, ArrowRight } from "lucide-react";
import { CourseDetailVm } from "../../../../react-query/course/course.types";

type AdminCourseOverviewTabProps = {
  course: CourseDetailVm;
};

const AdminCourseOverviewTab = ({ course }: AdminCourseOverviewTabProps) => {
  return (
    <div>
      <Title order={2} className="mb-6">
        About the course
      </Title>

      {/* Preview Media Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Course Image */}
        <Paper withBorder shadow="sm" radius="lg" className="overflow-hidden">
          <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
        </Paper>

        {/* Promo Video if available */}
        {course.promoVideoUrl && (
          <AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden">
            <video
              src={course.promoVideoUrl}
              controls
              className="w-full h-full rounded-lg object-cover"
            />
          </AspectRatio>
        )}
      </div>

      {/* Description */}
      <div>
        <Text className="text-lg leading-relaxed">{course.description}</Text>
      </div>

      {/* Learning Outcomes Section */}
      {course.learningOutcomes && course.learningOutcomes.length > 0 && (
        <div className="mt-10">
          <Divider my="lg" />
          <Title order={3}>What you'll learn in this course</Title>
          <Text className="mt-2 text-lg">
            This course is designed to help you develop the following skills and knowledge:
          </Text>
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {course.learningOutcomes.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-lg font-medium normal-case leading-relaxed"
              >
                <ThemeIcon size="md" radius="2xl" variant="light">
                  <AwardIcon className="size-[70%]" />
                </ThemeIcon>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Prerequisites Section */}
      {course.prerequisites && course.prerequisites.length > 0 && (
        <div className="mt-10">
          <Divider my="lg" />
          <Title order={3}>What you need before starting</Title>
          <Text className="mt-2 text-lg">
            To get the most out of this course, it helps to have some background knowledge or
            skills:
          </Text>
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {course.prerequisites.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-lg font-medium normal-case leading-relaxed"
              >
                <ThemeIcon size="md" radius="2xl" variant="light">
                  <ArrowRight className="size-[70%]" />
                </ThemeIcon>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminCourseOverviewTab;
