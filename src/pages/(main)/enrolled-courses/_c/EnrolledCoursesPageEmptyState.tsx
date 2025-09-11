import { GraduationCapIcon } from "lucide-react";
import { Link } from "react-router";

const EnrolledCoursesPageEmptyState = () => {
  return (
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
  );
};
export default EnrolledCoursesPageEmptyState;
