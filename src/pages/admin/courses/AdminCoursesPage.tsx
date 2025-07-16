import { ActionIcon, Avatar, Badge, Select, TextInput, Title } from "@mantine/core";
import dayjs from "dayjs";
import {
  ArrowUpAzIcon,
  BookmarkIcon,
  BookOpenIcon,
  ClockIcon,
  FilmIcon,
  Search,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CenterLoader from "../../../components/CenterLoader";
import { useSearchParamState } from "../../../hooks/useSearchParamState";
import { decodeOrderOption, encodeOrderOption, OrderBy } from "../../../http-client/api.types";
import { CourseOrderableFields, CourseStatus } from "../../../react-query/course/course.types";
import { useGetCourses } from "../../../react-query/course/courseHooks";
import { formatDuration } from "../../../utils/format";

const COURSE_ORDER_OPTIONS: {
  label: string;
  value: OrderBy<CourseOrderableFields>;
}[] = [
  { label: "Created: Newest first", value: { field: "createdAt", direction: "desc" } },
  { label: "Created: Oldest first", value: { field: "createdAt", direction: "asc" } },
  { label: "Updated: Newest first", value: { field: "updatedAt", direction: "desc" } },
  { label: "Title: A → Z", value: { field: "title", direction: "asc" } },
  { label: "Title: Z → A", value: { field: "title", direction: "desc" } },
];

export default function AdminCoursesPage() {
  const [search, setSearch] = useSearchParamState<string>("search", "");
  const [searchInput, setSearchInput] = useState(search);
  const [statusFilter, setStatusFilter] = useSearchParamState<CourseStatus | "All">(
    "status",
    "All",
  );
  const [orderByParam, setOrderByParam] = useSearchParamState<string>(
    "orderBy",
    encodeOrderOption({ field: "createdAt", direction: "desc" }),
  );

  const orderBy = decodeOrderOption<CourseOrderableFields>(orderByParam, "createdAt", "desc");

  const handleSearchSubmit = () => {
    setSearch(searchInput);
  };

  const { data, isPending, error } = useGetCourses({
    search: search || undefined,
    status: statusFilter !== "All" ? statusFilter : undefined,
    orderBy,
  });

  if (error) return <div>Error loading courses</div>;

  return (
    <div className="flex-1 p-6 xl:p-8 @container">
      <div className="mx-auto space-y-6">
        {/* Title + Search */}
        <div className="flex flex-col @md:flex-row @md:items-center @md:justify-between gap-3">
          <Title order={2} className="shrink-0">
            Courses management
          </Title>

          <TextInput
            placeholder="Search course..."
            leftSection={<Search size={16} />}
            value={searchInput}
            onChange={(e) => setSearchInput(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearchSubmit();
            }}
            rightSection={
              searchInput && (
                <ActionIcon
                  variant="subtle"
                  size="lg"
                  onClick={() => {
                    setSearchInput("");
                    setSearch("");
                  }}
                >
                  ✕
                </ActionIcon>
              )
            }
            className="w-full @md:max-w-[320px]"
            classNames={{ input: "h-[42px]" }}
          />
        </div>

        {/* Status Filter + Sort */}
        <div className="flex items-center justify-between">
          <Select
            data={[
              { value: "All", label: "All" },
              { value: CourseStatus.Pending, label: "Pending" },
              { value: CourseStatus.Published, label: "Published" },
              { value: CourseStatus.Rejected, label: "Rejected" },
              { value: CourseStatus.Draft, label: "Draft" },
              { value: CourseStatus.Archived, label: "Archived" },
            ]}
            placeholder="Filter by status"
            checkIconPosition="right"
            label="Course status"
            leftSection={<BookmarkIcon size={16} />}
            value={statusFilter}
            onChange={(value) => value && setStatusFilter(value as CourseStatus | "All")}
            searchable
            classNames={{ input: "h-[42px]" }}
          />

          <Select
            data={COURSE_ORDER_OPTIONS.map((opt) => ({
              label: opt.label,
              value: encodeOrderOption(opt.value),
            }))}
            label="Sort by"
            placeholder="Sort by"
            value={orderByParam}
            onChange={(value) => value && setOrderByParam(value)}
            leftSection={<ArrowUpAzIcon size={16} />}
            checkIconPosition="right"
            classNames={{ input: "h-[42px]" }}
          />
        </div>

        {/* Main content */}
        {isPending ? (
          <CenterLoader />
        ) : data?.items.length === 0 ? (
          <div className="text-gray-500 text-center col-span-full py-10">No courses found</div>
        ) : (
          <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 gap-6">
            {data?.items.map((course) => (
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
