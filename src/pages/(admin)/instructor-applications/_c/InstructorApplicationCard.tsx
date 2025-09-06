import { Avatar, Badge, Button, Card, Group, Stack, Text } from "@mantine/core";
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

export default function InstructorApplicationCard({ app, onView }: Props) {
  return (
    <Card
      key={app.id}
      shadow="md"
      padding="lg"
      radius="lg"
      withBorder
      className="transition-all duration-200 hover:shadow-lg flex flex-col justify-between"
    >
      <Stack gap="sm">
        <Group align="start">
          <Avatar src={app.avatarUrl} size="lg" radius="xl" />
          <div className="flex-1">
            <Text size="md" fw={600} lineClamp={1}>
              {`${app.firstName} ${app.lastName}`}
            </Text>
            <Text size="sm" c="dimmed" lineClamp={1}>
              {app.email}
            </Text>
            <Group gap="xs" mt={4}>
              <Badge color={getStatusColor(app.status)} size="sm" variant="light">
                {app.status}
              </Badge>
              {app.retryCount > 0 && (
                <Badge color="orange" size="sm" variant="light">
                  Retry #{app.retryCount}
                </Badge>
              )}
            </Group>
          </div>
        </Group>

        <Stack gap={6}>
          <Text size="sm" lineClamp={2}>
            <strong>Title:</strong> {app.professionalTitle}
          </Text>
          <Text size="sm" lineClamp={3} className="whitespace-pre-line line-clamp-1">
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
          <Button
            variant="light"
            size="xs"
            onClick={() => {
              onView(app);
            }}
            className="mt-1 self-end"
          >
            View full profile
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
