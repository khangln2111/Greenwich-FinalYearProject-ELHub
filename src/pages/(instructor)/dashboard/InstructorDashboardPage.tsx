import { CompositeChart, DonutChart, RadarChart } from "@mantine/charts";
import {
  Badge,
  Button,
  Card,
  Group,
  ScrollArea,
  SimpleGrid,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { BookOpen, DollarSign, RefreshCcw, ShoppingBag, Star, User } from "lucide-react";
import DashboardStatCard from "../../(admin)/dashboard/_c/DashboardStatCard";
import CenterLoader from "../../../components/CenterLoader";
import { useGetInstructorDashboardOverview } from "../../../features/instructorDashboard/instructorDashboardHooks";

const InstructorDashboardPage = () => {
  const {
    data: overviewData,
    isPending: isOverviewPending,
    isFetching: isOverviewFetching,
    error: overviewError,
    refetch: refetchOverview,
  } = useGetInstructorDashboardOverview();

  if (isOverviewPending) return <CenterLoader height={600} />;
  if (overviewError) return <p>Error loading dashboard data</p>;

  const { stats, courseStatusDistribution, topCourses, ratingDistribution, coursesInfoByCategory } =
    overviewData;

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
          classNames={{
            icon: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
          }}
        />

        <DashboardStatCard
          title="Courses Sold"
          value={stats.totalCoursesSold}
          growth={stats.coursesSoldGrowth}
          icon={<ShoppingBag size={20} />}
          classNames={{
            icon: "bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300",
          }}
        />

        <DashboardStatCard
          title="Revenue"
          value={stats.totalRevenue}
          prefix="$"
          growth={stats.revenueGrowth}
          icon={<DollarSign size={20} />}
          classNames={{
            icon: "bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300",
          }}
        />

        <DashboardStatCard
          title="Average Rating"
          value={stats.averageRating}
          growth={stats.averageRatingGrowth}
          suffix={
            <span className="text-dimmed text-md font-normal ml-2"> ({stats.ratingCount})</span>
          }
          icon={<Star size={20} />}
          classNames={{
            icon: "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300",
            value: "items-center flex",
          }}
        />

        <DashboardStatCard
          title="Total Enrollments"
          value={stats.totalEnrollments}
          growth={stats.enrollmentsGrowth}
          icon={<User size={20} />}
          classNames={{
            icon: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300",
          }}
        />

        <DashboardStatCard
          title="Account Balance"
          value={stats.currentBalance}
          prefix="$"
          icon={<DollarSign size={20} />}
          classNames={{
            icon: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300",
          }}
        />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mt="xl">
        {/* Course Status Distribution */}
        <Card
          withBorder
          radius="2xl"
          p="lg"
          className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition"
        >
          <Text size="lg" fw={600}>
            Course Status Distribution
          </Text>
          <DonutChart
            withLabelsLine
            withLabels
            withTooltip
            chartLabel="Courses by status"
            tooltipAnimationDuration={400}
            labelsType="percent"
            size={240}
            className="self-center"
            pieProps={{
              isAnimationActive: true,
              animationDuration: 1000,
            }}
            data={[
              {
                name: "Published",
                value: courseStatusDistribution.published,
                color: "green.6",
              },
              {
                name: "Pending",
                value: courseStatusDistribution.pending,
                color: "yellow.6",
              },
              {
                name: "Rejected",
                value: courseStatusDistribution.rejected,
                color: "red.6",
              },
              {
                name: "Draft",
                value: courseStatusDistribution.draft,
                color: "gray.6",
              },
              {
                name: "Archived",
                value: courseStatusDistribution.archived,
                color: "dark.6",
              },
            ]}
          />
        </Card>

        {/* Course Rating Distribution */}
        <Card
          withBorder
          radius="2xl"
          p="lg"
          className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition"
        >
          <Title order={4} className="mb-3">
            Rating Distribution
          </Title>
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
      </SimpleGrid>

      {/* Best-seller courses */}
      <Card
        withBorder
        radius="2xl"
        p="lg"
        mt="xl"
        className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition"
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
                <Table.Tr key={c.courseId || idx}>
                  <Table.Td style={{ width: 60 }}>
                    <Badge color={idx === 0 ? "yellow" : "gray"}>{idx + 1}</Badge>
                  </Table.Td>
                  <Table.Td>{c.courseTitle}</Table.Td>
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

      {/* composite chart */}

      <Card
        withBorder
        radius="2xl"
        p="lg"
        mt="xl"
        className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition"
      >
        <Title order={4} className="mb-3">
          Course info by Category
        </Title>
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
    </div>
  );
};

export default InstructorDashboardPage;
