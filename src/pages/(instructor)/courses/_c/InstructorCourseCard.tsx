// components/InstructorCourseCard.tsx
import { Button, Rating } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Clock, ListOrdered, Pencil, Trash, Users } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDeleteCourse } from "../../../../features/course/course.hooks";
import { CourseVm } from "../../../../features/course/course.types";
import { getCourseStatusBadgeMap } from "../../../../features/course/course.utils";
import { cn } from "../../../../utils/cn";
import { formatCurrency, formatDuration } from "../../../../utils/format";

interface Props {
  course: CourseVm;
}

const InstructorCourseCard = ({ course }: Props) => {
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
    <Link
      to={`/instructor/courses/${course.id}/edit`}
      state={{ from: location.pathname }}
      className="bg-white dark:bg-dark-6 outline outline-default-border rounded-2xl shadow p-5 flex flex-col relative
        transition-colors hover:shadow-xl duration-400 hover:outline-2 hover:outline-primary-5"
    >
      <span
        className={cn(
          "absolute top-2 right-2 text-sm font-medium px-3 py-1 rounded-full capitalize z-10",
          getCourseStatusBadgeMap[course.status],
        )}
      >
        {course.status}
      </span>

      <img
        src={course.imageUrl || "haha"}
        alt={course.title}
        className="rounded-xl object-cover aspect-video border border-black/10 dark:border-white/10"
      />

      <div className="flex-1 mt-4">
        <h2 className="text-xl font-bold line-clamp-2">{course.title}</h2>

        <div className="flex items-center mt-2 gap-2">
          <Rating size="md" readOnly value={course.averageRating} />
          <span className="text-md text-gray-500 dark:text-gray-400">({course.reviewCount})</span>
        </div>

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
            <span>{formatDuration({ seconds: course.durationInSeconds, formatType: "long" })}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        {/* Price xuống dưới thay cho status badge */}
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
    </Link>
  );
};

export default InstructorCourseCard;
