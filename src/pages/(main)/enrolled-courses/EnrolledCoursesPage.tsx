import { GraduationCapIcon } from "lucide-react";
import CenterLoader from "../../../components/CenterLoader";
import { useGetEnrollmentsSelf } from "../../../features/enrollment/enrollmentHooks";
import EnrolledCourseCard from "./_c/EnrolledCourseCard";
import { Link } from "react-router-dom";

export default function EnrolledCoursesPage() {
  const { data, isPending, error } = useGetEnrollmentsSelf();

  if (isPending) return <CenterLoader />;

  if (error) return <div>Error loading orders: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        Enrolled courses
      </h1>

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
    </div>
  );
}
