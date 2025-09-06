import { BellIcon, InboxIcon } from "lucide-react";
import { Button, Text } from "@mantine/core";
import { Link } from "react-router-dom";
const InstructorNotifcationsPageEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500 dark:text-gray-400">
      <InboxIcon size={64} className="text-gray-300 mb-4" />
      <Text size="xl" fw={600} className="mb-2">
        No notifications yet
      </Text>
      <Text size="sm" className="mb-6 max-w-xs">
        You're all caught up! Notifications about your courses, and sales will appear here.
      </Text>
      <Button
        size="md"
        variant="light"
        radius="lg"
        component={Link}
        to="/instructor/courses"
        leftSection={<BellIcon size={16} />}
      >
        Browse Courses
      </Button>
    </div>
  );
};
export default InstructorNotifcationsPageEmptyState;
