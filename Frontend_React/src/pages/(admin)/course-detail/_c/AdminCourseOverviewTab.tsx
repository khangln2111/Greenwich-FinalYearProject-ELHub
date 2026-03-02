import { Text, ThemeIcon, Title } from "@mantine/core";
import DOMPurify from "dompurify";
import { ArrowRight, AwardIcon } from "lucide-react";
import EmptyInformation from "../../../../components/EmptyInformation/EmptyInfomartion";
import { CourseDetailVm } from "../../../../features/course/course.types";
import { cn } from "../../../../utils/cn";

type AdminCourseOverviewTabProps = {
  course: CourseDetailVm;
  className?: string;
};

const AdminCourseOverviewTab = ({ course, className }: AdminCourseOverviewTabProps) => {
  return (
    <div className={cn("space-y-10", className)}>
      {/* Learning Outcomes */}
      <div>
        <Title order={2}>What you'll learn in this course</Title>
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
            <EmptyInformation message="This course has no learning outcomes yet." />
          </div>
        )}
      </div>

      {/* Prerequisites */}
      <div>
        <Title order={2}>What you need before starting</Title>
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
            <EmptyInformation message="No prerequisites have been added for this course." />
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <Title order={2} className="mb-5">
          About the course
        </Title>
        {/* html description from backend */}
        {course.description && course.description.trim() ? (
          <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none dark:prose-invert">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(course.description),
              }}
            />
          </div>
        ) : (
          <EmptyInformation message="No description has been added for this course yet." />
        )}
      </div>
    </div>
  );
};

export default AdminCourseOverviewTab;
