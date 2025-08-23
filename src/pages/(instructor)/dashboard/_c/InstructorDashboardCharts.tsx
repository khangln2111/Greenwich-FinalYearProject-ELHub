// components/InstructorDashboardCharts.tsx
import { DonutChart, LineChart, RadarChart } from "@mantine/charts";
import {
  Button,
  Card,
  Divider,
  Group,
  ScrollArea,
  SimpleGrid,
  Table,
  Text,
  Title,
} from "@mantine/core";
import React, { useMemo, useState } from "react";
import CenterLoader from "../../../../components/CenterLoader";
import { InstructorDashboardVm } from "../../../../features/instructorDashboard/instructorDashboard.types";
import { useGetInstructorDashboardTrends } from "../../../../features/instructorDashboard/instructorDashboardHooks";

type Props = {
  overviewData: InstructorDashboardVm;
};

function toIsoDate(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function shortDate(s: string) {
  const d = new Date(s);
  return d.toLocaleDateString();
}

const STATUS_COLORS = ["#3b82f6", "#f59e0b", "#ef4444"];

const InstructorDashboardCharts: React.FC<Props> = ({ overviewData }) => {
  const today = useMemo(() => new Date(), []);
  const thirtyAgo = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d;
  }, []);

  const [startDate, setStartDate] = useState<string>(toIsoDate(thirtyAgo));
  const [endDate, setEndDate] = useState<string>(toIsoDate(today));

  const {
    data: trendsData,
    isPending: isTrendsPending,
    isFetching: isTrendsFetching,
    error: trendsError,
    refetch: refetchTrends,
  } = useGetInstructorDashboardTrends(startDate, endDate);

  const isLoadingAny = isTrendsPending;
  const isFetchingAny = isTrendsFetching;

  const revenueLine = useMemo(
    () =>
      (trendsData?.revenueTrend ?? []).map((p) => ({
        date: shortDate(p.date),
        value: Number(p.value),
      })),
    [trendsData],
  );

  const enrollmentsLine = useMemo(
    () =>
      (trendsData?.enrollmentTrend ?? []).map((p) => ({
        date: shortDate(p.date),
        value: Number(p.value),
      })),
    [trendsData],
  );

  const ratingLine = useMemo(
    () =>
      (trendsData?.ratingTrend ?? []).map((p) => ({
        date: shortDate(p.date),
        value: Number(p.value),
      })),
    [trendsData],
  );

  const ratingRadar = useMemo(
    () =>
      (overviewData.ratingDistribution ?? []).map((r) => ({
        star: `${r.star}★`,
        count: r.count,
      })),
    [overviewData],
  );

  const statusDonut = useMemo(
    () => [
      {
        name: "Published",
        value: overviewData.dashboardCourseStatusDistribution.published,
        color: "green.6",
      },
      {
        name: "Pending",
        value: overviewData.dashboardCourseStatusDistribution.pending,
        color: "yellow.6",
      },
      {
        name: "Rejected",
        value: overviewData.dashboardCourseStatusDistribution.rejected,
        color: "red.6",
      },
    ],
    [overviewData],
  );

  const applyRange = () => {
    refetchTrends();
  };

  if (isLoadingAny) return <CenterLoader />;

  return (
    <div className="mt-8">
      {/* Header */}
      <Group justify="space-between" wrap="wrap" className="mb-4 gap-3">
        <Title order={3} className="font-bold">
          Insights & Charts
        </Title>
        <Group wrap="wrap" gap="xs">
          <Group gap="xs">
            <Text size="sm">Start</Text>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-2 py-1 rounded-md border"
            />
          </Group>
          <Group gap="xs">
            <Text size="sm">End</Text>
            <input
              type="date"
              value={endDate}
              max={toIsoDate(new Date())}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-2 py-1 rounded-md border"
            />
          </Group>
          <Button onClick={applyRange} loading={isFetchingAny} variant="default" size="xs">
            Apply
          </Button>
        </Group>
      </Group>

      <Divider className="mb-6" />

      {/* Three small Line charts */}
      <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }} spacing="lg" className="mb-6">
        <Card shadow="sm" radius="md" p="md">
          <Title order={5} className="mb-2">
            Revenue Trend
          </Title>
          <LineChart
            curveType="bump"
            h={220}
            connectNulls
            data={revenueLine}
            dataKey="date"
            series={[{ name: "value", label: "Revenue ($)", color: "blue" }]}
          />
        </Card>

        <Card shadow="sm" radius="md" p="md">
          <Title order={5} className="mb-2">
            Enrollments Trend
          </Title>
          <LineChart
            curveType="bump"
            connectNulls
            h={220}
            data={enrollmentsLine}
            dataKey="date"
            series={[{ name: "value", label: "Enrollments", color: "green" }]}
          />
        </Card>

        <Card shadow="sm" radius="md" p="md">
          <Title order={5} className="mb-2">
            Rating Trend
          </Title>
          <LineChart
            curveType="bump"
            h={220}
            connectNulls
            data={ratingLine}
            dataKey="date"
            series={[{ name: "value", label: "Rating", color: "yellow" }]}
            yAxisProps={{ min: 0, max: 5 }}
          />
        </Card>
      </SimpleGrid>

      {/* Radar + Donut */}
      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="lg" className="mb-6">
        <Card shadow="sm" radius="md" p="md">
          <Title order={4} className="mb-3">
            Rating Distribution
          </Title>
          <RadarChart
            h={320}
            data={ratingRadar}
            dataKey="star"
            withPolarGrid
            withPolarAngleAxis
            withPolarRadiusAxis
            withTooltip
            withDots
            withLegend
            series={[{ name: "count", label: "Ratings", color: "indigo" }]}
          />
        </Card>

        <Card shadow="sm" radius="md" p="md">
          <Title order={4} className="mb-3">
            Course Status Distribution
          </Title>
          <DonutChart h={320} data={statusDonut} withTooltip />
        </Card>
      </SimpleGrid>

      {/* Top Courses */}
      <Card shadow="sm" radius="md" p="md">
        <Title order={4} className="mb-3">
          Top Courses
        </Title>
        <ScrollArea h={360}>
          <Table highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Course</Table.Th>
                <Table.Th className="text-right">Sold</Table.Th>
                <Table.Th className="text-right">Revenue ($)</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {overviewData.topCourses.map((c) => (
                <Table.Tr key={c.courseId}>
                  <Table.Td>{c.courseTitle}</Table.Td>
                  <Table.Td className="text-right">{c.soldCount}</Table.Td>
                  <Table.Td className="text-right">{c.revenue.toFixed(2)}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default InstructorDashboardCharts;
