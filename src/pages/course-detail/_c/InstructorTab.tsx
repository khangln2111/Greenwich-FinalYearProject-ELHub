import { Spoiler, Title } from "@mantine/core";
import { MessageSquare, PlayCircle, Star, Users } from "lucide-react";
import image from "../../../assets/placeholder/avatar-placeholder.jpg";
import { CourseDetailVm } from "../../../react-query/course/course.types";

type InstructorTabProps = {
  courseDetail: CourseDetailVm;
};
const InstructorTab = ({ courseDetail }: InstructorTabProps) => {
  return (
    <div>
      <Title order={2}>Meet your instructor</Title>
      <div
        className="mx-auto p-6 shadow-lg rounded-lg mt-5 border border-gray-200 dark:border-zinc-700 bg-white
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
          <div className="md:flex-6 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {courseDetail.instructorName}
            </h3>
            <p className="font-medium text-gray-500 dark:text-zinc-400">
              {courseDetail.instructorProfessionalTitle || "Software Engineer & Instructor"}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-2 text-sm text-zinc-700 dark:text-zinc-300 mt-5">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500" size={16} fill="currentColor" stroke="none" />
                <span className="text-md font-medium text-zinc-600 dark:text-zinc-400">
                  {courseDetail.instructorAverageRating} Instructor Rating
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="text-blue-500" size={16} />
                <span className="text-md font-medium text-zinc-600 dark:text-zinc-400">
                  {courseDetail.instructorReviewCount} Reviews
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-orange-500" size={16} />
                <span className="text-md font-medium text-zinc-600 dark:text-zinc-400">
                  {courseDetail.instructorStudentCount} Students
                </span>
              </div>

              <div className="flex items-center gap-2">
                <PlayCircle className="text-rose-500" size={16} />
                <span className="text-md font-medium text-zinc-600 dark:text-zinc-400">
                  {courseDetail.instructorCourseCount} Courses
                </span>
              </div>
            </div>

            {/* Description with Spoiler */}
            <Spoiler maxHeight={100} showLabel="Show more" hideLabel="Hide">
              <p className="mt-3 text-gray-800 dark:text-gray-400 leading-loose">
                {courseDetail.instructorAbout ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
              </p>
            </Spoiler>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorTab;
