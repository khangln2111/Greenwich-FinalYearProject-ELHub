import { Paper, Text, ThemeIcon, Title } from "@mantine/core";
import DOMPurify from "dompurify";
import { ArrowRight, AwardIcon, InfoIcon } from "lucide-react";
import { CourseDetailVm } from "../../../../features/course/course.types";

type AdminCourseOverviewTabProps = {
  course: CourseDetailVm;
};

const EmptyState = ({ message }: { message: string }) => (
  <Paper
    p="md"
    radius="md"
    className="flex items-center gap-3 bg-gray-50 dark:bg-dark-6 border border-dashed border-gray-300
      dark:border-gray-700"
  >
    <ThemeIcon variant="light" color="gray" radius="xl">
      <InfoIcon size={18} />
    </ThemeIcon>
    <Text size="sm" c="dimmed">
      {message}
    </Text>
  </Paper>
);

const AdminCourseOverviewTab = ({ course }: AdminCourseOverviewTabProps) => {
  return (
    <div className="space-y-10">
      {/* Learning Outcomes */}
      <div>
        <Title order={3}>What you'll learn in this course</Title>
        {course.learningOutcomes && course.learningOutcomes.length > 0 ? (
          <>
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
          </>
        ) : (
          <div className="mt-4">
            <EmptyState message="This course has no learning outcomes yet." />
          </div>
        )}
      </div>

      {/* Prerequisites */}
      <div>
        <Title order={3}>What you need before starting</Title>
        {course.prerequisites && course.prerequisites.length > 0 ? (
          <>
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
          </>
        ) : (
          <div className="mt-4">
            <EmptyState message="No prerequisites have been added for this course." />
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <Title order={2} className="mb-6">
          About the course
        </Title>
        {/* html description from backend */}
        <div
          className="prose prose-sm md:prose-base lg:prose-lg prose-zinc max-w-none dark:prose-invert mt-2"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.description) }}
        />
      </div>
    </div>
  );
};

export default AdminCourseOverviewTab;
