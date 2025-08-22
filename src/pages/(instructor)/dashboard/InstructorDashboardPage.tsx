import { Button, SimpleGrid, Title } from "@mantine/core";
import { BookOpen, DollarSign, RefreshCcw, ShoppingBag, Star, User } from "lucide-react";
import { useState } from "react";
import DashboardStatCard from "../../(admin)/dashboard/_c/DashboardStatCard";
import CenterLoader from "../../../components/CenterLoader";
import {
  useInstructorDashboardOverview,
  useInstructorSalesTrend,
} from "../../../features/instructorDashboard/instructorDashboardHooks";

const InstructorDashboardPage = () => {
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
    endDate: new Date().toISOString(),
  });

  const {
    data: overviewData,
    isPending: isOverviewPending,
    isFetching: isOverviewFetching,
    error: overviewError,
    refetch: refetchOverview,
  } = useInstructorDashboardOverview();

  const {
    data: salesTrendData,
    isPending: isSalesTrendPending,
    refetch: refetchSalesTrend,
  } = useInstructorSalesTrend(dateRange.startDate, dateRange.endDate);

  if (isOverviewPending || isSalesTrendPending) return <CenterLoader />;
  if (overviewError) return <p>Error loading dashboard data</p>;
  if (!overviewData) return null;
  if (!salesTrendData) return <p>Error loading sales trend data</p>;

  const { stats } = overviewData;

  return (
    <div className="flex-1 p-6 xl:p-8 bg-gray-100 dark:bg-dark-5">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Title order={2} className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Instructor Dashboard
            </Title>
            <span className="text-sm text-gray-500">Overview & insights</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Updated: {new Date().toLocaleString()}
          </span>

          <Button
            onClick={() => {
              refetchOverview();
              refetchSalesTrend();
            }}
            leftSection={<RefreshCcw size={16} />}
            loading={isOverviewFetching}
            variant="default"
          >
            Refresh
          </Button>
        </div>
      </header>

      {/* ------------------- STATS CARDS ------------------- */}
      <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }} spacing="md" mt="lg">
        <DashboardStatCard
          title="Published Courses"
          value={stats.totalPublishedCourses}
          growth={stats.publishedCoursesGrowth}
          icon={<BookOpen size={20} />}
          iconBgColor="bg-blue-100 dark:bg-blue-900"
          iconColor="text-blue-600 dark:text-blue-300"
        />

        <DashboardStatCard
          title="Courses Sold"
          value={stats.totalCoursesSold}
          growth={stats.coursesSoldGrowth}
          icon={<ShoppingBag size={20} />}
          iconBgColor="bg-pink-100 dark:bg-pink-900"
          iconColor="text-pink-600 dark:text-pink-300"
        />

        <DashboardStatCard
          title="Revenue"
          value={stats.totalRevenue}
          prefix="$"
          growth={stats.revenueGrowth}
          icon={<DollarSign size={20} />}
          iconBgColor="bg-emerald-100 dark:bg-emerald-900"
          iconColor="text-emerald-600 dark:text-emerald-300"
        />

        <DashboardStatCard
          title="Average Rating"
          value={stats.averageRating}
          growth={stats.averageRatingGrowth}
          icon={<Star size={20} />}
          iconBgColor="bg-yellow-100 dark:bg-yellow-900"
          iconColor="text-yellow-600 dark:text-yellow-300"
        />

        <DashboardStatCard
          title="Total Enrollments"
          value={stats.totalEnrollments}
          growth={stats.enrollmentsGrowth}
          icon={<User size={20} />}
          iconBgColor="bg-purple-100 dark:bg-purple-900"
          iconColor="text-purple-600 dark:text-purple-300"
        />

        <DashboardStatCard
          title="Account Balance"
          value={stats.currentBalance}
          prefix="$"
          icon={<DollarSign size={20} />}
          iconBgColor="bg-gray-100 dark:bg-gray-800"
          iconColor="text-gray-600 dark:text-gray-300"
        />
      </SimpleGrid>
    </div>
  );
};

export default InstructorDashboardPage;
