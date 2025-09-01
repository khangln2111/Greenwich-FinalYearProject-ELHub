import { ActionIcon, TextInput } from "@mantine/core";
import { GraduationCapIcon, SearchIcon } from "lucide-react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import { Link } from "react-router-dom";
import AppPagination from "../../../components/AppPagination/AppPagination";
import CenterLoader from "../../../components/CenterLoader/CenterLoader";
import { useGetEnrollmentsSelf } from "../../../features/enrollment/enrollmentHooks";
import EnrolledCourseCard from "./_c/EnrolledCourseCard";

export default function EnrolledCoursesPage() {
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

  if (isPending) return <CenterLoader />;

  if (error) return <div>Error loading enrollments: {error.message}</div>;

  return (
    <div>
      {/* Header: Title + Search Input */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold whitespace-nowrap text-gray-900 dark:text-white">
          Enrolled courses
        </h2>

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
      {data.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
            <GraduationCapIcon className="w-12 h-12 text-blue-600 dark:text-blue-300" />
          </div>

          <h2 className="text-xl font-semibold">You haven't enrolled in any courses yet</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Explore a wide range of courses and start learning something new today.
          </p>
          <Link
            to="/courses"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium
              transition"
          >
            Browse Courses
          </Link>
        </div>
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
