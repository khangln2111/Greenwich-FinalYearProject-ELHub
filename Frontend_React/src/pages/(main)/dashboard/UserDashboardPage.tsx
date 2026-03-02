import { Button, Title } from "@mantine/core";
import { RefreshCwIcon } from "lucide-react";
import { useGetUserDashboard } from "../../../features/userDashboard/userDashboard.hooks";
import { usePageSEO } from "../../../hooks/usePageSEO";
import UserDashboardInfo from "./_c/UserDashboardInfo";
import UserDashboardPageSkeleton from "./_c/UserDashboardPageSkeleton";

export default function UserDashboardPage() {
  usePageSEO({ title: "Personal Dashboard" });

  const { data, isPending, isFetching, isError, refetch: refetchOverview } = useGetUserDashboard();

  if (isError) return <p>Error loading dashboard data</p>;

  return (
    <div>
      {/* page header */}
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Title
              order={2}
              className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white"
            >
              Personal Dashboard
            </Title>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Updated: {new Date().toLocaleString()}
          </span>

          <Button
            onClick={() => refetchOverview()}
            leftSection={<RefreshCwIcon size={16} />}
            loading={isFetching}
            variant="default"
          >
            Refresh
          </Button>
        </div>
      </div>
      {isPending ? <UserDashboardPageSkeleton /> : <UserDashboardInfo data={data} />}
    </div>
  );
}
