import { CourseVm } from "../../../../features/course/course.types";
import CourseListItem from "../../../../components/course-cards/CourseListItem";
import CourseListItemSkeleton from "../../../../components/course-cards/CourseListItemSkeleton";
import { cn } from "../../../../utils/cn";

interface CourseListProps {
  courses?: CourseVm[];
  isLoading?: boolean;
  skeletonCount?: number; // số lượng skeleton render khi loading
  className?: string;
}

export default function CourseList({
  courses = [],
  isLoading = false,
  skeletonCount = 4,
  className,
}: CourseListProps) {
  const itemsToRender = isLoading ? Array.from({ length: skeletonCount }) : courses;

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {itemsToRender.map((item, idx) =>
        isLoading ? (
          <CourseListItemSkeleton key={idx} />
        ) : (
          <CourseListItem
            key={(item as CourseVm).id}
            course={item as CourseVm}
            className="dark:bg-dark-7"
          />
        ),
      )}
    </div>
  );
}
