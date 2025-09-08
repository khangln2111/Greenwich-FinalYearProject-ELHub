import { Spoiler, Title, Button } from "@mantine/core";
import { MessageSquare, PlayCircle, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import image from "../../../../assets/placeholder/avatar-placeholder.jpg";
import { CourseDetailVm } from "../../../../features/course/course.types";
import { cn } from "../../../../utils/cn";

type InstructorTabProps = {
  courseDetail: CourseDetailVm;
  className?: string;
};

const InstructorTab = ({ courseDetail, className }: InstructorTabProps) => {
  return (
    <div className={cn("space-y-5", className)}>
      <Title order={2}>Meet your instructor</Title>
      <div
        className="mx-auto p-6 shadow-lg rounded-lg border border-gray-200 dark:border-zinc-700 bg-white
          dark:bg-zinc-800"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column: Avatar */}
          <div className="size-50 self-center md:self-start shadow-md border overflow-hidden rounded-md aspect-square">
            <img
              src={courseDetail.instructorAvatarUrl || image}
              alt="Instructor Avatar"
              className="object-cover size-full"
            />
          </div>

          {/* Right column: Instructor Info + Description */}
          <div className="md:flex-6 flex flex-col items-center md:items-start md:text-left w-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {courseDetail.instructorName || "ELHub Instructor"}
            </h3>
            <p className="font-medium text-gray-500 dark:text-zinc-400">
              {courseDetail.instructorProfessionalTitle || "ELHub Instructor"}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-2 text-sm text-zinc-700 dark:text-zinc-300 mt-5 text-center md:text-left w-full">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Star className="text-yellow-500" size={16} fill="currentColor" stroke="none" />
                <span className="text-md font-medium text-zinc-600 dark:text-zinc-400">
                  {courseDetail.instructorAverageRating} Instructor Rating
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MessageSquare className="text-blue-500" size={16} />
                <span className="text-md font-medium text-zinc-600 dark:text-zinc-400">
                  {courseDetail.instructorReviewCount} Reviews
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Users className="text-orange-500" size={16} />
                <span className="text-md font-medium text-zinc-600 dark:text-zinc-400">
                  {courseDetail.instructorStudentCount} Students
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <PlayCircle className="text-rose-500" size={16} />
                <span className="text-md font-medium text-zinc-600 dark:text-zinc-400">
                  {courseDetail.instructorCourseCount} Courses
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 w-full">
              <Spoiler maxHeight={100} showLabel="Show more" hideLabel="Hide">
                <p className="text-left text-gray-800 dark:text-gray-400 leading-loose">
                  {courseDetail.instructorAbout ||
                    "My name is Julian, and I am a full-time teacher and bestselling instructor who is truly dedicated to helping students realize their full potential. With the honor of teaching over 500,000 students from 130+ countries across the globe, I have honed my skills and become an expert in my field."}
                </p>
              </Spoiler>
            </div>

            {/* Button */}
            <div className="mt-6 flex justify-center md:justify-start w-full">
              <Link to={`/instructors/${courseDetail.instructorId}`}>
                <Button variant="light" color="blue" size="xs" radius="xl">
                  View full profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorTab;
