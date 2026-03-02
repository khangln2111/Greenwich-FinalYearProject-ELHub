import { Link } from "react-router";
import CourseCard from "../../../../components/course-cards/CourseCard";
import CourseCardSkeleton from "../../../../components/course-cards/CourseCardSkeleton";
import { CourseVm } from "../../../../features/course/course.types";

type CourseGridProps = {
  courses?: CourseVm[];
  isLoading?: boolean;
  skeletonCount?: number;
  className?: string;
};

const CourseGrid = ({
  courses = [],
  isLoading = false,
  skeletonCount = 6,
  className,
}: CourseGridProps) => {
  return (
    <div className={`@container ${className ?? ""}`}>
      <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 gap-md">
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, idx) => (
              <CourseCardSkeleton key={idx} className="dark:bg-dark-7" />
            ))
          : courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                className="dark:bg-dark-7"
                component={Link}
                to={`/courses/${course.id}`}
              />
            ))}
      </div>
    </div>
  );
};

export default CourseGrid;
