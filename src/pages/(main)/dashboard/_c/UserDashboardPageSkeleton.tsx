import { Card, SimpleGrid, Skeleton } from "@mantine/core";
import DashboardStatCardSkeleton from "../../../../components/DashboardStatCard/DashboardStatCardSkeleton";

const UserDashboardPageSkeleton = () => {
  return (
    <div className="mt-6">
      {/* STAT CARDS */}
      <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }} spacing="md" mt="lg">
        {Array.from({ length: 6 }).map((_, idx) => (
          <DashboardStatCardSkeleton key={idx} />
        ))}
      </SimpleGrid>

      {/* Charts: Course Distribution by Level + Conversion Funnel */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mt="lg">
        {Array.from({ length: 2 }).map((_, idx) => (
          <Card key={idx} withBorder radius="2xl" p="lg" className="shadow-md dark:bg-gray-900">
            <Skeleton height={24} width="60%" mb="md" />
            <Skeleton height={350} radius="lg" />
          </Card>
        ))}
      </SimpleGrid>

      {/* Info by Category */}
      <Card withBorder radius="2xl" p="lg" mt="lg" className="shadow-md dark:bg-gray-900">
        <Skeleton height={24} width="50%" mb="md" />
        <Skeleton height={350} radius="lg" />
      </Card>

      {/* Completion Progress + Rating Distribution */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mt="lg">
        {/* Progress */}
        <Card
          withBorder
          radius="2xl"
          p="lg"
          className="shadow-md dark:bg-gray-900 flex justify-center items-center"
        >
          <Skeleton height={250} width={250} circle />
        </Card>

        {/* Rating Distribution */}
        <Card withBorder radius="2xl" p="lg" className="shadow-md dark:bg-gray-900">
          <Skeleton height={24} width="50%" mb="md" />
          <Skeleton height={280} radius="lg" />
        </Card>
      </SimpleGrid>
    </div>
  );
};

export default UserDashboardPageSkeleton;
