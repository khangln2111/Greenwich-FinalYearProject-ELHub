import { SimpleGrid, Card, Skeleton, Group, Table } from "@mantine/core";
import DashboardStatCardSkeleton from "../../../../components/DashboardStatCard/DashboardStatCardSkeleton";

const InstructorDashboardPageSkeleton = () => {
  return (
    <>
      {/* Stats cards */}
      <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }} spacing="md" mt="lg">
        {Array.from({ length: 6 }).map((_, i) => (
          <DashboardStatCardSkeleton key={i} />
        ))}
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mt="xl">
        {/* Course Status Distribution */}
        <Card
          withBorder
          radius="2xl"
          p="lg"
          className="border border-gray-200 dark:border-gray-700 shadow-sm dark:bg-gray-900"
        >
          <Skeleton height={24} width={200} mb="md" />
          <div className="flex justify-center">
            <Skeleton height={200} width={200} circle />
          </div>
          <Skeleton height={20} width={120} mt="md" mx="auto" />
        </Card>

        {/* Rating Distribution */}
        <Card
          withBorder
          radius="2xl"
          p="lg"
          className="border border-gray-200 dark:border-gray-700 shadow-sm dark:bg-gray-900"
        >
          <Skeleton height={24} width={200} mb="md" />
          <Skeleton height={320} />
        </Card>
      </SimpleGrid>

      {/* Best-seller courses */}
      <Card
        withBorder
        radius="2xl"
        p="lg"
        mt="xl"
        className="border border-gray-200 dark:border-gray-700 shadow-sm dark:bg-gray-900"
      >
        <Group justify="apart" mb="md">
          <Skeleton height={20} width={180} />
          <Skeleton height={20} width={80} radius="xl" />
        </Group>
        <Table.ScrollContainer minWidth={500}>
          <Table withColumnBorders highlightOnHover verticalSpacing="sm" striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ width: 60 }}>
                  <Skeleton height={16} width={16} />
                </Table.Th>
                <Table.Th>
                  <Skeleton height={16} width={120} />
                </Table.Th>
                <Table.Th>
                  <Skeleton height={16} width={80} />
                </Table.Th>
                <Table.Th>
                  <Skeleton height={16} width={60} />
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {Array.from({ length: 5 }).map((_, idx) => (
                <Table.Tr key={idx}>
                  <Table.Td>
                    <Skeleton height={20} width={20} radius="xl" />
                  </Table.Td>
                  <Table.Td>
                    <Skeleton height={16} width={200} />
                  </Table.Td>
                  <Table.Td>
                    <Skeleton height={16} width={80} />
                  </Table.Td>
                  <Table.Td>
                    <Skeleton height={16} width={50} />
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Card>

      {/* Course info by category */}
      <Card
        withBorder
        radius="2xl"
        p="lg"
        mt="xl"
        className="border border-gray-200 dark:border-gray-700 shadow-sm dark:bg-gray-900"
      >
        <Skeleton height={24} width={220} mb="md" />
        <Skeleton height={350} />
      </Card>
    </>
  );
};
export default InstructorDashboardPageSkeleton;
