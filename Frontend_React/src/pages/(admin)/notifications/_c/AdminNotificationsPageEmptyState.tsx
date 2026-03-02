import { Button, Text } from "@mantine/core";
import { BellIcon, InboxIcon } from "lucide-react";
import { Link } from "react-router";

const AdminNotificationsPageEmptyState = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 text-center text-gray-500
        dark:text-gray-400"
    >
      <InboxIcon size={64} className="text-gray-400 mb-4" />
      <Text size="xl" fw={600} className="mb-2">
        No notifications yet
      </Text>
      <Text size="sm" className="mb-6 max-w-xs">
        You're all caught up! Notifications about platform events, new users, and course submissions
        will appear here.
      </Text>
      <Button
        size="md"
        variant="light"
        radius="lg"
        component={Link}
        to="/admin/courses/pending"
        leftSection={<BellIcon size={16} />}
        className="w-full sm:w-auto"
      >
        Browse Courses
      </Button>
    </div>
  );
};

export default AdminNotificationsPageEmptyState;
