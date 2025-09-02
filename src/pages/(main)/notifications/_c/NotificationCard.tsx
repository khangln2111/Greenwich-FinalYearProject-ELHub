import { Badge, Button, Card, Group, Text } from "@mantine/core";
import dayjs from "dayjs";
import {
  CheckCircle2,
  FileText,
  Gift,
  GiftIcon,
  MessageSquare,
  ShoppingCart,
  Star,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
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
      component={Link}
      to={n.url ?? "#"}
      radius="lg"
      className={`transition shadow-sm hover:shadow-md p-4 ${
        n.isRead ? "bg-white dark:bg-dark-6" : "border-l-4 border-primary" }`}
    >
      <Group align="flex-start" wrap="nowrap" gap="md">
        {/* Icon */}
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full shrink-0 ${cfg.bg} *:stroke-[1.5]`}
        >
          {cfg.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <Group gap="xs" mb={6} justify="space-between">
            <Badge variant="default" color="blue" size="sm">
              {cfg.label}
            </Badge>
            {!n.isRead && (
              <Badge variant="light" color="red">
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

            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                markMutation.mutate();
              }}
              radius="full"
              variant="subtle"
            >
              {n.isRead ? "Mark as unread" : "Mark as read"}
            </Button>
          </Group>
        </div>
      </Group>
    </Card>
  );
}
