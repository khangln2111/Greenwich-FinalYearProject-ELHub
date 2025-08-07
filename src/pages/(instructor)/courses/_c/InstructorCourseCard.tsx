// components/InstructorCourseCard.tsx
import { Button, Rating } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Clock, ListOrdered, Pencil, Trash, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CourseStatus, CourseVm } from "../../../../react-query/course/course.types";
import { useDeleteCourse } from "../../../../react-query/course/courseHooks";
import { formatCurrency, formatDuration } from "../../../../utils/format";

const statusBadgeMap: Record<CourseStatus, string> = {
  [CourseStatus.Draft]: "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900",
  [CourseStatus.Published]: "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900",
  [CourseStatus.Pending]: "bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-900",
  [CourseStatus.Archived]: "bg-gray-100 text-gray-800 dark:bg-gray-200 dark:text-gray-900",
  [CourseStatus.Rejected]: "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900",
};

interface Props {
  course: CourseVm;
}

export default function InstructorCourseCard({ course }: Props) {
  const deleteCourseMutation = useDeleteCourse();
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    modals.openConfirmModal({
      title: "Confirm deletion",
      centered: true,
      children: (
        <p>
          Are you sure you want to <strong>delete</strong> the course{" "}
          <strong>{course.title}</strong>?
        </p>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deleteCourseMutation.mutate(course.id);
      },
    });
  };

  return (
    <div className="bg-white dark:bg-dark-6 border rounded-2xl shadow p-4 flex flex-col relative transition-colors">
      <div className="absolute top-2 right-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded-full">
        {/* Hiển thị giá */}
        {course.discountedPrice ? (
          <>
            <span className="line-through text-gray-400">{formatCurrency(course.price)}</span>{" "}
            <span className="font-bold">{formatCurrency(course.discountedPrice)}</span>
          </>
        ) : (
          `${formatCurrency(course.price)}`
        )}
      </div>
      <img
        src={course.imageUrl || "haha"}
        alt={course.title}
        className="rounded-xl object-cover mb-4 aspect-video"
      />
      <div className="flex-1">
        <h2 className="text-lg font-bold mb-1 text-gray-900 dark:text-white line-clamp-2">
          {course.title}
        </h2>
        {/* <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {course.description}
        </p> */}
        {/* rating */}
        <div className="flex items-center mt-2 mb-4 gap-2">
          <Rating readOnly value={course.averageRating} />
          <span className="text-sm text-gray-500 dark:text-gray-400">({course.reviewCount})</span>
        </div>

        <div className="mt-4 flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Users className="size-4 text-gray-500 dark:text-gray-400" />
            <span>{course.enrollmentCount ?? 0} students</span>
          </div>
          <div className="flex items-center gap-2">
            <ListOrdered className="size-4 text-gray-500 dark:text-gray-400" />
            <span>{course.lectureCount} lectures</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-gray-500 dark:text-gray-400" />
            <span>{formatDuration({ seconds: course.durationInSeconds, formatType: "long" })}</span>
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
            onClick={handleDeleteClick}
          >
            <Trash className="size-4" />
          </Button>
          <Button
            size="xs"
            color="primary"
            variant="default"
            className="dark:bg-dark-4 dark:text-white"
            onClick={() => navigate(`/instructor/courses/${course.id}/edit`)}
          >
            <Pencil className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
