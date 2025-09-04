import { Badge, Button, SegmentedControl, Stack } from "@mantine/core";
import { BellIcon, CheckCheckIcon } from "lucide-react";
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
import NotificationCard from "./_c/NotificationCard";

export default function NotificationsPage() {
  const [filterUnread, setFilterUnread] = useQueryState(
    "isRead",
    parseAsStringLiteral(["all", "unread"]).withDefault("all"),
  );

  const [filterTypes, setFilterTypes] = useQueryState(
    "types",
    parseAsArrayOf(parseAsStringEnum(Object.values(NotificationType))).withDefault([]),
  );

  const { data, isPending } = useGetNotifications(RoleName.LEARNER, {
    isRead: filterUnread === "unread" ? false : null,
    types: filterTypes.length ? filterTypes : null,
    pageSize: 10,
  });

  const { data: unreadCount } = useGetUnreadNotificationsCount(RoleName.LEARNER);
  const markAllMutation = useMarkAllNotificationsAsRead();

  return (
    <div className="mx-auto w-full px-3 sm:px-4 lg:px-6">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8">
        {/* Row 1: Title + Filter by type */}
        <div className="flex flex-col gap-3 sm:flex-row items-center sm:justify-between">
          {/* Left: Title */}
          <div className="flex items-center gap-2">
            <BellIcon className="size-7 sm:size-8 text-yellow fill-amber-500 stroke-2" />
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Notifications
            </h1>
            {unreadCount !== undefined && unreadCount > 0 && (
              <Badge radius="full" color="red" className="ml-1 sm:ml-2">
                {unreadCount}
              </Badge>
            )}
          </div>

          {/* Right: Mark all as read button */}
          <Button
            size="sm"
            leftSection={<CheckCheckIcon size={16} />}
            variant="filled"
            loading={markAllMutation.isPending}
            onClick={() => markAllMutation.mutate(RoleName.LEARNER)}
            className="w-full sm:w-auto"
          >
            Mark all as read
          </Button>
        </div>

        {/* Row 2: Segmented control + Mark all */}
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <SegmentedControl
            value={filterUnread}
            onChange={(val: string) => setFilterUnread(val as "all" | "unread")}
            data={[
              { label: "All", value: "all" },
              { label: "Unread", value: "unread" },
            ]}
            radius="full"
            withItemsBorders
            color="primary"
            className="bg-body w-full sm:w-auto"
          />

          <div className="flex-1 min-w-[160px] sm:min-w-[220px] sm:max-w-[300px]">
            <MultiSelectWithMaxDisplayedItems
              data={[
                { label: "Gift Redeemed", value: NotificationType.GiftRedeemed },
                { label: "Received Gift", value: NotificationType.ReceivedGift },
                { label: "Review Replied", value: NotificationType.ReviewReplied },
                { label: "Order Processed", value: NotificationType.OrderProcessed },
                { label: "Course Updated", value: NotificationType.CourseUpdated },
              ]}
              placeholder="Select types"
              onChange={(vals) => setFilterTypes(vals as NotificationType[])}
              value={filterTypes}
            />
          </div>
        </div>
      </div>

      {/* List */}
      {isPending ? (
        <CenterLoader height={500} />
      ) : (
        <Stack className="mx-auto gap-6">
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
