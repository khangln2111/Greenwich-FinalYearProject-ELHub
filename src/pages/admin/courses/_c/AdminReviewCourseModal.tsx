import { Avatar, Badge, Button, Group, Modal, Stack, Text, Textarea, Title } from "@mantine/core";
import { useEffect, useState } from "react";

interface AdminReviewCourseModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (note: string) => void;
  type: "approve" | "reject" | null;
  loading?: boolean;
  course?: {
    title: string;
    instructorName: string;
    instructorAvatarUrl: string | null;
    instructorProfessionalTitle: string | null;
  };
}

export default function AdminReviewCourseModal({
  opened,
  onClose,
  onSubmit,
  type,
  loading,
  course,
}: AdminReviewCourseModalProps) {
  const [note, setNote] = useState("");

  useEffect(() => {
    if (opened) setNote("");
  }, [opened]);

  const handleSubmit = () => {
    if (note.trim()) {
      onSubmit(note.trim());
    }
  };

  const label = type === "approve" ? "Approval note" : "Rejection reason";

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={type === "approve" ? "Approve Course" : "Reject Course"}
      centered
      size="lg"
      radius="md"
    >
      <Stack gap="md">
        {course ? (
          <div className="border rounded-xl p-4 bg-gray-50 dark:bg-dark-500">
            <Text size="sm" c="dimmed" mb={4}>
              Reviewing course:
            </Text>
            <Title order={4} className="text-lg font-semibold mb-2">
              {course.title}
            </Title>
            <Group gap="sm" align="center">
              <Avatar src={course.instructorAvatarUrl} alt={course.instructorName} radius="xl" />
              <div>
                <Text size="sm" fw={500}>
                  {course.instructorName}
                </Text>
                {course.instructorProfessionalTitle && (
                  <Text size="xs" c="dimmed">
                    {course.instructorProfessionalTitle}
                  </Text>
                )}
              </div>
              <Badge color="gray" variant="light" ml="auto">
                Instructor
              </Badge>
            </Group>
          </div>
        ) : (
          <Text>No course selected</Text>
        )}

        <div>
          <Text fw={500} mb={4}>
            {label}
          </Text>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.currentTarget.value)}
            placeholder="Write your note here..."
            autosize
            minRows={3}
          />
        </div>

        <Group justify="end">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            loading={loading}
            disabled={!note.trim()}
            color={type === "approve" ? "green" : "red"}
          >
            {type === "approve" ? "Approve" : "Reject"}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
