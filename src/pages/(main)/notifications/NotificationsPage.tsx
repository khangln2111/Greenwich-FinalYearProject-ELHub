import { useState } from "react";
import { Bell, Check, Filter } from "lucide-react";
import { Button, Group, Stack, Badge, Divider, ScrollArea, Loader, Menu } from "@mantine/core";

import {
  NotificationType,
  NotificationVm,
} from "../../../features/notification/notification.types";
import {
  useGetNotifications,
  useGetUnreadNotificationsCount,
  useMarkAllNotificationsAsRead,
} from "../../../features/notification/notification.hooks";
import NotificationCard from "./_c/NotificationCard";

export default function NotificationsPage() {
  const [filterUnread, setFilterUnread] = useState(false);
  const [filterType, setFilterType] = useState<NotificationType | null>(null);

  const { data, isLoading } = useGetNotifications({
    isRead: filterUnread ? false : null,
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
          <Bell className="w-6 h-6 text-indigo-600" />
          <h1 className="text-2xl sm:text-3xl font-bold whitespace-nowrap text-gray-900 dark:text-white">
            Notifications
          </h1>
          {unreadCount && unreadCount > 0 && (
            <Badge radius="full" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </Group>

        <Group>
          <Button
            size="sm"
            variant={filterUnread ? "filled" : "light"}
            onClick={() => setFilterUnread((prev) => !prev)}
          >
            {filterUnread ? "Show All" : "Show Unread"}
          </Button>

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
            leftSection={<Check size={16} />}
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
      <ScrollArea h="70vh">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader size="lg" />
          </div>
        ) : (
          <Stack>
            {data?.items?.length ? (
              data.items.map((n: NotificationVm) => <NotificationCard key={n.id} n={n} />)
            ) : (
              <div className="text-center text-gray-500 py-10">No notifications</div>
            )}
          </Stack>
        )}
      </ScrollArea>
    </div>
  );
}
