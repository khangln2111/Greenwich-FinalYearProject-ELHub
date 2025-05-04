// components/InstructorCourseCard.tsx
import { Button } from "@mantine/core";
import { Clock, ListOrdered, Pencil, Trash, Users } from "lucide-react";
import { CourseStatus, CourseVm } from "../../../../react-query/course/course.types";

const statusBadgeMap: Record<CourseStatus, string> = {
  [CourseStatus.Draft]: "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900",
  [CourseStatus.Published]: "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900",
  [CourseStatus.Pending]: "bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-900",
};

interface Props {
  course: CourseVm;
  onEdit?: (course: CourseVm) => void;
  onDelete?: (courseId: string) => void;
}

export default function InstructorCourseCard({ course, onEdit, onDelete }: Props) {
  return (
    <div
      className="bg-white dark:bg-dark-6 border border-gray-200 dark:border-dark-4 rounded-2xl shadow p-4 flex
        flex-col relative transition-colors"
    >
      <div className="absolute top-2 right-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
        ${course.price.toFixed(2)}
      </div>

      <img
        src={
          course.imageUrl ||
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAKlBMVEXMzMzy8vL19fXS0tLh4eHZ2dnr6+vv7+/JycnPz8/k5OTc3NzV1dXo6Og1EEG5AAAFxklEQVR4nO2b2XajMAxAjXfZ5v9/d7wRjAMpBCKSOboPnbbpFN/IktcyRhAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRBfj43c3YaLsEwE78Pv61gLyrvRcK7F3W05RexaIokMnA8R95OhgfQhhUQ+RBL67na9ibVCamOGBSbc3azDpMLlY0SakEz4H+tnOSSzR/6Xxy9L0tzdut2kRAE/dgHhg3EKgi5JA3c3cicglDO8NYmfmlGKNFxaltPHqB/oZyBC7lu8E1FsGvety6/5e9v5B7GtQqV07yPivGBNGKz/9qSxScTptnPFz4x2PgDrOhTkV791EmAhNIP7ZBJFlOhF8o8bnpMGv6F/EFM6ZvtyKInRSUkitupVThrDvyxpYkoHWUX45BFnkS6LbFYrq9IPc/c9xTmFJI4ki3EkhcS1EQHIk4A+Zyz/pqSJE8fgSv1t81371L626Ra8NqNfxgBsrnj8O5Im1FkKr9U357MLdSRpWm597oG8n1bKHBqJ2eaOPEcBkWcpi7JldHzvV5fCcvqhzkZkmfHOpIGgnOaLaUoSkWEr18Nj3t83vPzfu5ImTrdkWu+2MTGpAK+HpCDnnx0WCWJL5Wi/hzRTs0mkmziWd3aU3ssXmMZ8bF/wI++/h1ANLIvrXaeHoReZq3EZW1Z5KtzdC+23EGbRabq1JXIxn94VSF17OQX+JB+WgYWJGc306XbPOszjAeazLlbUR8VHjnFwF3rS0pdhImXs/axMnFeVsX0Yy0y+yHBnrwVKaftwZOpwwDWUQlMjc3nVyWPr52XqXL1+WWT05TL5935cplSAx1SkPvSMzOpxRsCRsaUD1DlUicwJmbxRoETnY7Fkcm5Oc6jTMsKZNDXt18tI3YyVpJEwP/R9GatqEe7PM7Bk6q7QJTLwGH65XPwOrALAdF5Iivmhb8tYyecxeLG6wYpMXeCq+aHvyzQnNMvlP5pMKMU5r5nPycDQyCyyBk1GlC378zLA2hmyv0WGufxOisdD35dp153qHhlfivM80Xw7Z3wz3b+nADBVivN5GfYIDY+BaW3wZPKTDL9AxoZp0Ox2//BkWD7nykmzIbP/Jkw6rx2Gsd+IQZTxw5Q0qzIgpNt/pg8hPJ90IMqotD2TJ/6rMnEuemibaCWOiDJCp8MXDrAqY3PgBnlmkYMoU5MmvvlrMnEBn2ZvcY7wPogythTncVUmnVmUaqvfvwyDKRPqjGZNJvXBOniUA9eS3cfOKjC7GZQt+2BXZHy7yylbB+V3hwpTpp5MyBUZ0V68iokjptfS4sXInQHClCkFKybNs4zsNvpNvXtp88rBjPuCgxqZugyAJxlhur10bspmRT1MisHZc4iEKsPywwbVyYCV/bkAL1diagFMH+aetw2qjHU1v7vIiGGNMdjQppL/c+6GK6NKK7vI1E215+CkvfbmpfGrZBjk3NAqt/4hI9ZcJqHFa3nqtl3acGXYmC+OyTYyYM3zLdINtXxN5ltkrMzv9NjK1L6308aoF2MOskzIjSp3k6dupvfFZfJx2zcYkLsZa8pTlfEHVIY8E9086UeWaQtXkYll+uDhc1z6w3pdw5ZRnYyV263eDs64viLF7mbQycChjHnYmNXgYMvYuVMlGavMi0ZvuaQPeuXPgNBlxqXMG71s4vnKHLYMC48RMncz9/7Vk+e7megybBGZMzLD0815dBmrr5NJS9J7ZfxV3az8kvZCLX43C0uZcy6RZk8XXwamYnxJZOYV9i0ybCrOWUaZC26aueU1FkwZ38qw8Oqi6U78fTKh7WYJOMn0iy26DFio+0o/e0WrBaaNpR2bR4eom4yo1YzVZQAfFIgr8QZdprnZf76QdWXtBhmYZ85X3nCeztNxZfpt8mvBljm4h3FQ5voq+RJwl6fLDPpfOkLw6lME+z1/HEgQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEH8D/wDnXg4+PJhj2oAAAAASUVORK5CYII="
        }
        alt={course.title}
        className="rounded-xl h-40 object-cover mb-4"
      />
      <div className="flex-1">
        <h2 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">{course.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {course.description}
        </p>

        <div className="mt-4 flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Users className="size-4 text-gray-500 dark:text-gray-400" />
            <span>{course.studentEnrollmentCount.toLocaleString()} students</span>
          </div>
          <div className="flex items-center gap-2">
            <ListOrdered className="size-4 text-gray-500 dark:text-gray-400" />
            <span>{course.lectureCount} lectures</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-gray-500 dark:text-gray-400" />
            <span>{course.durationInSeconds}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${statusBadgeMap[course.status]}`}
        >
          {course.status}
        </span>
        <div className="flex gap-2">
          <Button
            variant="default"
            color="red"
            size="xs"
            className="dark:bg-dark-4 dark:text-white"
            onClick={() => onDelete?.(course.id)}
          >
            <Trash className="size-4" />
          </Button>
          <Button
            size="xs"
            color="primary"
            variant="default"
            className="dark:bg-dark-4 dark:text-white"
            onClick={() => onEdit?.(course)}
          >
            <Pencil className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
