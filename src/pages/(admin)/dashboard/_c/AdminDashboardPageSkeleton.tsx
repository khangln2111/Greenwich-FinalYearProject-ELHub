import { SimpleGrid, Card, Skeleton } from "@mantine/core";
import DashboardStatCardSkeleton from "../../../../components/DashboardStatCard/DashboardStatCardSkeleton";

const AdminDashboardPageSkeleton = () => {
  return (
    <div className="mt-6">
      {/* STAT CARDS */}
      <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }} spacing="md" mt="lg">
        {Array.from({ length: 9 }).map((_, idx) => (
          <DashboardStatCardSkeleton key={idx} />
        ))}
      </SimpleGrid>

      {/* TOP COURSES & INSTRUCTORS */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mt="xl">
        {Array.from({ length: 2 }).map((_, idx) => (
          <Card key={idx} withBorder radius="xl" p="lg" className="shadow-lg dark:bg-gray-900">
            <Skeleton height={24} width="50%" mb="md" />
            <Skeleton height={200} radius="lg" />
          </Card>
        ))}
      </SimpleGrid>

      {/* Course info by Category */}
      <Card
        withBorder
        radius="2xl"
        p="lg"
        mt="xl"
        className="border border-gray-200 dark:border-gray-700 shadow-lg dark:bg-gray-900"
      >
        <Skeleton height={24} width="50%" mb="md" />
        <Skeleton height={350} radius="lg" />
      </Card>

      {/* Verification Progress */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mt="xl">
        {Array.from({ length: 2 }).map((_, idx) => (
          <Card
            key={idx}
            withBorder
            radius="2xl"
            p="lg"
            className="shadow-lg dark:bg-gray-900 flex justify-center items-center"
          >
            <Skeleton height={300} width={300} circle />
          </Card>
        ))}
      </SimpleGrid>

      {/* Rating & Status Distribution */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mt="xl">
        {Array.from({ length: 2 }).map((_, idx) => (
          <Card key={idx} withBorder radius="2xl" p="lg" className="shadow-lg dark:bg-gray-900">
            <Skeleton height={24} width="50%" mb="md" />
            <Skeleton height={300} radius="lg" />
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default AdminDashboardPageSkeleton;
