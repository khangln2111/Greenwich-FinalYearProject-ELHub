import { Button, Title } from "@mantine/core";
import { RefreshCwIcon } from "lucide-react";
import { useGetAdminDashboard } from "../../../features/adminDashboard/adminDashboard.hooks";
import { usePageSEO } from "../../../hooks/usePageSEO";
import AdminDashboardInfo from "./_c/AdminDashboardInfo";
import AdminDashboardPageSkeleton from "./_c/AdminDashboardPageSkeleton";

export default function AdminDashboardPage() {
  usePageSEO({ title: "Admin Dashboard" });

  const { data, isPending, isFetching, isError, refetch } = useGetAdminDashboard();

  if (isError) return <p>Error loading dashboard data</p>;

  return (
    <div className="flex-1 p-6 xl:p-8 bg-gray-100 dark:bg-dark-5">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Title
              order={1}
              className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white"
            >
              Admin Dashboard
            </Title>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Updated: {new Date().toLocaleString()}
          </span>

          <Button
            leftSection={<RefreshCwIcon className="size-4" />}
            onClick={() => refetch()}
            loading={isFetching}
            variant="default"
          >
            Refresh
          </Button>
        </div>
      </header>

      {isPending ? <AdminDashboardPageSkeleton /> : <AdminDashboardInfo data={data} />}
    </div>
  );
}
