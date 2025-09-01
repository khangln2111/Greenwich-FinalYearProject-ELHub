import { Card, Group, Badge, Button, Text } from "@mantine/core";
import {
  CheckCircle2,
  XCircle,
  FileText,
  Gift,
  GiftIcon,
  Star,
  MessageSquare,
  ShoppingCart,
} from "lucide-react";
import dayjs from "dayjs";
import { useMarkNotificationAsRead } from "../../../../features/notification/notification.hooks";
import {
  NotificationType,
  NotificationVm,
} from "../../../../features/notification/notification.types";

const typeConfig: Record<NotificationType, { label: string; icon: React.ReactNode; bg: string }> = {
  CourseSubmitted: {
    label: "Course Submitted",
    icon: <FileText size={20} />,
    bg: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300",
  },
  CourseApproved: {
    label: "Course Approved",
    icon: <CheckCircle2 size={20} />,
    bg: "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-300",
  },
  CourseRejected: {
    label: "Course Rejected",
    icon: <XCircle size={20} />,
    bg: "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300",
  },
  CourseResubmitted: {
    label: "Course Resubmitted",
    icon: <FileText size={20} />,
    bg: "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-300",
  },
  ReceivedGift: {
    label: "Received Gift",
    icon: <Gift size={20} />,
    bg: "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300",
  },
  GiftRedeemed: {
    label: "Gift Redeemed",
    icon: <GiftIcon size={20} />,
    bg: "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300",
  },
  ReviewCreated: {
    label: "Review Created",
    icon: <Star size={20} />,
    bg: "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300",
  },
  ReviewReplied: {
    label: "Review Replied",
    icon: <MessageSquare size={20} />,
    bg: "bg-teal-100 text-teal-600 dark:bg-teal-500/20 dark:text-teal-300",
  },
  OrderConfirmed: {
    label: "Order Confirmed",
    icon: <ShoppingCart size={20} />,
    bg: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-300",
  },
};

export default function NotificationCard({ n }: { n: NotificationVm }) {
  const markMutation = useMarkNotificationAsRead(n.id);
  const cfg = typeConfig[n.type];

  return (
    <Card
      withBorder
      radius="lg"
      className={`transition shadow-sm hover:shadow-md p-4 ${
        n.isRead ? "bg-white dark:bg-dark-6" : "border-l-4 border-primary" }`}
    >
      <Group align="flex-start" wrap="nowrap" gap="md">
        {/* Icon */}
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full shrink-0 ${cfg.bg}`}
        >
          {cfg.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <Group gap="xs" mb={6}>
            <Badge variant="default" color="gray" size="sm">
              {cfg.label}
            </Badge>
            {!n.isRead && (
              <Badge variant="light" autoContrast size="sm" radius="sm">
                New
              </Badge>
            )}
          </Group>

          {/* Title */}
          <Text fw={600} className="truncate dark:text-white text-md md:text-lg">
            {n.title}
          </Text>

          {/* Content */}
          {n.content && (
            <Text c="dimmed" mt={2} className="line-clamp-2 text-sm md:text-md">
              {n.content}
            </Text>
          )}

          {/* Footer: time + action */}
          <Group justify="space-between" mt={8}>
            <Text className="text-xs md:text-sm" c="gray">
              {dayjs(n.createdAt).format("DD/MM/YYYY HH:mm")}
            </Text>

            {!n.isRead && (
              <Button
                size="sm"
                variant="subtle"
                onClick={() => markMutation.mutate()}
                loading={markMutation.isPending}
              >
                Mark as read
              </Button>
            )}
          </Group>
        </div>
      </Group>
    </Card>
  );
}
