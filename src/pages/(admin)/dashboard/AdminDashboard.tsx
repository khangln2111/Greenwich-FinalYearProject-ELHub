import { BarChart, DonutChart, LineChart, PieChart, RadialBarChart } from "@mantine/charts";
import { Card, SimpleGrid, Text, Title } from "@mantine/core";
import { BookOpen, DollarSign, Layers, ShoppingBag, UserCheck, Users } from "lucide-react";
import CenterLoader from "../../../components/CenterLoader";
import { useGetAdminDashboard } from "../../../features/adminDashboard/adminDashboardHooks";
import AdminStatCard from "./_c/AdminStatCard";

// 🧪 MOCK DATA
const mockAnalytics = {
  totalUsers: 1234,
  totalCourses: 56,
  totalRevenue: 78945,
  totalOrders: 321,
  averageRating: 4.5,
  totalInstructors: 48,

  revenueByMonth: [
    { month: "Jan", revenue: 5000 },
    { month: "Feb", revenue: 7000 },
    { month: "Mar", revenue: 6500 },
    { month: "Apr", revenue: 8000 },
    { month: "May", revenue: 9500 },
    { month: "Jun", revenue: 7200 },
    { month: "Jul", revenue: 8800 },
  ],
  userByMonth: [
    { month: "Jan", users: 100 },
    { month: "Feb", users: 150 },
    { month: "Mar", users: 120 },
    { month: "Apr", users: 200 },
    { month: "May", users: 180 },
    { month: "Jun", users: 160 },
    { month: "Jul", users: 210 },
  ],
  ordersByMonth: [
    { month: "Jan", orders: 40 },
    { month: "Feb", orders: 55 },
    { month: "Mar", orders: 50 },
    { month: "Apr", orders: 70 },
    { month: "May", orders: 80 },
    { month: "Jun", orders: 65 },
    { month: "Jul", orders: 90 },
  ],
  ratingByMonth: [
    { month: "Jan", rating: 4.1 },
    { month: "Feb", rating: 4.3 },
    { month: "Mar", rating: 4.2 },
    { month: "Apr", rating: 4.4 },
    { month: "May", rating: 4.6 },
    { month: "Jun", rating: 4.5 },
    { month: "Jul", rating: 4.7 },
  ],
  revenueByType: [
    { name: "Course", value: 50000, color: "blue.6" },
    { name: "Subscription", value: 25000, color: "violet.6" },
    { name: "Other", value: 3945, color: "gray.6" },
  ],
  usersByCountry: [
    { country: "US", users: 500 },
    { country: "VN", users: 450 },
    { country: "IN", users: 300 },
    { country: "JP", users: 120 },
    { country: "DE", users: 80 },
  ],
  topCourses: [
    { course: "React", enrollments: 800 },
    { course: "Vue", enrollments: 500 },
    { course: "Angular", enrollments: 300 },
    { course: "NodeJS", enrollments: 250 },
    { course: "TailwindCSS", enrollments: 200 },
  ],
  topInstructors: [
    { name: "John", students: 1500 },
    { name: "Alice", students: 1200 },
    { name: "Bob", students: 900 },
    { name: "Eva", students: 650 },
    { name: "Daniel", students: 500 },
  ],
  instructorRevenue: [
    { name: "John", revenue: 10000 },
    { name: "Alice", revenue: 8500 },
    { name: "Bob", revenue: 6200 },
    { name: "Eva", revenue: 4500 },
    { name: "Daniel", revenue: 3000 },
  ],
  userRoles: [
    { name: "Student", value: 80, color: "teal.6" },
    { name: "Instructor", value: 15, color: "orange.6" },
    { name: "Admin", value: 5, color: "red.6" },
  ],
  enrollmentSuccessRate: [
    { name: "Success", value: 90, color: "green.6" },
    { name: "Failed", value: 10, color: "red.6" },
  ],
  ageDistribution: [
    { name: "18-24", value: 31.47, color: "blue.7" },
    { name: "25-29", value: 26.69, color: "orange.6" },
    { name: "30-34", value: 15.69, color: "yellow.7" },
    { name: "35-39", value: 8.22, color: "cyan.6" },
    { name: "40-49", value: 8.63, color: "green.6" },
    { name: "50+", value: 2.63, color: "pink.6" },
    { name: "unknown", value: 6.67, color: "gray.6" },
  ],
};

const AdminDashboard = () => {
  const {
    revenueByMonth,
    userByMonth,
    ordersByMonth,
    ratingByMonth,
    topCourses,
    topInstructors,
    instructorRevenue,
    revenueByType,
    usersByCountry,
    userRoles,
    enrollmentSuccessRate,
    ageDistribution,
  } = mockAnalytics;

  const { data, isPending, error } = useGetAdminDashboard();

  if (isPending) return <CenterLoader />;

  if (error) return <p>Error loading dashboard data</p>;

  const { stats } = data;
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

      {/* MAIN CHARTS */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mb="xl">
        <Card withBorder radius="xl" p="lg" shadow="sm">
          <Text size="lg" fw={600} mb="md">
            Monthly Revenue
          </Text>
          <LineChart
            h={250}
            lineProps={{
              isAnimationActive: true,
            }}
            data={revenueByMonth}
            dataKey="month"
            series={[{ name: "revenue", color: "blue.6" }]}
            curveType="monotone"
            gridAxis="xy"
          />
        </Card>

        <Card withBorder radius="xl" p="lg" shadow="sm">
          <Text size="lg" fw={600} mb="md">
            New Users per Month
          </Text>
          <LineChart
            h={250}
            data={userByMonth}
            lineProps={{
              isAnimationActive: true,
            }}
            dataKey="month"
            series={[{ name: "users", color: "green.6" }]}
            curveType="monotone"
            gridAxis="xy"
          />
        </Card>
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mb="xl">
        <Card withBorder radius="xl" p="lg" shadow="sm">
          <Text size="lg" fw={600} mb="md">
            Orders by Month
          </Text>
          <LineChart
            h={250}
            lineProps={{
              isAnimationActive: true,
            }}
            data={ordersByMonth}
            dataKey="month"
            series={[{ name: "orders", color: "orange.6" }]}
            curveType="monotone"
          />
        </Card>

        <Card withBorder radius="xl" p="lg" shadow="sm">
          <Text size="lg" fw={600} mb="md">
            Average Rating by Month
          </Text>
          <LineChart
            h={250}
            data={ratingByMonth}
            lineProps={{
              isAnimationActive: true,
            }}
            dataKey="month"
            series={[{ name: "rating", color: "yellow.6" }]}
            curveType="monotone"
          />
        </Card>
      </SimpleGrid>

      {/* ENROLLMENT & DEMOGRAPHIC */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mb="xl">
        <Card withBorder radius="xl" p="lg" shadow="sm">
          <Text size="lg" fw={600} mb="md">
            Enrollment Success Rate
          </Text>
          <PieChart
            data={enrollmentSuccessRate}
            withLabels
            pieProps={{
              isAnimationActive: true,
            }}
          />
        </Card>

        <Card withBorder radius="xl" p="lg" shadow="sm">
          <Text size="lg" fw={600} mb="md">
            Age Distribution
          </Text>
          <RadialBarChart
            h={260}
            data={ageDistribution}
            dataKey="value"
            withLabels
            radialBarProps={{
              isAnimationActive: true,

              dataKey: "value",
            }}
          />
        </Card>
      </SimpleGrid>

      {/* ROLE, TYPE, COUNTRY */}
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" mb="xl">
        <Card withBorder radius="xl" p="lg" shadow="sm">
          <Text size="lg" fw={600} mb="md">
            User Role Distribution
          </Text>
          <DonutChart data={userRoles} withLabels pieProps={{ isAnimationActive: true }} />
        </Card>

        <Card withBorder radius="xl" p="lg" shadow="sm">
          <Text size="lg" fw={600} mb="md">
            Revenue by Type
          </Text>
          <PieChart data={revenueByType} withLabels pieProps={{ isAnimationActive: true }} />
        </Card>

        <Card withBorder radius="xl" p="lg" shadow="sm">
          <Text size="lg" fw={600} mb="md">
            Users by Country
          </Text>
          <BarChart
            h={260}
            data={usersByCountry}
            dataKey="country"
            series={[{ name: "users", color: "teal.6" }]}
            barProps={{ isAnimationActive: true }}
          />
        </Card>
      </SimpleGrid>

      {/* TOP COURSES & INSTRUCTORS */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        <Card withBorder radius="xl" p="lg" shadow="sm">
          <Text size="lg" fw={600} mb="md">
            Top Courses by Enrollment
          </Text>
          <BarChart
            h={250}
            data={topCourses}
            dataKey="course"
            series={[{ name: "enrollments", color: "violet.6" }]}
            barProps={{ isAnimationActive: true }}
          />
        </Card>

        <Card withBorder radius="xl" p="lg" shadow="sm">
          <Text size="lg" fw={600} mb="md">
            Top Instructors by Students
          </Text>
          <BarChart
            h={250}
            data={topInstructors}
            dataKey="name"
            series={[{ name: "students", color: "blue.6" }]}
            barProps={{ isAnimationActive: true }}
          />
        </Card>
      </SimpleGrid>

      <Card withBorder radius="xl" p="lg" shadow="sm" mt="xl">
        <Text size="lg" fw={600} mb="md">
          Instructor Revenue Distribution
        </Text>
        <BarChart
          h={250}
          data={instructorRevenue}
          dataKey="name"
          series={[{ name: "revenue", color: "green.6" }]}
          barProps={{ isAnimationActive: true }}
        />
      </Card>
    </div>
  );
};

export default AdminDashboard;
