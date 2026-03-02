import { CourseVm } from "../../../../features/course/course.types";
import CourseListItem from "../../../../components/course-cards/CourseListItem";
import CourseListItemSkeleton from "../../../../components/course-cards/CourseListItemSkeleton";
import { cn } from "../../../../utils/cn";
import { Link } from "react-router";

interface CourseListProps {
  courses?: CourseVm[];
  isLoading?: boolean;
  skeletonCount?: number; // số lượng skeleton render khi loading
  className?: string;
}

const CourseList = ({
  courses = [],
  isLoading = false,
  skeletonCount = 4,
  className,
}: CourseListProps) => {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, idx) => (
            <CourseListItemSkeleton key={idx} className="dark:bg-dark-7" />
          ))
        : courses.map((course) => (
            <CourseListItem
              key={course.id}
              course={course}
              className="dark:bg-dark-7"
              component={Link}
              to={`/courses/${course.id}`}
            />
          ))}
    </div>
  );
};

export default CourseList;
