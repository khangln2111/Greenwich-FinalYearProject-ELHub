// components/InstructorDashboardCharts.tsx
import { DonutChart, LineChart, RadarChart } from "@mantine/charts";
import { Badge, Button, Card, Divider, Group, SimpleGrid, Table, Text, Title } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import dayjs from "dayjs";
import { XIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import CenterLoader from "../../../../components/CenterLoader";
import { InstructorDashboardVm } from "../../../../features/instructorDashboard/instructorDashboard.types";
import { useGetInstructorDashboardTrends } from "../../../../features/instructorDashboard/instructorDashboardHooks";

type Props = {
  overviewData: InstructorDashboardVm;
};

const toIsoDate = (d: Date) => d.toISOString().split("T")[0]; // YYYY-MM-DD
const shortDate = (s: string) => new Date(s).toLocaleDateString();

const InstructorDashboardCharts: React.FC<Props> = ({ overviewData }) => {
  const today = useMemo(() => toIsoDate(new Date()), []);
  const thirtyAgo = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return toIsoDate(d);
  }, []);

  // --------------- Date range picker ---------------
  // State tạm dùng cho picker
  const [pickerRange, setPickerRange] = useState<[string | null, string | null]>([
    thirtyAgo,
    today,
  ]);
  // State dùng để fetch
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([thirtyAgo, today]);

  const [startDate, endDate] = dateRange;

  // -------- Fetch trends ----------
  const {
    data: trendsData,
    isPending: isTrendsPending,
    isFetching: isTrendsFetching,
    error: trendsError,
    refetch: refetchTrends,
  } = useGetInstructorDashboardTrends(startDate ?? "", endDate ?? "");

  const isLoadingAny = isTrendsPending;
  const isFetchingAny = isTrendsFetching;

  // -------- Transform data for charts ----------
  const revenueLine = useMemo(
    () =>
      (trendsData?.revenueTrend ?? []).map((p) => ({
        date: shortDate(p.date),
        value: p.value,
      })),
    [trendsData],
  );

  const enrollmentsLine = useMemo(
    () =>
      (trendsData?.enrollmentTrend ?? []).map((p) => ({
        date: shortDate(p.date),
        value: p.value,
      })),
    [trendsData],
  );

  const ratingLine = useMemo(
    () =>
      (trendsData?.ratingTrend ?? []).map((p) => ({
        date: shortDate(p.date),
        value: p.value,
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

  const applyRange = () => {
    const [start, end] = pickerRange;
    if (!start || !end) {
      showNotification({
        title: "Invalid Date Range",
        message: "Please select both start and end dates.",
        color: "red",
        icon: <XIcon />,
      });
      return;
    }

    setDateRange([start, end]);
  };

  if (isLoadingAny) return <CenterLoader />;

  return (
    <div className="mt-8">
      {/* Header + Date filters */}
      <Group justify="space-between" wrap="wrap" className="mb-4 gap-3">
        <Title order={3} className="font-bold">
          Insights & Charts
        </Title>

        <Group wrap="wrap" gap="xs">
          <DatePickerInput
            presets={[
              {
                value: [
                  dayjs().subtract(2, "day").format("YYYY-MM-DD"),
                  dayjs().format("YYYY-MM-DD"),
                ],
                label: "Last two days",
              },
              {
                value: [
                  dayjs().subtract(7, "day").format("YYYY-MM-DD"),
                  dayjs().format("YYYY-MM-DD"),
                ],
                label: "Last 7 days",
              },
              {
                value: [
                  dayjs().startOf("month").format("YYYY-MM-DD"),
                  dayjs().format("YYYY-MM-DD"),
                ],
                label: "This month",
              },
              {
                value: [
                  dayjs().subtract(1, "month").startOf("month").format("YYYY-MM-DD"),
                  dayjs().subtract(1, "month").endOf("month").format("YYYY-MM-DD"),
                ],
                label: "Last month",
              },
              {
                value: [
                  dayjs().subtract(1, "year").startOf("year").format("YYYY-MM-DD"),
                  dayjs().subtract(1, "year").endOf("year").format("YYYY-MM-DD"),
                ],
                label: "Last year",
              },
            ]}
            type="range"
            placeholder="Pick dates range"
            value={pickerRange}
            onChange={setPickerRange}
            maxDate={new Date(today)}
            clearable={false}
          />
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
            withLegend
            withPointLabels
            data={revenueLine}
            dataKey="date"
            series={[{ name: "value", label: "Revenue ($)", color: "blue" }]}
            h={220}
            curveType="bump"
            connectNulls
          />
        </Card>

        <Card shadow="sm" radius="md" p="md">
          <Title order={5} className="mb-2">
            Enrollments Trend
          </Title>
          <LineChart
            withLegend
            withPointLabels
            data={enrollmentsLine}
            dataKey="date"
            series={[{ name: "value", label: "Enrollments", color: "green" }]}
            h={220}
            curveType="bump"
            connectNulls
          />
        </Card>

        <Card shadow="sm" radius="md" p="md">
          <Title order={5} className="mb-2">
            Rating Trend
          </Title>
          <LineChart
            withLegend
            withPointLabels
            data={ratingLine}
            dataKey="date"
            series={[{ name: "value", label: "Rating", color: "yellow" }]}
            h={220}
            yAxisProps={{ min: 0, max: 5 }}
            curveType="bump"
            connectNulls
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
            data={ratingRadar}
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

        <Card shadow="sm" radius="md" p="md">
          <Title order={4} className="mb-3">
            Course Status Distribution
          </Title>
          <DonutChart
            withLabelsLine
            withLabels
            withTooltip
            chartLabel="Courses by status"
            tooltipAnimationDuration={200}
            labelsType="percent"
            size={250}
            className="self-center"
            pieProps={{
              isAnimationActive: true,
              animationDuration: 1000,
            }}
            data={[
              {
                name: "Published",
                value: overviewData.courseStatusDistribution.published,
                color: "green.6",
              },
              {
                name: "Pending",
                value: overviewData.courseStatusDistribution.pending,
                color: "yellow.6",
              },
              {
                name: "Rejected",
                value: overviewData.courseStatusDistribution.rejected,
                color: "red.6",
              },
              {
                name: "Draft",
                value: overviewData.courseStatusDistribution.draft,
                color: "gray.6",
              },
              {
                name: "Archived",
                value: overviewData.courseStatusDistribution.archived,
                color: "dark.6",
              },
            ]}
          />
        </Card>
      </SimpleGrid>

      {/* Top Courses Table */}
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
              {overviewData.topCourses.slice(0, 5).map((c, idx: number) => (
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
    </div>
  );
};

export default InstructorDashboardCharts;
