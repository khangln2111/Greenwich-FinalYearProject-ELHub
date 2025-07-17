import { Avatar, Badge, Title } from "@mantine/core";
import dayjs from "dayjs";
import { BookOpenIcon, ClockIcon, FilmIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { CourseStatus, CourseVm } from "../../../../react-query/course/course.types";
import { formatDuration } from "../../../../utils/format";

interface AdminCourseCardProps {
  course: CourseVm;
}

export default function AdminCourseCard({ course }: AdminCourseCardProps) {
  return (
    <Link
      to={`/admin/courses/${course.id}`}
      key={course.id}
      className="border rounded-2xl overflow-hidden shadow-sm transition-all bg-white dark:bg-zinc-900 flex flex-col
        cursor-pointer hover:shadow-lg hover:scale-[1.01]"
    >
      <img
        src={course.imageUrl ?? undefined}
        alt={course.title}
        className="w-full h-[180px] object-cover"
      />
      <div className="p-5 flex flex-col gap-4 flex-1">
        <div className="space-y-1 flex-1">
          <Title order={4} className="line-clamp-2 text-lg">
            {course.title}
          </Title>
          <Badge
            size="sm"
            color={
              course.status === CourseStatus.Published
                ? "green"
                : course.status === CourseStatus.Pending
                  ? "yellow"
                  : course.status === CourseStatus.Rejected
                    ? "red"
                    : course.status === CourseStatus.Archived
                      ? "gray"
                      : "blue"
            }
          >
            {course.status}
          </Badge>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1 leading-snug">
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
          <div className="flex flex-col items-center justify-center rounded-md bg-gray-100 dark:bg-zinc-800 px-2 py-2">
            <BookOpenIcon size={16} className="mb-1" />
            <span className="font-medium">{course.sectionCount}</span>
            <span className="text-[11px] text-gray-500">Sections</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-md bg-gray-100 dark:bg-zinc-800 px-2 py-2">
            <FilmIcon size={16} className="mb-1" />
            <span className="font-medium">{course.lectureCount}</span>
            <span className="text-[11px] text-gray-500">Lectures</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-md bg-gray-100 dark:bg-zinc-800 px-2 py-2">
            <ClockIcon size={16} className="mb-1" />
            <span className="font-medium">
              {formatDuration({ seconds: course.durationInSeconds })}
            </span>
            <span className="text-[11px] text-gray-500">Duration</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Avatar
            src={course.instructorAvatarUrl}
            color="initials"
            name={course.instructorName}
            size="md"
            radius="xl"
          />
          <div className="text-sm leading-tight">
            <div className="font-medium text-text">{course.instructorName}</div>
            <div className="text-gray-500 text-xs">{course.instructorProfessionalTitle}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
