import { BarChart, DonutChart } from "@mantine/charts";
import {
  Badge,
  Card,
  Group,
  ScrollArea,
  SemiCircleProgress,
  SimpleGrid,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { BookOpen, DollarSign, Layers, ShoppingBag, UserCheck, Users } from "lucide-react";
import CenterLoader from "../../../components/CenterLoader";
import { useGetAdminDashboard } from "../../../features/adminDashboard/adminDashboardHooks";
import DashboardStatCard from "./_c/DashboardStatCard";

const AdminDashboardPage = () => {
  const { data, isPending, error } = useGetAdminDashboard();

  if (isPending) return <CenterLoader />;
  if (error) return <p>Error loading dashboard data</p>;
  if (!data) return null;

  const {
    stats,
    topCourses,
    topInstructors,
    courseStatusDistribution,
    revenueByCategory,
    instructorVerification,
    courseVerification,
  } = data;

  return (
    <div className="flex-1 p-6 xl:p-8 bg-gray-100 dark:bg-dark-5">
      <Title order={2} mb="md">
        Admin Dashboard
      </Title>

      {/* STAT CARDS */}
      <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }} spacing="md">
        <DashboardStatCard
          title="Published Courses"
          value={stats.totalPublishedCourses}
          growth={stats.publishedCoursesGrowth}
          icon={<BookOpen size={20} />}
          iconBgColor="bg-blue-100 dark:bg-blue-900"
          iconColor="text-blue-600 dark:text-blue-300"
        />

        <DashboardStatCard
          title="Pending Applications"
          value={stats.pendingInstructorApplications}
          growth={stats.pendingInstructorApplicationsGrowth}
          icon={<UserCheck size={20} />}
          iconBgColor="bg-yellow-100 dark:bg-yellow-900"
          iconColor="text-yellow-600 dark:text-yellow-300"
        />

        <DashboardStatCard
          title="Categories"
          value={stats.totalCategories}
          icon={<Layers size={20} />}
          iconBgColor="bg-purple-100 dark:bg-purple-900"
          iconColor="text-purple-600 dark:text-purple-300"
        />

        <DashboardStatCard
          title="Total Users"
          value={stats.totalUsers}
          growth={stats.usersGrowth}
          icon={<Users size={20} />}
          iconBgColor="bg-green-100 dark:bg-green-900"
          iconColor="text-green-600 dark:text-green-300"
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
      </SimpleGrid>

      {/* TOP COURSES & INSTRUCTORS */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mt="xl">
        <Card withBorder radius="xl" p="lg" shadow="lg">
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

        <Card withBorder radius="2xl" p="lg" shadow="lg" className="overflow-hidden">
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

      {/* Revenue by Category */}
      <Card withBorder radius="2xl" p="lg" shadow="lg" mt="xl">
        <Text size="lg" fw={600} mb="md">
          Revenue by Category
        </Text>
        <ScrollArea type="auto" offsetScrollbars>
          <div style={{ minWidth: 1000 }}>
            <BarChart
              h={250}
              withLegend
              withBarValueLabel
              tooltipAnimationDuration={200}
              data={revenueByCategory
                .sort((a, b) => b.revenue - a.revenue)
                .slice(0, 8)
                .map((c) => ({
                  category: c.categoryName,
                  revenue: c.revenue,
                }))}
              dataKey="category"
              series={[{ name: "revenue", color: "pink.6" }]}
              barProps={{
                radius: 16,
                isAnimationActive: true,
                animationDuration: 1000,
              }}
            />
          </div>
        </ScrollArea>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-lg mt-xl">
        {/* Course Status Distribution */}
        <Card withBorder radius="2xl" p="lg" shadow="lg" className="mih-[300px]">
          <Text size="lg" fw={600}>
            Course Status Distribution
          </Text>
          <DonutChart
            withLabelsLine
            withLabels
            chartLabel="Courses by status"
            tooltipAnimationDuration={200}
            labelsType="percent"
            size={200}
            className="self-center"
            pieProps={{
              isAnimationActive: true,
              animationDuration: 1000,
            }}
            data={[
              { name: "Published", value: courseStatusDistribution.published, color: "green.6" },
              { name: "Pending", value: courseStatusDistribution.pending, color: "yellow.6" },
              { name: "Rejected", value: courseStatusDistribution.rejected, color: "red.6" },
            ]}
            withTooltip
          />
        </Card>

        {/* Group for 2 progress cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:col-span-2 gap-lg">
          {/* Instructor Verification Progress */}
          <Card withBorder radius="2xl" p="lg" shadow="lg" className="mih-[300px]">
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
          <Card withBorder radius="2xl" p="lg" shadow="lg" className="mih-[300px]">
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
