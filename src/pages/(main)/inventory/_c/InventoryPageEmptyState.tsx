import { PackageOpenIcon } from "lucide-react";
import { Link } from "react-router";

const InventoryPageEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <PackageOpenIcon className="w-16 h-16 text-blue-500" />

      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Your inventory is empty
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        Looks like you haven't purchased any courses yet. Start exploring now and boost your
        learning journey!
      </p>
      <Link
        to="/courses"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium
          transition"
      >
        Browse Courses
      </Link>
    </div>
  );
};
export default InventoryPageEmptyState;
