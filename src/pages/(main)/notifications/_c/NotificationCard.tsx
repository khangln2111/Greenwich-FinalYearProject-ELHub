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
    icon: <FileText size={18} />,
    bg: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300",
  },
  CourseApproved: {
    label: "Course Approved",
    icon: <CheckCircle2 size={18} />,
    bg: "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-300",
  },
  CourseRejected: {
    label: "Course Rejected",
    icon: <XCircle size={18} />,
    bg: "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300",
  },
  CourseResubmitted: {
    label: "Course Resubmitted",
    icon: <FileText size={18} />,
    bg: "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-300",
  },
  ReceivedGift: {
    label: "Received Gift",
    icon: <Gift size={18} />,
    bg: "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300",
  },
  GiftRedeemed: {
    label: "Gift Redeemed",
    icon: <GiftIcon size={18} />,
    bg: "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300",
  },
  ReviewCreated: {
    label: "Review Created",
    icon: <Star size={18} />,
    bg: "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300",
  },
  ReviewReplied: {
    label: "Review Replied",
    icon: <MessageSquare size={18} />,
    bg: "bg-teal-100 text-teal-600 dark:bg-teal-500/20 dark:text-teal-300",
  },
  OrderConfirmed: {
    label: "Order Confirmed",
    icon: <ShoppingCart size={18} />,
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
      className={`transition shadow-sm hover:shadow-md ${
        n.isRead ? "bg-white dark:bg-dark-6" : "bg-indigo-50 dark:bg-dark-5" }`}
    >
      <Group align="flex-start" justify="space-between" wrap="nowrap">
        {/* Icon */}
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${cfg.bg}`}
        >
          {cfg.icon}
        </div>

        {/* Nội dung */}
        <div className="flex-1 min-w-0 ml-2">
          <Group gap="xs" mb={4}>
            <Badge variant="light" color="gray" size="sm">
              {cfg.label}
            </Badge>
            {!n.isRead && (
              <Badge color="red" size="sm" radius="sm">
                New
              </Badge>
            )}
          </Group>
          <Text fw={600} size="sm" className="line-clamp-1">
            {n.title}
          </Text>
          <Text size="sm" c="dimmed" className="line-clamp-2">
            {n.body}
          </Text>
          <Text size="xs" c="gray" mt={4}>
            {dayjs(n.createdAt).format("DD/MM/YYYY HH:mm")}
          </Text>
        </div>

        {/* Action */}
        {!n.isRead && (
          <Button
            size="xs"
            variant="subtle"
            onClick={() => markMutation.mutate()}
            loading={markMutation.isPending}
          >
            Mark
          </Button>
        )}
      </Group>
    </Card>
  );
}
