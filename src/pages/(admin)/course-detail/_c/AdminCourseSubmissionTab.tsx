import { Badge, Paper, Stack, Text, Timeline, Title, Group } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import dayjs from "dayjs";
import { CourseApprovalHistoryVm } from "../../../../features/course/course.types";
import { cn } from "../../../../utils/cn";

interface Props {
  history: CourseApprovalHistoryVm[];
  className?: string;
}

const AdminCourseSubmissionTab = ({ history, className }: Props) => {
  const sortedHistory = [...history].sort((a, b) => dayjs(a.createdAt).diff(dayjs(b.createdAt)));

  return (
    <div className={cn("space-y-5", className)}>
      <Title order={2}>Approval History</Title>

      <Paper withBorder p="lg" radius="md">
        {sortedHistory.length === 0 ? (
          <Text c="dimmed" ta="center">
            No approval history found for this course.
          </Text>
        ) : (
          <Timeline active={sortedHistory.length} bulletSize={26} lineWidth={2}>
            {sortedHistory.map((item) => {
              const isApproved = item.isApproved;
              const createdAt = dayjs(item.createdAt);

              return (
                <Timeline.Item
                  key={item.id}
                  bullet={isApproved ? <IconCheck size={14} /> : <IconX size={14} />}
                  title={
                    <Stack gap={3}>
                      <Group gap={6} align="center">
                        <Text fw={500}>{isApproved ? "Approved" : "Rejected"}</Text>
                        <Text c="dimmed" size="sm">
                          –
                        </Text>
                        <Badge
                          size="sm"
                          color={isApproved ? "green" : "red"}
                          variant="light"
                          radius="sm"
                          autoContrast
                        >
                          {createdAt.fromNow()}
                        </Badge>
                      </Group>
                      <Text size="xs" c="dimmed" className="mt-1">
                        {createdAt.format("MMM D, YYYY • HH:mm")}
                      </Text>
                    </Stack>
                  }
                >
                  <Text c="dimmed" fw={500} size="sm">
                    {item.note}
                  </Text>
                </Timeline.Item>
              );
            })}
          </Timeline>
        )}
      </Paper>
    </div>
  );
};

export default AdminCourseSubmissionTab;
