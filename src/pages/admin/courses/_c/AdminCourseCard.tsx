import { Avatar, Badge, Button, Group, Title } from "@mantine/core";
import { CourseStatus } from "../../../../react-query/course/course.types";

interface AdminCourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  status: CourseStatus;
  instructorName: string;
  instructorAvatarUrl: string | null;
  instructorProfessionalTitle: string | null;
  onApprove: () => void;
  onReject: () => void;
}

export default function AdminCourseCard({
  title,
  imageUrl,
  status,
  instructorName,
  instructorAvatarUrl,
  instructorProfessionalTitle,
  onApprove,
  onReject,
}: AdminCourseCardProps) {
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white dark:bg-zinc-900">
      <img src={imageUrl} alt={title} className="w-full h-[180px] object-cover" />
      <div className="p-4 space-y-2">
        <Title order={4}>{title}</Title>

        <Group gap="xs">
          <Badge
            color={
              status === "Published"
                ? "green"
                : status === "Rejected"
                  ? "red"
                  : status === "Pending"
                    ? "yellow"
                    : "gray"
            }
            variant="light"
            size="sm"
          >
            {status}
          </Badge>
        </Group>

        <Group gap="sm" className="pt-2">
          <Avatar src={instructorAvatarUrl} radius="xl" />
          <div>
            <p className="font-medium">{instructorName}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {instructorProfessionalTitle}
            </p>
          </div>
        </Group>

        {status === "Pending" && (
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
