// CoursesPageLoadingState.tsx
import CourseCardSkeleton from "../../../../components/course-cards/CourseCardSkeleton";
import CourseListItemSkeleton from "../../../../components/course-cards/CourseListItemSkeleton";

type CoursesPageLoadingStateProps = {
  layout: "grid" | "list";
  pageSize: number;
};

export default function CoursesPageLoadingState({
  layout,
  pageSize,
}: CoursesPageLoadingStateProps) {
  if (layout === "grid") {
    return (
      <div className="@container">
        <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 gap-md">
          {Array.from({ length: pageSize }).map((_, idx) => (
            <CourseCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: pageSize }).map((_, idx) => (
        <CourseListItemSkeleton key={idx} />
      ))}
    </div>
  );
}
