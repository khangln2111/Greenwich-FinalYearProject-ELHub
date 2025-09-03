import { Badge, Button, Divider, Group, Menu, SegmentedControl, Stack } from "@mantine/core";
import { BellIcon, CheckCheckIcon, Filter } from "lucide-react";
import { useState } from "react";

import CenterLoader from "../../../components/CenterLoader/CenterLoader";
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
  const [filterType, setFilterType] = useState<NotificationType | null>(null);

  const { data, isPending } = useGetNotifications({
    isRead: filterUnread === "unread" ? false : null,
    types: filterType ? [filterType] : null,
    pageSize: 20,
  });

  const { data: unreadCount } = useGetUnreadNotificationsCount();
  const markAllMutation = useMarkAllNotificationsAsRead();

  return (
    <div className="mx-auto">
      {/* Header */}
      <Group justify="space-between" mb="md">
        <Group>
          <BellIcon className="size-6 text-indigo-600" />
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
            radius="md"
            withItemsBorders
            color="primary"
          />

          {/* Filter by type */}
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button
                size="sm"
                variant={filterType ? "filled" : "light"}
                leftSection={<Filter size={16} />}
              >
                {filterType ?? "All Types"}
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => setFilterType(null)}>All Types</Menu.Item>
              {Object.values(NotificationType).map((t) => (
                <Menu.Item key={t} onClick={() => setFilterType(t)}>
                  {t}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>

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
        <Stack className="max-w-4xl mx-auto">
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
