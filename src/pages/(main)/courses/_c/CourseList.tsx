import { CourseVm } from "../../../../features/course/course.types";
import CourseListItem from "../../../../components/course-cards/CourseListItem";

interface CourseListProps {
  courses: CourseVm[];
}

export default function CourseList({ courses }: CourseListProps) {
  return (
    <div className="flex flex-col gap-6">
      {courses.map((course) => (
        <CourseListItem key={course.id} course={course} className="dark:bg-dark-7" />
      ))}
    </div>
  );
}
