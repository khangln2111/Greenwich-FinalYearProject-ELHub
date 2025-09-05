import { InboxIcon } from "lucide-react";

const AdminCoursesPageEmptyState = () => {
  return (
    <div className="py-24 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center">
      <InboxIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
      <p className="text-lg font-semibold">No courses found</p>
      <p className="text-sm mt-1 max-w-[600px] mx-auto">
        There are currently no courses matching your search criteria.
      </p>
    </div>
  );
};
export default AdminCoursesPageEmptyState;
