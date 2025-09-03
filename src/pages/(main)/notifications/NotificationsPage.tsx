import { Badge, Button, Divider, Group, SegmentedControl, Stack } from "@mantine/core";
import { BellIcon, CheckCheckIcon } from "lucide-react";
import { useState } from "react";

import CenterLoader from "../../../components/CenterLoader/CenterLoader";
import { MultiSelectWithMaxDisplayedItems } from "../../../components/MultiSelectWithMaxDisplayedItems/MultiSelectWithMaxDisplayedItems";
import {
  useGetNotifications,
  useGetUnreadNotificationsCount,
  useMarkAllNotificationsAsRead,
} from "../../../features/notification/notification.hooks";
import {
  NotificationType,
  NotificationVm,
} from "../../../features/notification/notification.types";
import NotificationCard from "./_c/NotificationCard";

export default function NotificationsPage() {
  const [filterUnread, setFilterUnread] = useState<"all" | "unread">("all");
  const [filterTypes, setFilterTypes] = useState<NotificationType[]>([]);

  const { data, isPending } = useGetNotifications({
    isRead: filterUnread === "unread" ? false : null,
    types: filterTypes.length ? filterTypes : null,
    pageSize: 20,
  });

  const { data: unreadCount } = useGetUnreadNotificationsCount();
  const markAllMutation = useMarkAllNotificationsAsRead();

  return (
    <div className="mx-auto">
      {/* Header */}
      <Group justify="space-between" mb="md">
        <Group>
          <BellIcon className="size-8 text-primary stroke-2" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h1>
          {unreadCount && unreadCount > 0 && (
            <Badge radius="full" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </Group>

        <Group>
          {/* Segmented control for All / Unread */}
          <SegmentedControl
            value={filterUnread}
            onChange={(val: string) => setFilterUnread(val as "all" | "unread")}
            data={[
              { label: "All", value: "all" },
              { label: "Unread", value: "unread" },
            ]}
            size="sm"
            radius="lg"
            withItemsBorders
            color="primary"
            className="bg-body"
          />

          {/* Filter by type */}

          {/* MultiSelect filter by type */}
          <div className="min-w-[200px] max-w-[300px]">
            <MultiSelectWithMaxDisplayedItems
              data={[
                {
                  label: "Gift Redeemed",
                  value: NotificationType.GiftRedeemed,
                },
                {
                  label: "Received Gift",
                  value: NotificationType.ReceivedGift,
                },
                {
                  label: "Review Replied",
                  value: NotificationType.ReviewReplied,
                },
                {
                  label: "Order Processed",
                  value: NotificationType.OrderProcessed,
                },
                {
                  label: "Course Updated",
                  value: NotificationType.CourseUpdated,
                },
              ]}
              placeholder="Select types"
              onChange={(vals) => setFilterTypes(vals as NotificationType[])}
              value={filterTypes}
            />
          </div>

          {/* Mark all */}
          <Button
            size="sm"
            leftSection={<CheckCheckIcon size={16} />}
            variant="outline"
            loading={markAllMutation.isPending}
            onClick={() => markAllMutation.mutate()}
          >
            Mark all as read
          </Button>
        </Group>
      </Group>

      <Divider mb="md" />

      {/* List */}
      {isPending ? (
        <CenterLoader height={500} />
      ) : (
        <Stack className="max-w-4xl mx-auto gap-6">
          {data?.items?.length ? (
            data.items.map((n: NotificationVm) => <NotificationCard key={n.id} n={n} />)
          ) : (
            <div className="text-center text-gray-500 py-10">No notifications</div>
          )}
        </Stack>
      )}
    </div>
  );
}
