import { ActionIcon, Select, TextInput, Title } from "@mantine/core";
import { ArrowUpAzIcon, InboxIcon, SearchIcon } from "lucide-react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import { decodeOrderOption, encodeOrderOption, OrderBy } from "../../../api-client/api.types";
import AppPagination from "../../../components/AppPagination/AppPagination";
import CenterLoader from "../../../components/CenterLoader/CenterLoader";
import { CourseOrderableFields, CourseStatus } from "../../../features/course/course.types";
import { useGetCourses } from "../../../features/course/course.hooks";
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

export default function AdminPendingCoursesPage() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(6));
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
  const [searchInput, setSearchInput] = useState(search);
  const [orderByParam, setOrderByParam] = useQueryState(
    "orderBy",
    parseAsString.withDefault(
      encodeOrderOption<CourseOrderableFields>({
        field: "createdAt",
        direction: "desc",
      }),
    ),
  );
  const decodedOrderBy = decodeOrderOption<CourseOrderableFields>(
    orderByParam,
    "createdAt",
    "desc",
  );

  const handleSearchSubmit = () => {
    setSearch(searchInput);
  };

  const { data, isPending, error } = useGetCourses({
    search: search || undefined,
    orderBy: decodedOrderBy,
    status: CourseStatus.Pending,
  });

  if (error) return <div>Error loading pending courses</div>;

  return (
    <div className="flex-1 p-6 xl:p-8 @container">
      <div className="mx-auto space-y-6">
        {/* Header and controls */}
        <div className="flex flex-col md:flex-row md:items-baseline-last md:justify-between gap-4">
          <Title order={2}>Pending Courses</Title>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <TextInput
              placeholder="Search course..."
              className="flex-1"
              leftSection={<SearchIcon size={16} />}
              value={searchInput}
              onChange={(e) => setSearchInput(e.currentTarget.value)}
              label="Search"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit();
                }
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
            />

            <Select
              data={COURSE_ORDER_OPTIONS.map((opt) => ({
                label: opt.label,
                value: encodeOrderOption(opt.value),
              }))}
              label="Sort by"
              placeholder="Sort by"
              className="flex-1"
              value={orderByParam}
              onChange={(value) => value && setOrderByParam(value)}
              leftSection={<ArrowUpAzIcon size={16} />}
              checkIconPosition="right"
            />
          </div>
        </div>

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
            {data.items?.map((course) => <AdminCourseCard key={course.id} course={course} />)}
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
