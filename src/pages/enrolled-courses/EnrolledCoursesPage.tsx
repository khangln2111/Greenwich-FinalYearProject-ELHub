import CenterLoader from "../../components/CenterLoader";
import { useGetEnrollmentsSelf } from "../../react-query/enrollment/enrollmentHooks";
import EnrolledCourseCard from "./_c/EnrolledCourseCard";

export default function EnrolledCoursesPage() {
  const { data, isPending, error } = useGetEnrollmentsSelf();

  if (isPending) return <CenterLoader />;

  if (error) return <div>Error loading orders: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Enrolled courses
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.items.map((enrollment) => (
          <EnrolledCourseCard key={enrollment.id} enrollment={enrollment} />
        ))}
      </div>
    </div>
  );
}
