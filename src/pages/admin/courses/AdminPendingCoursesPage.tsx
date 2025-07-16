import { Avatar, Badge, Button, Group, Select, TextInput, Title } from "@mantine/core";
import dayjs from "dayjs";
import {
  BookOpenIcon,
  ClockIcon,
  FilmIcon,
  InboxIcon,
  RefreshCcw,
  Search,
  SortDesc,
} from "lucide-react";
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

export default function AdminPendingCoursesPage() {
  const [search, setSearch] = useSearchParamState<string>("search");
  const [orderByParam, setOrderByParam] = useSearchParamState<string>(
    "orderBy",
    encodeOrderOption<CourseOrderableFields>({ field: "createdAt", direction: "desc" }),
  );
  const orderBy = decodeOrderOption<CourseOrderableFields>(orderByParam, "createdAt", "desc");

  const { data, isPending, error, refetch } = useGetCourses({
    search: search || undefined,
    orderBy,
    status: CourseStatus.Pending,
  });

  if (error) return <div>Error loading pending courses</div>;

  return (
    <div className="flex-1 p-6 xl:p-8 @container">
      <div className="mx-auto">
        <Group justify="space-between" className="mb-4 flex-wrap gap-y-2">
          <Title order={2}>Pending Courses</Title>
          <Button
            leftSection={<RefreshCcw size={16} />}
            variant="outline"
            onClick={() => refetch()}
          >
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
            data={COURSE_ORDER_OPTIONS.map((opt) => ({
              label: opt.label,
              value: encodeOrderOption(opt.value),
            }))}
            placeholder="Sort by"
            value={orderByParam}
            onChange={(value) => value && setOrderByParam(value)}
            leftSection={<SortDesc size={16} />}
            searchable
          />
        </Group>

        {isPending ? (
          <CenterLoader />
        ) : data.items?.length === 0 ? (
          <div className="py-24 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center">
            <InboxIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-lg font-semibold">No pending courses</p>
            <p className="text-sm mt-1 max-w-[600px] mx-auto">
              There are currently no courses waiting for approval.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 gap-6">
            {data.items?.map((course) => (
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
                    <Badge color="yellow" size="sm">
                      Pending
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
                    <div>
                      📤 Submitted:{" "}
                      <span className="font-medium">
                        {dayjs(course.submittedAt).format("YYYY-MM-DD HH:mm")}
                      </span>
                    </div>
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
