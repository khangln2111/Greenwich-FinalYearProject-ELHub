import { Badge, Button, SegmentedControl, Stack } from "@mantine/core";
import { BellIcon, CheckCheckIcon, TagsIcon } from "lucide-react";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsStringEnum,
  parseAsStringLiteral,
  useQueryState,
} from "nuqs";
import CenterLoader from "../../../components/CenterLoader/CenterLoader";
import { MultiSelectWithMaxDisplayedItems } from "../../../components/MultiSelectWithMaxDisplayedItems/MultiSelectWithMaxDisplayedItems";
import NotificationCard from "../../../components/NotificationCard/NotificationCard";
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
import InstructorNotifcationsPageEmptyState from "./_c/InstructorNotifcationsPageEmptyState";
import AppPagination from "../../../components/AppPagination/AppPagination";

export default function InstructorNotificationsPage() {
  const [filterUnread, setFilterUnread] = useQueryState(
    "isRead",
    parseAsStringLiteral(["all", "unread"]).withDefault("all"),
  );

  const [filterTypes, setFilterTypes] = useQueryState(
    "types",
    parseAsArrayOf(parseAsStringEnum(Object.values(NotificationType))).withDefault([]),
  );

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(10));

  const { data, isPending } = useGetNotifications(RoleName.INSTRUCTOR, {
    isRead: filterUnread === "unread" ? false : null,
    types: filterTypes.length ? filterTypes : null,
    pageSize: pageSize,
  });

  const { data: unreadCount } = useGetUnreadNotificationsCount(RoleName.INSTRUCTOR);

  const markAllMutation = useMarkAllNotificationsAsRead();

  return (
    <div className="flex-1 p-6 xl:p-8">
      {/* Header */}
      <div className="flex flex-col gap-x-6 gap-y-5 mb-6">
        {/* Row 1: Title + Mark all */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 mx-auto">
              <BellIcon className="w-7 h-7 sm:w-8 sm:h-8 text-yellow fill-amber-500 stroke-2" />
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Notifications
              </h1>
            </div>
            {unreadCount !== undefined && unreadCount > 0 && (
              <Badge radius="full" color="orange" className="mt-2 sm:mt-0 sm:ml-2">
                {unreadCount}
              </Badge>
            )}
          </div>

          <Button
            size="sm"
            leftSection={<CheckCheckIcon size={16} />}
            variant="subtle"
            loading={markAllMutation.isPending}
            onClick={() => markAllMutation.mutate(RoleName.ADMIN)}
            className="w-full sm:w-auto mt-2 sm:mt-0"
          >
            Mark all as read
          </Button>
        </div>

        {/* Row 2: Filters */}
        <div className="flex flex-col sm:flex-row gap-x-2 gap-y-3 items-stretch sm:items-center sm:justify-between">
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
                { label: "Review Created", value: NotificationType.ReviewCreated },
                { label: "Course Approved", value: NotificationType.CourseApproved },
                { label: "Course Rejected", value: NotificationType.CourseRejected },
              ]}
              inputProps={{
                leftSection: <TagsIcon size={18} />,
              }}
              placeholder="Select types"
              onChange={(vals) => setFilterTypes(vals as NotificationType[])}
              value={filterTypes}
            />
          </div>
        </div>
      </div>

      {/* Notification list */}
      {isPending ? (
        <CenterLoader height={300} />
      ) : (
        <Stack className="mx-auto gap-6">
          {data?.items?.length ? (
            data.items.map((n: NotificationVm) => <NotificationCard key={n.id} n={n} />)
          ) : (
            <InstructorNotifcationsPageEmptyState />
          )}
        </Stack>
      )}

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
