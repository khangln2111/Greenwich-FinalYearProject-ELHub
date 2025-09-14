import { Avatar, Badge, Button, Card, Group, Stack, Text, Tooltip } from "@mantine/core";
import dayjs from "dayjs";
import {
  InstructorApplicationStatus,
  InstructorApplicationVm,
} from "../../../../features/instructorApplication/instructorApplication.types";

const getStatusColor = (status: InstructorApplicationStatus) => {
  switch (status) {
    case InstructorApplicationStatus.Pending:
      return "yellow";
    case InstructorApplicationStatus.Approved:
      return "green";
    case InstructorApplicationStatus.Rejected:
      return "red";
  }
};

interface Props {
  app: InstructorApplicationVm;
  onView: (app: InstructorApplicationVm) => void;
}

const InstructorApplicationCard = ({ app, onView }: Props) => {
  return (
    <Card
      key={app.id}
      shadow="sm"
      padding="lg"
      radius="lg"
      withBorder
      className="relative transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl flex flex-col
        justify-between"
    >
      {/* Absolute badges */}
      <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
        <Badge color={getStatusColor(app.status)} variant="light">
          {app.status}
        </Badge>
        {app.retryCount > 0 && (
          <Tooltip label={`This application has been retried ${app.retryCount} times`} withArrow>
            <Badge color="orange" variant="light">
              Retry #{app.retryCount}
            </Badge>
          </Tooltip>
        )}
      </div>

      {/* Header: Avatar + Name + Email */}
      <Group gap="sm" wrap="nowrap">
        <Avatar src={app.avatarUrl} size="lg" radius="xl" />
        <div className="flex flex-col min-w-0">
          <Text size="md" fw={600} className="truncate">
            {`${app.firstName} ${app.lastName}`}
          </Text>
          <Text size="sm" c="dimmed" className="truncate">
            {app.email}
          </Text>
        </div>
      </Group>

      {/* Body: Professional info */}
      <Stack mt="sm" gap={6}>
        <Text size="sm" lineClamp={1}>
          <strong>Title:</strong> {app.professionalTitle}
        </Text>
        <Text size="sm" lineClamp={3} className="whitespace-pre-line">
          <strong>About:</strong> {app.about}
        </Text>

        <Text size="xs" c="dimmed">
          Submitted: {dayjs(app.createdAt).format("DD/MM/YYYY HH:mm")}
        </Text>
        {app.reviewedAt && (
          <Text size="xs" c="dimmed">
            Reviewed: {dayjs(app.reviewedAt).format("DD/MM/YYYY HH:mm")}
          </Text>
        )}
      </Stack>

      {/* Actions */}
      <Button
        variant="light"
        gradient={{ from: "indigo", to: "cyan" }}
        size="xs"
        fullWidth
        mt="sm"
        onClick={() => onView(app)}
      >
        View full profile
      </Button>
    </Card>
  );
};

export default InstructorApplicationCard;
