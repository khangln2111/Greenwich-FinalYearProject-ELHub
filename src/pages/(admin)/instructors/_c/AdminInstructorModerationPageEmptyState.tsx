import { FileQuestionIcon } from "lucide-react";

const AdminInstructorModerationPageEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500 dark:text-gray-400">
      <FileQuestionIcon className="w-16 h-16 mb-4" />
      <p className="text-lg font-semibold">No instructor applications found</p>
      <p className="text-sm mt-1 max-w-md">
        We couldn’t find any applications to display. This could be due to filters, search terms, or
        simply because no one has applied yet.
      </p>
    </div>
  );
};
export default AdminInstructorModerationPageEmptyState;
