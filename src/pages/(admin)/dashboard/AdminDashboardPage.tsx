import { BarChart, CompositeChart, DonutChart, RadarChart } from "@mantine/charts";
import {
  Badge,
  Button,
  Card,
  Group,
  ScrollArea,
  SemiCircleProgress,
  SimpleGrid,
  Table,
  Text,
  Title,
} from "@mantine/core";
import {
  BookOpen,
  DollarSign,
  Layers,
  RefreshCw,
  ShoppingBag,
  StarIcon,
  UserCheck,
  Users,
} from "lucide-react";
import CenterLoader from "../../../components/CenterLoader";
import { useGetAdminDashboard } from "../../../features/adminDashboard/adminDashboardHooks";
import DashboardStatCard from "./_c/DashboardStatCard";
import { Legend } from "recharts";

const AdminDashboardPage = () => {
  const { data, isPending, isFetching, error, refetch } = useGetAdminDashboard();

  if (isPending) return <CenterLoader height={600} />;
  if (error) return <p>Error loading dashboard data</p>;

  const {
    stats,
    topCourses,
    topInstructors,
    courseDistributionByStatus,
    instructorVerification,
    courseVerification,
    coursesInfoByCategory,
    ratingDistribution,
  } = data;

  return (
    <div className="flex-1 p-6 xl:p-8 bg-gray-100 dark:bg-dark-5">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Title order={2} className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Admin Dashboard
            </Title>
            <span className="text-sm text-gray-500">Overview & insights</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Updated: {new Date().toLocaleString()}
          </span>

          <Button
            leftSection={<RefreshCw className="size-4" />}
            onClick={() => refetch()}
            loading={isFetching}
            variant="default"
          >
            Refresh
          </Button>
        </div>
      </header>

      {/* STAT CARDS */}
      <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }} spacing="md" mt="lg">
        <DashboardStatCard
          title="Published Courses"
          value={stats.totalPublishedCourses}
          growth={stats.totalPublishedCoursesGrowth}
          icon={<BookOpen size={20} />}
          classNames={{
            icon: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
          }}
        />

        <DashboardStatCard
          title="Pending Instructor Applications"
          value={stats.pendingInstructorApplications}
          growth={stats.pendingInstructorApplicationsGrowth}
          icon={<UserCheck size={20} />}
          classNames={{
            icon: "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300",
          }}
        />

        <DashboardStatCard
          title="Categories"
          value={stats.totalCategories}
          icon={<Layers size={20} />}
          classNames={{
            icon: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300",
          }}
        />

        <DashboardStatCard
          title="Total Users"
          value={stats.totalUsers}
          growth={stats.totalUsersGrowth}
          icon={<Users size={20} />}
          classNames={{
            icon: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300",
          }}
        />

        <DashboardStatCard
          title="Courses Sold"
          value={stats.totalCoursesSold}
          growth={stats.totalCoursesSoldGrowth}
          icon={<ShoppingBag size={20} />}
          classNames={{
            icon: "bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300",
          }}
        />

        <DashboardStatCard
          title="Revenue"
          value={stats.totalRevenue}
          prefix="$"
          growth={stats.totalRevenueGrowth}
          icon={<DollarSign size={20} />}
          classNames={{
            icon: "bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300",
          }}
        />

        <DashboardStatCard
          title="Total Instructors"
          value={stats.totalInstructors}
          growth={stats.totalInstructorsGrowth}
          icon={<UserCheck size={20} />}
          classNames={{
            icon: "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300",
          }}
        />

        <DashboardStatCard
          title="Pending Courses"
          value={stats.totalPendingCourses}
          growth={stats.totalPendingCoursesGrowth}
          icon={<BookOpen size={20} />}
          classNames={{
            icon: "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300",
          }}
        />

        <DashboardStatCard
          title="Average Course Rating"
          value={stats.averageCourseRating}
          growth={stats.averageCourseRatingGrowth}
          icon={<StarIcon size={20} />}
          suffix={
            <span className="text-dimmed text-md font-normal ml-2"> ({stats.ratingCount})</span>
          }
          classNames={{
            icon: "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300",
            value: "flex items-center",
          }}
        />
      </SimpleGrid>

      {/* TOP COURSES & INSTRUCTORS */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mt="xl">
        {/* Top Instructors */}
        <Card
          withBorder
          radius="xl"
          p="lg"
          className="shadow-lg hover:shadow-xl transition dark:bg-gray-900"
        >
          <Text size="lg" fw={600} mb="md">
            Top Instructors by revenue
          </Text>
          <div className="overflow-visible">
            <BarChart
              h={300}
              data={topInstructors.map((i) => ({
                instructor: i.instructorName,
                revenue: i.totalRevenue,
              }))}
              tooltipAnimationDuration={600}
              dataKey="instructor"
              orientation="vertical"
              series={[{ name: "revenue", color: "blue.6" }]}
              barProps={{
                radius: 20,
                maxBarSize: 35,
                isAnimationActive: true,
                animationDuration: 1000,
              }}
            />
          </div>
        </Card>

        {/* Best-Seller Courses */}
        <Card
          withBorder
          radius="2xl"
          p="lg"
          className="overflow-hidden shadow-lg hover:shadow-xl transition dark:bg-gray-900"
        >
          <Group justify="apart" mb="md">
            <Text size="lg" fw={700}>
              Best-Seller Courses
            </Text>
            <Badge radius="xl" size="sm">
              Last 30 days
            </Badge>
          </Group>

          <Table.ScrollContainer minWidth={500}>
            <Table withColumnBorders highlightOnHover verticalSpacing="sm" striped>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th style={{ width: 60 }}>#</Table.Th>
                  <Table.Th>Course</Table.Th>
                  <Table.Th style={{ textAlign: "right" }}>Revenue</Table.Th>
                  <Table.Th style={{ textAlign: "right" }}>Sold</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {topCourses.slice(0, 5).map((c, idx: number) => (
                  <Table.Tr
                    key={c.courseId || idx}
                    className="dark:not-hover:bg-gray-900 dark:hover:bg-gray-800"
                  >
                    <Table.Td style={{ width: 60 }}>
                      <Badge color={idx === 0 ? "yellow" : "gray"}>{idx + 1}</Badge>
                    </Table.Td>
                    <Table.Td>{c.title}</Table.Td>
                    <Table.Td style={{ textAlign: "right" }}>
                      ${Number(c.revenue).toLocaleString()}
                    </Table.Td>
                    <Table.Td style={{ textAlign: "right" }}>
                      {Number(c.soldCount).toLocaleString()}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Card>
      </SimpleGrid>

      {/* Course info by Category */}
      <Card
        withBorder
        radius="2xl"
        p="lg"
        mt="xl"
        className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition dark:bg-gray-900"
      >
        <Text size="lg" fw={600} mb="md">
          Course info by Category
        </Text>
        <ScrollArea type="auto" offsetScrollbars>
          <div className="overflow-auto min-w-2xl">
            <CompositeChart
              data={coursesInfoByCategory.slice(0, 10)}
              dataKey="categoryName"
              h={350}
              withLegend
              withTooltip
              maxBarWidth={50}
              strokeWidth={2}
              curveType="natural"
              withPointLabels
              withBarValueLabel
              withDots
              withXAxis
              withYAxis
              yAxisLabel="Revenue ($)"
              withRightYAxis
              yAxisProps={{
                unit: "$",
                yAxisId: "left",
              }}
              rightYAxisProps={{
                yAxisId: "right",
              }}
              barProps={{
                radius: 50,
                isAnimationActive: true,
                animationDuration: 1000,
              }}
              lineProps={{
                isAnimationActive: true,
                animationDuration: 1000,
              }}
              areaProps={{
                isAnimationActive: true,
                animationDuration: 1000,
              }}
              series={[
                {
                  type: "bar",
                  name: "revenue",
                  label: "Revenue ($)",
                  color: "blue.6",
                  yAxisId: "left",
                },
                {
                  type: "line",
                  name: "coursesCount",
                  label: "Number of Courses",
                  color: "green.6",
                  yAxisId: "right",
                },
                {
                  type: "area",
                  name: "coursesSoldCount",
                  label: "Courses Sold",
                  color: "orange.6",
                  yAxisId: "right",
                },
              ]}
            />
          </div>
        </ScrollArea>
      </Card>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mt="xl" className="min-h-[350px]">
        {/* Instructor Verification Progress */}
        <Card
          withBorder
          radius="2xl"
          p="lg"
          className="shadow-lg hover:shadow-xl transition dark:bg-gray-900"
        >
          <Text size="lg" fw={600}>
            Instructor Verification Progress
          </Text>
          <div className="flex-1 self-center flex justify-center items-center">
            <SemiCircleProgress
              transitionDuration={200}
              thickness={20}
              size={300}
              value={instructorVerification.percentageApproved}
              label={
                <div className="text-center">
                  <Text size="sm" c="dimmed">
                    ({instructorVerification.approved}/
                    {instructorVerification.pending + instructorVerification.approved})
                  </Text>
                  <Text fw={600}>{instructorVerification.percentageApproved}% Approved</Text>
                </div>
              }
            />
          </div>
        </Card>

        {/* Course Verification Progress */}
        <Card
          withBorder
          radius="2xl"
          p="lg"
          className="shadow-lg hover:shadow-xl transition dark:bg-gray-900"
        >
          <Text size="lg" fw={600}>
            Course Verification Progress
          </Text>
          <div className="flex-1 self-center flex justify-center items-center">
            <SemiCircleProgress
              filledSegmentColor="violet"
              transitionDuration={600}
              thickness={20}
              size={300}
              value={courseVerification.percentageApproved}
              label={
                <div className="text-center">
                  <Text size="sm" c="dimmed">
                    ({courseVerification.approved}/
                    {courseVerification.pending + courseVerification.approved})
                  </Text>
                  <Text fw={600}>{courseVerification.percentageApproved}% Approved</Text>
                </div>
              }
            />
          </div>
        </Card>
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mt="xl">
        {/* Course Rating Distribution */}
        <Card
          withBorder
          radius="2xl"
          p="lg"
          className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition dark:bg-gray-900"
        >
          <Text size="lg" fw={600} mb="md">
            Rating Distribution
          </Text>
          <RadarChart
            data={ratingDistribution}
            dataKey="star"
            series={[{ name: "count", label: "Ratings", color: "yellow", opacity: 0.2 }]}
            h={320}
            withPolarGrid
            withPolarAngleAxis
            withPolarRadiusAxis
            withTooltip
            withDots
            withLegend
            radarProps={{
              isAnimationActive: true,
              animationDuration: 1000,
            }}
          />
        </Card>

        {/* Course Status Distribution */}
        <Card
          withBorder
          radius="2xl"
          p="lg"
          className="shadow-lg hover:shadow-xl transition dark:bg-gray-900"
        >
          <Text size="lg" fw={600}>
            Course Distribution by Status
          </Text>
          <DonutChart
            withLabelsLine
            withLabels
            chartLabel="Courses by status"
            tooltipAnimationDuration={200}
            labelsType="percent"
            className="flex-1 self-center"
            size={200}
            pieProps={{
              isAnimationActive: true,
              animationDuration: 1000,
            }}
            data={[
              {
                name: "Published",
                value: courseDistributionByStatus.published,
                color: "green.6",
              },
              { name: "Pending", value: courseDistributionByStatus.pending, color: "yellow.6" },
              { name: "Rejected", value: courseDistributionByStatus.rejected, color: "red.6" },
            ]}
            withTooltip
          >
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              formatter={(value) => <span style={{ fontSize: 14 }}>{value}</span>}
            />
          </DonutChart>
        </Card>
      </SimpleGrid>
    </div>
  );
};

export default AdminDashboardPage;
