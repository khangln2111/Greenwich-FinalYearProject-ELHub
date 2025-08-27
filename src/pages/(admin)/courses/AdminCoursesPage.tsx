import { ActionIcon, Select, TextInput, Title } from "@mantine/core";
import { ArrowUpAzIcon, BookmarkIcon, InboxIcon, Search } from "lucide-react";
import { parseAsInteger, parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";
import { useState } from "react";
import { decodeOrderOption, encodeOrderOption, OrderBy } from "../../../api-client/api.types";
import AppPagination from "../../../components/AppPagination/AppPagination";
import CenterLoader from "../../../components/CenterLoader";
import { CourseOrderableFields, CourseStatus } from "../../../features/course/course.types";
import { useGetCourses } from "../../../features/course/courseHooks";
import AdminCourseCard from "./_c/AdminCourseCard";

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
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));

  const [searchInput, setSearchInput] = useState(search);

  const [statusFilter, setStatusFilter] = useQueryState(
    "status",
    parseAsStringLiteral(["All", ...Object.values(CourseStatus)]).withDefault("All"),
  );
  const [orderByParam, setOrderByParam] = useQueryState(
    "orderBy",
    parseAsString.withDefault(encodeOrderOption({ field: "createdAt", direction: "desc" })),
  );

  const decodedOrderBy = decodeOrderOption<CourseOrderableFields>(
    orderByParam,
    "createdAt",
    "desc",
  );

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(6));

  const handleSearchSubmit = () => {
    setSearch(searchInput);
  };

  const { data, isPending, error } = useGetCourses({
    search: search,
    status: statusFilter !== "All" ? statusFilter : undefined,
    orderBy: decodedOrderBy,
    page,
    pageSize,
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
                    setSearch(null);
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
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
        ) : data.items?.length === 0 ? (
          <div className="py-24 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center">
            <InboxIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-lg font-semibold">No courses found</p>
            <p className="text-sm mt-1 max-w-[600px] mx-auto">
              There are currently no courses matching your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 gap-6">
            {data?.items.map((course) => <AdminCourseCard key={course.id} course={course} />)}
          </div>
        )}

        <AppPagination
          page={page}
          pageSize={pageSize}
          itemsCount={data?.count ?? 0}
          onPageChange={setPage}
          withEdges
          className="flex justify-center items-center mt-10"
        />
      </div>
    </div>
  );
}
