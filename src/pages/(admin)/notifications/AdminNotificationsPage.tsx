import { Badge, Button, SegmentedControl, Stack, Text } from "@mantine/core";
import { BellIcon, CheckCheckIcon, Inbox } from "lucide-react";
import { parseAsArrayOf, parseAsStringEnum, parseAsStringLiteral, useQueryState } from "nuqs";
import CenterLoader from "../../../components/CenterLoader/CenterLoader";
import { MultiSelectWithMaxDisplayedItems } from "../../../components/MultiSelectWithMaxDisplayedItems/MultiSelectWithMaxDisplayedItems";
import { RoleName } from "../../../features/auth/identity.types";
import {
  useGetNotifications,
  useGetUnreadNotificationsCount,
  useMarkAllNotificationsAsRead,
} from "../../../features/notification/notification.hooks";
import {
  NotificationType,
  NotificationVm,
} from "../../../features/notification/notification.types";
import NotificationCard from "../../../components/NotificationCard/NotificationCard";
import { Link } from "react-router-dom";

export default function AdminNotificationsPage() {
  const [filterUnread, setFilterUnread] = useQueryState(
    "isRead",
    parseAsStringLiteral(["all", "unread"]).withDefault("all"),
  );

  const [filterTypes, setFilterTypes] = useQueryState(
    "types",
    parseAsArrayOf(parseAsStringEnum(Object.values(NotificationType))).withDefault([]),
  );

  const { data, isPending } = useGetNotifications(RoleName.ADMIN, {
    isRead: filterUnread === "unread" ? false : null,
    types: filterTypes.length ? filterTypes : null,
    pageSize: 10,
  });

  const { data: unreadCount } = useGetUnreadNotificationsCount(RoleName.ADMIN);

  const markAllMutation = useMarkAllNotificationsAsRead();

  return (
    <div className="flex-1 p-4 sm:p-6 xl:p-8">
      {/* Header */}
      <div className="flex flex-col gap-6 mb-6">
        {/* Row 1: Title + Mark all */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="flex items-center gap-2 mx-auto">
              <BellIcon className="w-7 h-7 sm:w-8 sm:h-8 text-yellow fill-amber-500 stroke-2" />
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Notifications
              </h1>
            </div>
            {unreadCount !== undefined && unreadCount > 0 && (
              <Badge radius="full" color="red" className="mt-2 sm:mt-0 sm:ml-2">
                {unreadCount}
              </Badge>
            )}
          </div>

          <Button
            size="sm"
            leftSection={<CheckCheckIcon size={16} />}
            variant="filled"
            loading={markAllMutation.isPending}
            onClick={() => markAllMutation.mutate(RoleName.ADMIN)}
            className="w-full sm:w-auto mt-2 sm:mt-0"
          >
            Mark all as read
          </Button>
        </div>

        {/* Row 2: Filters */}
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center sm:justify-between">
          <SegmentedControl
            value={filterUnread}
            onChange={(val: string) => setFilterUnread(val as "all" | "unread")}
            data={[
              { label: "All", value: "all" },
              { label: "Unread", value: "unread" },
            ]}
            radius="full"
            withItemsBorders
            size="md"
            className="w-full sm:w-auto"
          />
          <div className="flex-1 min-w-[160px] sm:min-w-[220px] sm:max-w-[300px] mt-2 sm:mt-0">
            <MultiSelectWithMaxDisplayedItems
              data={[
                { label: "Course Submitted", value: NotificationType.CourseSubmitted },
                { label: "Course Resubmitted", value: NotificationType.CourseResubmitted },
                {
                  label: "Instructor Application Submitted",
                  value: NotificationType.InstructorApplicationSubmitted,
                },
                {
                  label: "Instructor Application Resubmitted",
                  value: NotificationType.InstructorApplicationResubmitted,
                },
              ]}
              placeholder="Select types"
              onChange={(vals) => setFilterTypes(vals as NotificationType[])}
              value={filterTypes}
            />
          </div>
        </div>
      </div>

      {/* Notification list */}
      {isPending ? (
        <CenterLoader height={500} />
      ) : data?.items?.length ? (
        <Stack className="mx-auto gap-4 w-full max-w-4xl">
          {data.items.map((n: NotificationVm) => (
            <NotificationCard key={n.id} n={n} />
          ))}
        </Stack>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500 dark:text-gray-400">
          <Inbox size={64} className="text-gray-300 mb-4" />
          <Text size="xl" fw={600} className="mb-2">
            No notifications yet
          </Text>
          <Text size="sm" className="mb-6 max-w-xs">
            You're all caught up! Notifications about platform events, new users, and course
            submissions will appear here.
          </Text>
          <Button
            size="md"
            variant="light"
            radius="lg"
            component={Link}
            to="/admin/users"
            leftSection={<BellIcon size={16} />}
            className="w-full sm:w-auto"
          >
            View Users
          </Button>
        </div>
      )}
    </div>
  );
}
