import { BarChart, DonutChart, LineChart, PieChart, RadialBarChart } from "@mantine/charts";
import { Badge, Card, Group, SimpleGrid, Table, Text, Title } from "@mantine/core";
import { BookOpen, DollarSign, Layers, ShoppingBag, UserCheck, Users } from "lucide-react";
import CenterLoader from "../../../components/CenterLoader";
import { useGetAdminDashboard } from "../../../features/adminDashboard/adminDashboardHooks";
import AdminStatCard from "./_c/AdminStatCard";

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
    revenueByMonth,
    instructorVerification,
    courseVerification,
  } = data;

  return (
    <div className="flex-1 p-6 xl:p-8 bg-gray-100 dark:bg-dark-5">
      <Title order={2} mb="md">
        Admin Dashboard
      </Title>

      {/* STAT CARDS */}
      <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }} spacing="md" mb="xl">
        <AdminStatCard
          title="Published Courses"
          value={stats.totalPublishedCourses}
          growth={stats.publishedCoursesGrowth}
          icon={<BookOpen size={20} />}
          iconBgColor="bg-blue-100 dark:bg-blue-900"
          iconColor="text-blue-600 dark:text-blue-300"
        />

        <AdminStatCard
          title="Pending Applications"
          value={stats.pendingInstructorApplications}
          growth={stats.pendingInstructorApplicationsGrowth}
          icon={<UserCheck size={20} />}
          iconBgColor="bg-yellow-100 dark:bg-yellow-900"
          iconColor="text-yellow-600 dark:text-yellow-300"
        />

        <AdminStatCard
          title="Categories"
          value={stats.totalCategories}
          icon={<Layers size={20} />}
          iconBgColor="bg-purple-100 dark:bg-purple-900"
          iconColor="text-purple-600 dark:text-purple-300"
        />

        <AdminStatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          growth={stats.usersGrowth}
          icon={<Users size={20} />}
          iconBgColor="bg-green-100 dark:bg-green-900"
          iconColor="text-green-600 dark:text-green-300"
        />

        <AdminStatCard
          title="Courses Sold"
          value={stats.totalCoursesSold.toLocaleString()}
          growth={stats.coursesSoldGrowth}
          icon={<ShoppingBag size={20} />}
          iconBgColor="bg-pink-100 dark:bg-pink-900"
          iconColor="text-pink-600 dark:text-pink-300"
        />

        <AdminStatCard
          title="Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          growth={stats.revenueGrowth}
          icon={<DollarSign size={20} />}
          iconBgColor="bg-emerald-100 dark:bg-emerald-900"
          iconColor="text-emerald-600 dark:text-emerald-300"
        />
      </SimpleGrid>

      {/* TOP COURSES & INSTRUCTORS */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        <Card withBorder radius="xl" p="lg" shadow="sm">
          <Text size="lg" fw={600} mb="md">
            Top Instructors
          </Text>
          <BarChart
            h={250}
            data={topInstructors.map((i) => ({
              instructor: i.instructorName,
              revenue: i.totalRevenue,
            }))}
            dataKey="instructor"
            orientation="vertical"
            series={[{ name: "revenue", color: "blue.6" }]}
            barProps={{
              radius: 20,
              maxBarSize: 35,
            }}
          />
        </Card>

        <Card withBorder radius="2xl" p="lg" shadow="md" className="overflow-hidden">
          <Group justify="apart" mb="md">
            <Text size="lg" fw={700}>
              Top 5 Best-Seller Courses
            </Text>
            <Badge radius="xl" size="sm">
              Last 30 days
            </Badge>
          </Group>

          <Table withColumnBorders highlightOnHover verticalSpacing="sm" striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ width: 60 }}>#</Table.Th>
                <Table.Th>Course</Table.Th>
                <Table.Th style={{ textAlign: "right" }}>Revenue</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {topCourses.slice(0, 5).map((c: any, idx: number) => (
                <Table.Tr key={c.courseId || c.id || idx}>
                  <Table.Td style={{ width: 60 }}>
                    <Badge color={idx === 0 ? "yellow" : "gray"}>{idx + 1}</Badge>
                  </Table.Td>
                  <Table.Td>{c.title}</Table.Td>
                  <Table.Td style={{ textAlign: "right" }}>
                    ${Number(c.revenue).toLocaleString()}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card>
      </SimpleGrid>

      {/* REVENUE BY MONTH */}
      <Card withBorder radius="xl" p="lg" shadow="sm" mt="xl">
        <Text size="lg" fw={600} mb="md">
          Revenue by Month
        </Text>
        <LineChart
          h={300}
          data={revenueByMonth.map((x) => ({
            month: `${x.month}/${x.year}`,
            revenue: x.revenue,
          }))}
          dataKey="month"
          series={[{ name: "revenue", color: "blue.6" }]}
          curveType="monotone"
          gridAxis="xy"
        />
      </Card>

      {/* COURSE STATUS DISTRIBUTION & REVENUE BY CATEGORY */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mt="xl">
        <Card withBorder radius="xl" p="lg" shadow="sm">
          <Text size="lg" fw={600} mb="md">
            Course Status Distribution
          </Text>
          <DonutChart
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
            ]}
            withLabels
          />
        </Card>

        <Card withBorder radius="xl" p="lg" shadow="sm">
          <Text size="lg" fw={600} mb="md">
            Revenue by Category
          </Text>
          <PieChart
            data={revenueByCategory.map((x, i) => ({
              name: x.categoryName,
              value: x.revenue,
              color: ["blue.6", "violet.6", "teal.6", "orange.6", "pink.6"][i % 5],
            }))}
            withLabels
          />
        </Card>
      </SimpleGrid>

      {/* VERIFICATION PROGRESS */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mt="xl">
        <Card withBorder radius="xl" p="lg" shadow="sm">
          <Text size="lg" fw={600} mb="md">
            Instructor Verification
          </Text>
          <RadialBarChart
            h={260}
            data={[
              {
                name: "Approved",
                value: instructorVerification.approved,
                color: "emerald.6",
              },
              {
                name: "Pending",
                value: instructorVerification.pending,
                color: "yellow.6",
              },
            ]}
            dataKey="value"
            withLabels
          />
          <Text mt="sm" size="sm" c="dimmed">
            {instructorVerification.percentageApproved}% approved
          </Text>
        </Card>

        <Card withBorder radius="xl" p="lg" shadow="sm">
          <Text size="lg" fw={600} mb="md">
            Course Verification
          </Text>
          <RadialBarChart
            h={260}
            data={[
              {
                name: "Approved",
                value: courseVerification.approved,
                color: "blue.6",
              },
              {
                name: "Pending",
                value: courseVerification.pending,
                color: "orange.6",
              },
            ]}
            dataKey="value"
            withLabels
          />
          <Text mt="sm" size="sm" c="dimmed">
            {courseVerification.percentageApproved}% approved
          </Text>
        </Card>
      </SimpleGrid>
    </div>
  );
};

export default AdminDashboardPage;
