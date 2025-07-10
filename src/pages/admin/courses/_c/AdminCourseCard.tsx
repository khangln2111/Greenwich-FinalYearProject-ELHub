import { Avatar, Badge, Button, Group, Title } from "@mantine/core";
import { CourseVm } from "../../../../react-query/course/course.types";

interface AdminCourseCardProps {
  course: CourseVm;
  onApprove: () => void;
  onReject: () => void;
}

export default function AdminCourseCard({ course, onApprove, onReject }: AdminCourseCardProps) {
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white dark:bg-zinc-900">
      <img
        src={course.imageUrl ?? undefined}
        alt={course.title}
        className="w-full h-[180px] object-cover"
      />
      <div className="p-4 space-y-2">
        <Title order={4}>{course.title}</Title>

        <Group gap="xs">
          <Badge
            color={
              course.status === "Published"
                ? "green"
                : course.status === "Rejected"
                  ? "red"
                  : course.status === "Pending"
                    ? "yellow"
                    : "gray"
            }
            variant="light"
            size="sm"
          >
            {course.status}
          </Badge>
        </Group>

        <Group gap="sm" className="pt-2">
          <Avatar src={course.instructorAvatarUrl} radius="xl" />
          <div>
            <p className="font-medium">{course.instructorName}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {course.instructorProfessionalTitle}
            </p>
          </div>
        </Group>

        {course.status === "Pending" && (
          <Group justify="end" className="pt-3">
            <Button color="green" variant="light" size="xs" onClick={onApprove}>
              Approve
            </Button>
            <Button color="red" variant="light" size="xs" onClick={onReject}>
              Reject
            </Button>
          </Group>
        )}
      </div>
    </div>
  );
}
