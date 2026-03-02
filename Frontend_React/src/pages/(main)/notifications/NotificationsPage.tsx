import { Badge, Button, SegmentedControl, Stack, Title } from "@mantine/core";
import { BellIcon, CheckCheckIcon, TagsIcon } from "lucide-react";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsStringEnum,
  parseAsStringLiteral,
  useQueryState,
} from "nuqs";
import AppPagination from "../../../components/AppPagination/AppPagination";
import { MultiSelectWithMaxDisplayedItems } from "../../../components/MultiSelectWithMaxDisplayedItems/MultiSelectWithMaxDisplayedItems";
import NotificationCard from "../../../components/NotificationCard/NotificationCard";
import NotificationCardSkeleton from "../../../components/NotificationCard/NotificationCardSkeleton";
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
import { usePageSEO } from "../../../hooks/usePageSEO";
import NotificationsPageEmptyState from "./_c/NotificationsPageEmptyState";

export default function NotificationsPage() {
  usePageSEO({ title: "Notifications" });

  const [tab, setTab] = useQueryState(
    "isRead",
    parseAsStringLiteral(["all", "unread"]).withDefault("all"),
  );

  const [filterTypes, setFilterTypes] = useQueryState(
    "types",
    parseAsArrayOf(parseAsStringEnum(Object.values(NotificationType))).withDefault([]),
  );

  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ scroll: true }),
  );
  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(10));

  const { data, isPending, isError } = useGetNotifications(RoleName.Learner, {
    isRead: tab === "unread" ? false : null,
    types: filterTypes.length ? filterTypes : null,
    pageSize: pageSize,
    page: page,
  });

  const { data: unreadCount } = useGetUnreadNotificationsCount(RoleName.Learner);
  const markAllMutation = useMarkAllNotificationsAsRead();

  if (isError) {
    return (
      <div className="flex-1 p-4 sm:p-6 xl:p-8">
        <div className="text-center text-red">Failed to load notifications.</div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full px-3 sm:px-4 lg:px-6">
      {/* Header */}
      <div className="flex flex-col gap-y-4 gap-4 mb-8">
        {/* Row 1: Title + Filter by type */}
        <div className="flex flex-col gap-3 sm:flex-row items-center sm:justify-between">
          {/* Left: Title */}
          <div className="flex items-center gap-2">
            <BellIcon className="size-7 sm:size-8 text-yellow fill-amber-500 stroke-2" />
            <Title
              order={1}
              className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
            >
              Notifications
            </Title>

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
            variant="subtle"
            loading={markAllMutation.isPending}
            onClick={() => markAllMutation.mutate(RoleName.Learner)}
            className="w-full sm:w-auto"
          >
            Mark all as read
          </Button>
        </div>

        {/* Row 2: Segmented control + Mark all */}
        <div className="flex flex-col sm:flex-row gap-y-4 gap-2 sm:items-center sm:justify-between">
          <SegmentedControl
            value={tab}
            onChange={(val: string) => {
              setTab(val as "all" | "unread");
              setPage(1);
            }}
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
              inputProps={{
                leftSection: <TagsIcon size={18} />,
              }}
              placeholder="Select types"
              onChange={(vals) => {
                setFilterTypes(vals as NotificationType[]);
                setPage(1);
              }}
              value={filterTypes}
            />
          </div>
        </div>
      </div>

      {/* List */}
      <Stack className="mx-auto gap-6 w-full">
        {isPending ? (
          Array.from({ length: pageSize }).map((_, i) => <NotificationCardSkeleton key={i} />)
        ) : data.items.length > 0 ? (
          data.items.map((n: NotificationVm) => <NotificationCard key={n.id} n={n} />)
        ) : (
          <NotificationsPageEmptyState />
        )}
      </Stack>

      <AppPagination
        page={page}
        pageSize={pageSize}
        itemsCount={data?.count ?? 0}
        onPageChange={setPage}
        withEdges
        className="flex items-center justify-center mt-10"
      />
    </div>
  );
}
