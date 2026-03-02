import { SearchIcon } from "lucide-react";

const CoursesPageEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] gap-4 text-center px-4">
      <SearchIcon className="w-16 h-16 text-gray-400" />
      <p className="text-lg font-semibold">No courses found</p>
      <p className="text-sm text-gray-500">
        Try adjusting your search keywords or filters to find more results.
      </p>
    </div>
  );
};
export default CoursesPageEmptyState;
