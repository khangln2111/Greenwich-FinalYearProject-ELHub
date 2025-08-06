import { Card, Group, SimpleGrid, Text, Title } from "@mantine/core";
import {
  IconUsers,
  IconBook,
  IconCash,
  IconShoppingCart,
  IconStar,
  IconUserPlus,
} from "@tabler/icons-react";
import { LineChart, BarChart, DonutChart, PieChart, RadialBarChart } from "@mantine/charts";

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

const icons = {
  users: <IconUsers size={32} color="teal" />,
  courses: <IconBook size={32} color="violet" />,
  revenue: <IconCash size={32} color="green" />,
  orders: <IconShoppingCart size={32} color="orange" />,
  instructors: <IconUserPlus size={32} color="blue" />,
  rating: <IconStar size={32} color="yellow" />,
};

const StatCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) => (
  <Card withBorder shadow="sm" radius="xl" p="md">
    <Group align="center">
      {icon}
      <div>
        <Text size="lg" fw={700}>
          {value}
        </Text>
        <Text size="sm" c="dimmed">
          {label}
        </Text>
      </div>
    </Group>
  </Card>
);

const AdminAnalyticsPage = () => {
  const {
    totalUsers,
    totalCourses,
    totalRevenue,
    totalOrders,
    averageRating,
    totalInstructors,
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

  return (
    <div className="flex-1 p-6 xl:p-8 bg-gray-100 dark:bg-dark-5">
      <Title order={2} mb="md">
        Admin Dashboard
      </Title>

      {/* STAT CARDS */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, xl: 4 }} spacing="md" mb="xl">
        <StatCard label="Total Users" value={totalUsers} icon={icons.users} />
        <StatCard label="Total Courses" value={totalCourses} icon={icons.courses} />
        <StatCard label="Total Revenue" value={`$${totalRevenue}`} icon={icons.revenue} />
        <StatCard label="Total Orders" value={totalOrders} icon={icons.orders} />
        <StatCard label="Instructors" value={totalInstructors} icon={icons.instructors} />
        <StatCard label="Avg Rating" value={averageRating} icon={icons.rating} />
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

export default AdminAnalyticsPage;
