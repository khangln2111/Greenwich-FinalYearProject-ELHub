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
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import CusModal from "../../../components/CusModal";

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

const reviewSchema = z.object({
  note: z.string().min(1, { message: "Note is required" }),
});

export default function AdminInstructorPage() {
  const {
    data,
    isPending: isGetInstructorApplicationsPending,
    error,
  } = useGetInstructorApplications();
  const [selectedApp, setSelectedApp] = useState<InstructorApplicationVm | null>(null);
  const [approveMode, setApproveMode] = useState(true);
  const [modalOpened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: { note: "" },
    validate: zodResolver(reviewSchema),
  });

  const { mutate: reviewApplication, isPending } = useReviewInstructorApplication();

  const handleReview = (app: InstructorApplicationVm, isApprove: boolean) => {
    setSelectedApp(app);
    setApproveMode(isApprove);
    form.reset(); // reset form when opening modal
    open();
  };

  const handleSubmitReview = () => {
    if (!selectedApp) return;
    const result = form.validate();
    if (!result.hasErrors) {
      reviewApplication(
        {
          id: selectedApp.id,
          isApproved: approveMode,
          note: form.values.note.trim(),
        },
        {
          onSuccess: close,
        },
      );
    }
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
          <Card
            key={app.id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="flex flex-col justify-between"
          >
            <Stack gap="xs">
              {/* Header */}
              <Group align="start">
                <Avatar src={app.workAvatarUrl} size="lg" radius="xl" />
                <div className="flex-1">
                  <Text size="md" fw={600} lineClamp={1}>
                    {app.displayName} ({app.fullName})
                  </Text>
                  <Text size="sm" c="dimmed" lineClamp={1}>
                    {app.email}
                  </Text>
                  <Group gap="xs" mt={4}>
                    <Badge color={getStatusColor(app.status)} size="sm">
                      {app.status}
                    </Badge>
                    {app.retryCount > 0 && (
                      <Badge color="orange" size="sm">
                        Retry #{app.retryCount}
                      </Badge>
                    )}
                  </Group>
                </div>
              </Group>

              {/* Body */}
              <Stack gap={4}>
                <Text size="sm" lineClamp={2}>
                  <strong>Title:</strong> {app.professionalTitle}
                </Text>
                <Text size="sm" lineClamp={3}>
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
            </Stack>

            {/* Footer */}
            <Group mt="md" justify="flex-end">
              <Button color="red" variant="light" onClick={() => handleReview(app, false)}>
                Reject
              </Button>
              <Button onClick={() => handleReview(app, true)}>Approve</Button>
            </Group>
          </Card>
        ))}
      </div>

      <CusModal
        opened={modalOpened}
        onClose={close}
        title={approveMode ? "Approve Application" : "Reject Application"}
        size="400px"
      >
        <form onSubmit={form.onSubmit(handleSubmitReview)}>
          <Stack>
            <Textarea
              size="md"
              label={approveMode ? "Approval Note" : "Rejection Note"}
              placeholder={
                approveMode ? "Provide reason for approval" : "Provide reason for rejection"
              }
              minRows={3}
              {...form.getInputProps("note")}
              required
            />
            <Group justify="flex-end">
              <Button variant="subtle" onClick={close} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" loading={isPending} color={approveMode ? "green" : "red"}>
                Confirm
              </Button>
            </Group>
          </Stack>
        </form>
      </CusModal>
    </div>
  );
}
