import { Avatar, Badge, Title } from "@mantine/core";
import dayjs from "dayjs";
import { BookOpenIcon, ClockIcon, FilmIcon } from "lucide-react";
import { Link } from "react-router";
import { CourseStatus, CourseVm } from "../../../../features/course/course.types";
import { formatDuration } from "../../../../utils/format";
import AdminCourseCardStat from "./AdminCourseCardStat";

interface AdminCourseCardProps {
  course: CourseVm;
}

const AdminCourseCard = ({ course }: AdminCourseCardProps) => {
  return (
    <Link
      to={`/admin/courses/${course.id}`}
      state={{ from: location.pathname }}
      className="border rounded-2xl overflow-hidden shadow-sm transition-all flex flex-col cursor-pointer
        hover:shadow-lg hover:scale-[1.01] bg-white dark:bg-zinc-900"
    >
      <img
        src={course.imageUrl ?? undefined}
        alt={course.title}
        className="w-full h-[180px] object-cover"
      />
      <div className="p-5 flex flex-col gap-6 flex-1">
        <div className="space-y-2 flex-1">
          <Title order={4} className="line-clamp-2 text-xl">
            {course.title}
          </Title>
          <Badge
            size="md"
            color={
              course.status === CourseStatus.Published
                ? "green"
                : course.status === CourseStatus.Pending
                  ? "yellow"
                  : course.status === CourseStatus.Rejected
                    ? "red"
                    : course.status === CourseStatus.Banned
                      ? "gray"
                      : "blue"
            }
          >
            {course.status}
          </Badge>
        </div>

        <div className="text-md text-gray-600 dark:text-gray-300 space-y-1 leading-snug">
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

        <div className="grid grid-cols-3 gap-2 text-[13px] text-gray-700 dark:text-gray-300">
          <AdminCourseCardStat icon={BookOpenIcon} value={course.sectionCount} label="Sections" />
          <AdminCourseCardStat icon={FilmIcon} value={course.lectureCount} label="Lectures" />
          <AdminCourseCardStat
            icon={ClockIcon}
            value={formatDuration({ seconds: course.durationInSeconds })}
            label="Duration"
          />
        </div>

        <div className="flex items-center gap-3">
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
