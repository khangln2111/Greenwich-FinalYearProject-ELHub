import { Button, Title } from "@mantine/core";
import { RefreshCcwIcon } from "lucide-react";
import { useGetInstructorDashboard } from "../../../features/instructorDashboard/instructorDashboard.hooks";
import { usePageSEO } from "../../../hooks/usePageSEO";
import InstructorDashboardInfo from "./_c/InstructorDashboardInfo";
import InstructorDashboardPageSkeleton from "./_c/InstructorDashboardPageSkeleton";

export default function InstructorDashboardPage() {
  usePageSEO({ title: "Instructor Dashboard" });

  const {
    data,
    isPending,
    isFetching,
    isError,
    refetch: refetchOverview,
  } = useGetInstructorDashboard();

  if (isError) return <p>Error loading dashboard data</p>;

  return (
    <div className="flex-1 p-6 xl:p-8 bg-gray-100 dark:bg-dark-5">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3z">
            <Title
              order={2}
              className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white"
            >
              Instructor Dashboard
            </Title>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Updated: {new Date().toLocaleString()}
          </span>

          <Button
            onClick={() => {
              refetchOverview();
            }}
            leftSection={<RefreshCcwIcon size={16} />}
            loading={isFetching}
            variant="default"
          >
            Refresh
          </Button>
        </div>
      </header>

      {isPending ? <InstructorDashboardPageSkeleton /> : <InstructorDashboardInfo data={data} />}
    </div>
  );
}
