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
  const itemsToRender = isLoading ? Array.from({ length: skeletonCount }) : courses;

  return (
    <div className={`@container ${className ?? ""}`}>
      <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 gap-md">
        {itemsToRender.map((item, idx) =>
          isLoading ? (
            <CourseCardSkeleton key={idx} />
          ) : (
            <CourseCard
              key={(item as CourseVm).id}
              course={item as CourseVm}
              className="dark:bg-dark-7"
            />
          ),
        )}
      </div>
    </div>
  );
};

export default CourseGrid;
