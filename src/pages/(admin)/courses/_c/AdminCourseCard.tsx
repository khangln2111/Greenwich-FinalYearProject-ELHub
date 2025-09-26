import { Avatar, Title } from "@mantine/core";
import dayjs from "dayjs";
import { BookOpenIcon, ClockIcon, FilmIcon } from "lucide-react";
import { Link } from "react-router";
import { CourseStatus, CourseVm } from "../../../../features/course/course.types";
import { formatDuration } from "../../../../utils/format";
import AdminCourseCardStat from "./AdminCourseCardStat";
import { getCourseStatusBadgeMap } from "../../../../features/course/course.utils";
import { cn } from "../../../../utils/cn";

interface AdminCourseCardProps {
  course: CourseVm;
}

const AdminCourseCard = ({ course }: AdminCourseCardProps) => {
  return (
    <Link
      to={`/admin/courses/${course.id}`}
      state={{ from: location.pathname }}
      className="relative outline outline-default-border rounded-2xl overflow-hidden shadow-sm flex flex-col
        cursor-pointer bg-white dark:bg-dark-6 p-5 transition-colors hover:shadow-xl duration-400
        hover:outline-2 hover:outline-primary-5"
    >
      <span
        className={cn(
          "absolute top-2 right-2 text-sm font-medium px-3 py-1 rounded-full capitalize z-10",
          getCourseStatusBadgeMap[course.status],
        )}
      >
        {course.status}
      </span>
      <img
        src={course.imageUrl ?? undefined}
        alt={course.title}
        className="w-full h-[180px] aspect-video border border-black/10 dark:border-white/10 rounded-xl object-cover"
      />
      <div className="flex flex-col flex-1 mt-5">
        <Title order={4} className="line-clamp-2 text-xl flex-1">
          {course.title}
        </Title>

        <div className="text-md text-gray-600 dark:text-gray-300 space-y-1 leading-snug mt-3">
          <div>
            🏷️ <span className="font-medium">{course.categoryName}</span>
          </div>
          <div>
            🕒 Created:{" "}
            <span className="font-medium">
              {dayjs(course.createdAt).format("YYYY-MM-DD HH:mm")}
            </span>
          </div>
          {course.status === CourseStatus.Pending ? (
            <div>
              📤 Submitted:{" "}
              <span className="font-medium">
                {course.submittedAt
                  ? dayjs(course.submittedAt).format("YYYY-MM-DD HH:mm")
                  : "Not submitted"}
              </span>
            </div>
          ) : (
            <div>
              ✏️ Last updated:{" "}
              <span className="font-medium">
                {dayjs(course.updatedAt).format("YYYY-MM-DD HH:mm")}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 text-[13px] text-gray-800 dark:text-gray-200 mt-6">
          <AdminCourseCardStat icon={BookOpenIcon} value={course.sectionCount} label="Sections" />
          <AdminCourseCardStat icon={FilmIcon} value={course.lectureCount} label="Lectures" />
          <AdminCourseCardStat
            icon={ClockIcon}
            value={formatDuration({ seconds: course.durationInSeconds })}
            label="Duration"
          />
        </div>

        <div className="flex items-center gap-3 mt-6">
          <Avatar
            src={course.instructorAvatarUrl}
            color="initials"
            name={course.instructorName}
            size="md"
            radius="full"
            className="border border-gray-100 dark:border-zinc-700 shadow-sm"
          />
          <div className="text-sm">
            <div className="font-medium">{course.instructorName}</div>
            <div className="text-gray-700 dark:text-gray-300 text-xs">
              {course.instructorProfessionalTitle ?? "ELHub Instructor"}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AdminCourseCard;
