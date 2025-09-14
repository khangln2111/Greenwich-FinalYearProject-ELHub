import { ActionIcon, TextInput, Title } from "@mantine/core";
import { SearchIcon } from "lucide-react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import AppPagination from "../../../components/AppPagination/AppPagination";
import { useGetEnrollmentsSelf } from "../../../features/enrollment/enrollment.hooks";
import { usePageSEO } from "../../../hooks/usePageSEO";
import EnrolledCourseCard from "./_c/EnrolledCourseCard";
import EnrolledCourseCardSkeleton from "./_c/EnrolledCourseCardSkeleton";
import EnrolledCoursesPageEmptyState from "./_c/MyLearningPageEmptyState";

export default function MyLearningPage() {
  usePageSEO({ title: "My Learning" });
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
  const [searchInput, setSearchInput] = useState(search);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(6));

  const {
    data,
    isPending,
    error: isError,
  } = useGetEnrollmentsSelf({
    page,
    pageSize,
    search: search,
  });

  const handleSearchSubmit = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  if (isError) return <div>Failed to load enrollments</div>;

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
      {isPending || data.items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {isPending
            ? Array.from({ length: pageSize }).map((_, i) => <EnrolledCourseCardSkeleton key={i} />)
            : data.items.map((enrollment) => (
                <EnrolledCourseCard key={enrollment.id} enrollment={enrollment} />
              ))}
        </div>
      ) : (
        <EnrolledCoursesPageEmptyState />
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
