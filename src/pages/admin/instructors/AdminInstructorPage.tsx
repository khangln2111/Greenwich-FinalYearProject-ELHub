import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Modal,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import dayjs from "dayjs";
import {
  InstructorApplicationVm,
  InstructorApplicationStatus,
} from "../../../react-query/instructorApplication/instructorApplication.types";
import {
  useGetInstructorApplications,
  useReviewInstructorApplication,
} from "../../../react-query/instructorApplication/instructorApplicationHooks";
import CenterLoader from "../../../components/CenterLoader";

const getStatusColor = (status: InstructorApplicationStatus) => {
  switch (status) {
    case "Pending":
      return "gray";
    case "Approved":
      return "green";
    case "Rejected":
      return "red";
  }
};

export default function AdminInstructorPage() {
  const {
    data,
    isPending: isGetInstructorApplicationsPending,
    error,
  } = useGetInstructorApplications();
  const [selectedApp, setSelectedApp] = useState<InstructorApplicationVm | null>(null);
  const [note, setNote] = useState("");
  const [approveMode, setApproveMode] = useState(true);
  const [modalOpened, { open, close }] = useDisclosure(false);

  const { mutate: reviewApplication, isPending } = useReviewInstructorApplication();

  const handleReview = (app: InstructorApplicationVm, isApprove: boolean) => {
    setSelectedApp(app);
    setApproveMode(isApprove);
    setNote("");
    open();
  };

  const handleSubmitReview = () => {
    if (!selectedApp) return;
    reviewApplication(
      {
        id: selectedApp.id,
        isApproved: approveMode,
        note: note,
      },
      {
        onSuccess: close,
      },
    );
  };

  if (isGetInstructorApplicationsPending) return <CenterLoader />;

  if (error) return <Text c="red">Error loading applications: {error.message}</Text>;

  return (
    <div className="flex-1 p-6 xl:p-8">
      <Title order={2} className="mb-6">
        Instructor Applications Review
      </Title>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.items.map((app) => (
          <Card key={app.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Group align="start">
              <Avatar src={app.workAvatarUrl} size={64} radius="xl" />
              <div className="flex-1">
                <Text size="lg" fw={600}>
                  {app.displayName} ({app.fullName})
                </Text>
                <Text size="sm" c="dimmed">
                  {app.email}
                </Text>
                <Badge color={getStatusColor(app.status)} className="mt-1">
                  {app.status}
                </Badge>
              </div>
            </Group>

            <Stack mt="md" gap="xs">
              <Text size="sm">
                <strong>Title:</strong> {app.professionalTitle}
              </Text>
              <Text size="sm">
                <strong>About:</strong> {app.about}
              </Text>
              <Text size="xs" c="dimmed">
                Submitted: {dayjs(app.createdAt).format("DD/MM/YYYY HH:mm")}
              </Text>
            </Stack>

            <Group mt="md" justify="flex-end">
              <Button color="red" variant="light" onClick={() => handleReview(app, false)}>
                Reject
              </Button>
              <Button onClick={() => handleReview(app, true)}>Approve</Button>
            </Group>
          </Card>
        ))}
      </div>

      <Modal
        opened={modalOpened}
        onClose={close}
        title={approveMode ? "Approve Application" : "Reject Application"}
        centered
      >
        <Stack>
          {!approveMode && (
            <Textarea
              label="Rejection Note"
              placeholder="Provide reason for rejection"
              minRows={3}
              value={note}
              onChange={(e) => setNote(e.currentTarget.value)}
              required
            />
          )}
          <Group justify="flex-end">
            <Button variant="subtle" onClick={close} disabled={isPending}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReview}
              loading={isPending}
              color={approveMode ? "green" : "red"}
            >
              Confirm
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
}
