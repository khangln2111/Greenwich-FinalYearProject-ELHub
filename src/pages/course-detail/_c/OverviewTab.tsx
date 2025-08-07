import { Text, ThemeIcon, Title } from "@mantine/core";
import { ArrowRight, AwardIcon } from "lucide-react";
import { CourseDetailVm } from "../../../features/course/course.types";

type OverviewTabProps = {
  course: CourseDetailVm;
};

const OverviewTab = ({ course }: OverviewTabProps) => {
  return (
    <div>
      <Title order={2}>About the course</Title>
      <Text className="mt-2 text-lg leading-relaxed">{course.description}</Text>
      {/* Learning Outcomes Section */}
      {course.learningOutcomes && course.learningOutcomes.length > 0 && (
        <div className="mt-10">
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
                <div>
                  <ThemeIcon size="md" radius="2xl" variant="light">
                    <AwardIcon className="size-[70%]" />
                  </ThemeIcon>
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Prerequisites Section */}
      {course.prerequisites && course.prerequisites.length > 0 && (
        <div className="mt-10">
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
                {/* <div>
                  <IconCheck className="inline size-6 shrink-0 text-primary-4 dark:text-primary-8" />
                </div> */}
                <div>
                  <ThemeIcon size="md" radius="2xl" variant="light">
                    <ArrowRight className="size-[70%]" />
                  </ThemeIcon>
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default OverviewTab;
