import { Avatar, Badge, Button, Group, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import CusModal from "../../../../components/CusModal/CusModal";
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
  app: InstructorApplicationVm | null;
  opened: boolean;
  onClose: () => void;
  stackId?: string;
  handleReview: (app: InstructorApplicationVm, approve: boolean) => void;
}

export default function InstructorApplicationViewModal({
  app,
  opened,
  onClose,
  stackId,
  handleReview,
}: Props) {
  if (!app) return null;

  return (
    <CusModal
      title="Application Detail"
      opened={opened}
      onClose={onClose}
      stackId={stackId}
      size="600px"
      footer={
        app?.status === InstructorApplicationStatus.Pending ? (
          <Group justify="flex-end">
            <Button color="red" variant="light" onClick={() => handleReview(app, false)}>
              Reject
            </Button>
            <Button onClick={() => handleReview(app, true)}>Approve</Button>
          </Group>
        ) : undefined
      }
    >
      {app && (
        <Stack align="center" gap="md">
          <Stack align="center" gap={8}>
            <Avatar src={app.avatarUrl} size={100} radius="xl" />

            <Group gap="xs">
              <Badge color={getStatusColor(app.status)} size="md">
                {app.status}
              </Badge>

              {app.retryCount > 0 && (
                <Badge color="orange" variant="light" size="sm">
                  Retry #{app.retryCount}
                </Badge>
              )}
            </Group>
          </Stack>

          <Stack w="100%" gap="xs">
            <Group justify="space-between">
              <Text c="dimmed" size="sm">
                Full Name
              </Text>
              <Text fw={500}>{`${app.firstName} ${app.lastName}`}</Text>
            </Group>

            <Group justify="space-between">
              <Text c="dimmed" size="sm">
                Email
              </Text>
              <Text fw={500}>{app.email}</Text>
            </Group>

            <Group justify="space-between">
              <Text c="dimmed" size="sm">
                Title
              </Text>
              <Text fw={500}>{app.professionalTitle}</Text>
            </Group>

            <Stack gap={4}>
              <Text c="dimmed" size="sm">
                About
              </Text>
              <Text size="sm" className="whitespace-pre-line">
                {app.about}
              </Text>
            </Stack>

            <Group justify="space-between">
              <Text c="dimmed" size="sm">
                Submitted
              </Text>
              <Text size="sm">{dayjs(app.createdAt).format("DD/MM/YYYY HH:mm")}</Text>
            </Group>

            {app.reviewedAt && (
              <Group justify="space-between">
                <Text c="dimmed" size="sm">
                  Reviewed
                </Text>
                <Text size="sm">{dayjs(app.reviewedAt).format("DD/MM/YYYY HH:mm")}</Text>
              </Group>
            )}
          </Stack>
        </Stack>
      )}
    </CusModal>
  );
}
