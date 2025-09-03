import { Badge, Button, Card, Group, Text } from "@mantine/core";
import dayjs from "dayjs";
import {
  CheckCheckIcon,
  CheckCircle2,
  EyeClosedIcon,
  FileText,
  Gift,
  GiftIcon,
  MessageSquare,
  ShoppingCart,
  Star,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMarkNotificationAsRead } from "../../../../features/notification/notification.hooks";
import {
  NotificationType,
  NotificationVm,
} from "../../../../features/notification/notification.types";
import { cn } from "../../../../utils/cn";

const typeConfig: Record<NotificationType, { label: string; icon: React.ReactNode; bg: string }> = {
  CourseSubmitted: {
    label: "Course Submitted",
    icon: <FileText size={20} />,
    bg: "bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300",
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
    icon: <Gift size={25} />,
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

  const navigate = useNavigate();

  return (
    <Card
      withBorder
      onClick={() => {
        if (!n.isRead) markMutation.mutate();
        navigate(n.url ?? "#");
      }}
      radius="lg"
      className={cn("relative cursor-pointer transition shadow-md hover:shadow-lg p-4", {
        "border-l-4 border-primary": !n.isRead,
      })}
    >
      <Group align="flex-start" wrap="nowrap" gap="md">
        {/* Icon + Dot indicator */}
        <div className="relative shrink-0">
          <div
            className={cn(
              "flex items-center justify-center size-12 rounded-full *:stroke-[2]",
              cfg.bg,
            )}
          >
            {cfg.icon}
          </div>

          {!n.isRead && (
            <span className="absolute top-0 right-0 flex size-3 items-center justify-center">
              <span className="absolute inline-flex size-2 rounded-full bg-red opacity-75 animate-ping [animation-duration:2s]" />
              <span className="relative inline-flex size-2 rounded-full bg-red" />
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <Group gap="xs" mb={6} justify="space-between">
            <Badge variant="default" color="blue" size="sm">
              {cfg.label}
            </Badge>
          </Group>

          {/* Title */}
          <Text className="truncate font-medium dark:text-white text-md md:text-lg">{n.title}</Text>

          {/* Content */}
          {n.content && (
            <Text
              mt={2}
              className="line-clamp-2 text-sm md:text-md text-gray-600 dark:text-gray-300"
            >
              {n.content}
            </Text>
          )}

          {/* Footer: time + action */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mt-2 mx-auto">
            <Text className="text-xs md:text-sm" c="gray">
              {dayjs(n.createdAt).format("DD/MM/YYYY HH:mm")}
            </Text>

            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                markMutation.mutate();
              }}
              leftSection={n.isRead ? <EyeClosedIcon size={16} /> : <CheckCheckIcon size={16} />}
              radius="full"
              variant="subtle"
              className="self-end"
              loading={markMutation.isPending}
            >
              {n.isRead ? "Mark as unread" : "Mark as read"}
            </Button>
          </div>
        </div>
      </Group>
    </Card>
  );
}
