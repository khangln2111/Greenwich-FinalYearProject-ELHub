import { ActionIcon, Select, TextInput, Title } from "@mantine/core";
import { ArrowUpAzIcon, BookmarkIcon, SearchIcon } from "lucide-react";
import { parseAsInteger, parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { decodeOrderOption, encodeOrderOption, OrderBy } from "../../../api-client/api.types";
import AppPagination from "../../../components/AppPagination/AppPagination";
import { useGetAllCourses } from "../../../features/course/course.hooks";
import { CourseOrderableFields, CourseStatus } from "../../../features/course/course.types";
import { usePageSEO } from "../../../hooks/usePageSEO";
import AdminCourseCard from "./_c/AdminCourseCard";
import AdminCourseCardSkeleton from "./_c/AdminCourseCardSkeleton";
import AdminCoursesPageEmptyState from "./_c/AdminCoursesPageEmptyState";

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

  usePageSEO({ title: search ? `Course Management Search "${search}"` : "Courses management" });

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

  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ scroll: true }),
  );

  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(6));

  const handleSearchSubmit = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const { data, isPending, error } = useGetAllCourses({
    search: search,
    status: statusFilter !== "All" ? statusFilter : undefined,
    orderBy: decodedOrderBy,
    page,
    pageSize,
  });

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  if (error) return <div>Error loading courses</div>;

  return (
    <div className="flex-1 p-6 xl:p-8 @container">
      <div className="mx-auto space-y-6">
        {/* Title + Search */}
        <div className="flex flex-col @md:flex-row @md:items-center @md:justify-between gap-3">
          <Title
            order={1}
            className="shrink-0 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
          >
            Courses management
          </Title>
          <TextInput
            placeholder="Search course..."
            value={searchInput}
            size="md"
            onChange={(e) => setSearchInput(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearchSubmit();
            }}
            rightSection={
              search ? (
                <ActionIcon
                  variant="subtle"
                  size="lg"
                  onClick={() => {
                    setSearchInput("");
                    setSearch(null);
                    setPage(1);
                  }}
                  aria-label="Clear search"
                >
                  ✕
                </ActionIcon>
              ) : (
                <ActionIcon
                  type="submit"
                  variant="subtle"
                  size="lg"
                  onClick={handleSearchSubmit}
                  aria-label="Search"
                >
                  <SearchIcon className="text-gray-500" size={16} />
                </ActionIcon>
              )
            }
            className="w-full @md:max-w-[320px]"
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
              { value: CourseStatus.Banned, label: "Banned" },
            ]}
            placeholder="Filter by status"
            checkIconPosition="right"
            label="Course status"
            leftSection={<BookmarkIcon size={16} />}
            value={statusFilter}
            onChange={(value) => {
              value && setStatusFilter(value as CourseStatus | "All");
              setPage(1);
            }}
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
            onChange={(value) => {
              value && setOrderByParam(value);
              setPage(1);
            }}
            leftSection={<ArrowUpAzIcon size={16} />}
            checkIconPosition="right"
            classNames={{ input: "h-[42px]" }}
          />
        </div>

        {isPending || data.items.length > 0 ? (
          <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 gap-6">
            {isPending
              ? Array.from({ length: pageSize }).map((_, i) => <AdminCourseCardSkeleton key={i} />)
              : data.items.map((course) => <AdminCourseCard key={course.id} course={course} />)}
          </div>
        ) : (
          <AdminCoursesPageEmptyState />
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
