import { Avatar, Badge, Button, Group, Select, Skeleton, TextInput, Title } from "@mantine/core";
import { BookOpenIcon, ClockIcon, FilmIcon, RefreshCcw, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CourseStatus } from "../../../react-query/course/course.types";
import { useGetCourses } from "../../../react-query/course/courseHooks";
import { formatDuration } from "../../../utils/format";
import dayjs from "dayjs";
import CenterLoader from "../../../components/CenterLoader";

export default function AdminCoursesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CourseStatus | "All">(CourseStatus.Pending);
  const { data, isPending, error } = useGetCourses();

  if (isPending) return <Skeleton height={400} radius="md" className="mt-6" />;

  if (error) return <div>Error loading courses</div>;

  return (
    <div className="flex-1 p-6 xl:p-8 @container">
      <div className="mx-auto">
        <Group justify="space-between" className="mb-4 flex-wrap gap-y-2">
          <Title order={2}>Admin - Course Review</Title>
          <Button leftSection={<RefreshCcw size={16} />} variant="outline">
            Refresh
          </Button>
        </Group>
        <Group className="mb-4 flex-wrap gap-y-2" grow>
          <TextInput
            placeholder="Search course..."
            leftSection={<Search size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <Select
            data={[
              { value: "All", label: "All" },
              { value: CourseStatus.Pending, label: "Pending" },
              { value: CourseStatus.Published, label: "Published" },
              { value: CourseStatus.Rejected, label: "Rejected" },
              { value: CourseStatus.Draft, label: "Draft" },
            ]}
            placeholder="Filter by status"
            checkIconPosition="right"
            value={statusFilter}
            onChange={(value) => setStatusFilter((value as CourseStatus) || "All")}
            searchable
          />
        </Group>
        <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 gap-6">
          {isPending ? (
            <CenterLoader />
          ) : (
            data?.items.map((course) => (
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
                  {/* Title + Status */}
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
                              : "gray"
                      }
                    >
                      {course.status}
                    </Badge>
                  </div>

                  {/* Category + Timestamps */}
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

                  {/* Stats Section */}
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

                  {/* Instructor */}
                  <div className="flex items-center gap-3">
                    <Avatar src={course.instructorAvatarUrl} size="md" radius="xl" />
                    <div className="text-sm leading-tight">
                      <div className="font-medium text-text">{course.instructorName}</div>
                      <div className="text-gray-500 text-xs">
                        {course.instructorProfessionalTitle}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
