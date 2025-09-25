// components/InstructorCourseCardV2.tsx
import { Button, Rating } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Clock, ListOrdered, Pencil, Trash, Users } from "lucide-react";
import { useNavigate } from "react-router";
import { CourseStatus, CourseVm } from "../../../../features/course/course.types";
import { useDeleteCourse } from "../../../../features/course/course.hooks";
import { formatCurrency, formatDuration } from "../../../../utils/format";

const statusBadgeMap: Record<CourseStatus, string> = {
  [CourseStatus.Draft]: "bg-slate-200 text-slate-900 dark:bg-slate-200 dark:text-slate-900",
  [CourseStatus.Published]: "bg-green-100 text-green-900 dark:bg-green-200 dark:text-green-900",
  [CourseStatus.Pending]: "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900",
  [CourseStatus.Banned]: "bg-black text-white ",
  [CourseStatus.Rejected]: "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900",
};

interface Props {
  course: CourseVm;
}

const InstructorCourseCardV2 = ({ course }: Props) => {
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
    <div className="bg-white dark:bg-dark-6 border rounded-2xl shadow p-5 flex flex-col transition-colors">
      {/* Ảnh */}
      <img
        src={course.imageUrl || "haha"}
        alt={course.title}
        className="rounded-xl object-cover mb-4 aspect-video border border-black/10 dark:border-white/10"
      />

      {/* Badge status đưa vào body */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full capitalize ${statusBadgeMap[course.status]}`}
          >
            {course.status}
          </span>
        </div>
        {/* Title */}
        <h2 className="text-xl font-bold line-clamp-2">{course.title}</h2>
        {/* Rating */}
        <div className="flex items-center mt-2 gap-2">
          <Rating size="md" readOnly value={course.averageRating} />
          <span className="text-md text-gray-500 dark:text-gray-400">({course.reviewCount})</span>
        </div>
        {/* Thông tin phụ */}
        <div className="mt-4 flex flex-col gap-1 text-md text-gray-700 dark:text-gray-300">
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
            <span>
              {formatDuration({
                seconds: course.durationInSeconds,
                formatType: "long",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Pricing + Action */}
      <div className="mt-5 flex items-center justify-between">
        {/* Pricing */}
        <div className="text-lg font-semibold">
          {course.discountedPrice ? (
            <>
              <span className="line-through text-gray-400 mr-1">
                {formatCurrency(course.price)}
              </span>
              <span className="font-bold">{formatCurrency(course.discountedPrice)}</span>
            </>
          ) : (
            `${formatCurrency(course.price)}`
          )}
        </div>

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
};

export default InstructorCourseCardV2;
