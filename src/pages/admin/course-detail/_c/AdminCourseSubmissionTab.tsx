import { Badge, Paper, Stack, Text, Timeline, Title } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import dayjs from "dayjs";
import { CourseApprovalHistoryVm } from "../../../../react-query/course/course.types";

interface Props {
  history: CourseApprovalHistoryVm[];
}

const AdminCourseSubmissionTab = ({ history }: Props) => {
  if (!history || history.length === 0) {
    return (
      <Paper withBorder p="lg" radius="md" mt="md">
        <Text c="dimmed" ta="center">
          No approval history found for this course.
        </Text>
      </Paper>
    );
  }

  return (
    <Paper withBorder p="lg" radius="md" mt="md">
      <Title order={4} mb="md">
        Approval History
      </Title>

      <Timeline active={history.length} bulletSize={26} lineWidth={3}>
        {[...history]
          .sort((a, b) => dayjs(a.createdAt).diff(dayjs(b.createdAt)))
          .map((item) => {
            const isApproved = item.isApproved;

            return (
              <Timeline.Item
                key={item.id}
                bullet={isApproved ? <IconCheck size={14} /> : <IconX size={14} />}
                title={
                  <Stack gap={2}>
                    <Text fw={500}>
                      {isApproved ? "Approved" : "Rejected"} –{" "}
                      <Badge
                        size="sm"
                        color={isApproved ? "green" : "red"}
                        variant="light"
                        radius="sm"
                      >
                        {dayjs(item.createdAt).fromNow()}
                      </Badge>
                    </Text>
                    <Text size="xs" c="dimmed">
                      {dayjs(item.createdAt).format("MMM D, YYYY • HH:mm")}
                    </Text>
                  </Stack>
                }
              >
                <Text c="dimmed" size="sm">
                  {item.note}
                </Text>
              </Timeline.Item>
            );
          })}
      </Timeline>
    </Paper>
  );
};

export default AdminCourseSubmissionTab;
