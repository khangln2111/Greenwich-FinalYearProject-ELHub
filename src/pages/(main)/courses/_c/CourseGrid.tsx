import CourseCard from "../../../../components/course-cards/CourseCard";

type CourseGridProps = {
  courses: any[];
};

const CourseGrid = ({ courses }: CourseGridProps) => {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 gap-md">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} className="dark:bg-dark-7" />
        ))}
      </div>
    </div>
  );
};

export default CourseGrid;
