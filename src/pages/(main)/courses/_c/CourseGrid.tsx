import CourseCard from "../../home/_c/PopularCourses/CourseCard";

type CourseGridProps = {
  courses: any[];
};

const CourseGrid = ({ courses }: CourseGridProps) => {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 gap-md">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseGrid;
