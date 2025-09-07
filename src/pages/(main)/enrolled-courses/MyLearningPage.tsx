import { ActionIcon, TextInput, Title } from "@mantine/core";
import { SearchIcon } from "lucide-react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import AppPagination from "../../../components/AppPagination/AppPagination";
import CenterLoader from "../../../components/CenterLoader/CenterLoader";
import { useGetEnrollmentsSelf } from "../../../features/enrollment/enrollment.hooks";
import EnrolledCourseCard from "./_c/EnrolledCourseCard";
import EnrolledCoursesPageEmptyState from "./_c/EnrolledCoursesPageEmptyState";
import { usePageSEO } from "../../../hooks/usePageSEO";

export default function MyLearningPage() {
  usePageSEO({ title: "My Learning" });
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
  const [searchInput, setSearchInput] = useState(search);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(6));

  const { data, isPending, error } = useGetEnrollmentsSelf({
    page,
    pageSize,
    search: search,
  });

  const handleSearchSubmit = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  if (error) return <div>Error loading enrollments: {error.message}</div>;

  return (
    <div>
      {/* Header: Title + Search Input */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <Title
          order={1}
          className="text-2xl md:text-3xl font-bold whitespace-nowrap text-gray-900 dark:text-white"
        >
          Enrolled courses
        </Title>

        <TextInput
          placeholder="Search courses..."
          className="max-w-60"
          value={searchInput}
          onChange={(e) => setSearchInput(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchSubmit(e);
            }
          }}
          rightSectionPointerEvents="all"
          rightSection={
            search ? (
              <ActionIcon
                variant="subtle"
                size="lg"
                onClick={() => {
                  setSearchInput("");
                  setSearch("");
                  setPage(1);
                }}
              >
                ✕
              </ActionIcon>
            ) : (
              <ActionIcon type="submit" variant="subtle" size="lg" onClick={handleSearchSubmit}>
                <SearchIcon className="text-gray-500" size={16} />
              </ActionIcon>
            )
          }
        />
      </div>

      {/* Content */}
      {isPending ? (
        <CenterLoader />
      ) : data.items.length === 0 ? (
        <EnrolledCoursesPageEmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.items.map((enrollment) => (
            <EnrolledCourseCard key={enrollment.id} enrollment={enrollment} />
          ))}
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
  );
}
