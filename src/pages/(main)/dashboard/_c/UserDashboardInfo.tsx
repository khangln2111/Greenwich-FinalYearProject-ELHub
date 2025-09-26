import { CompositeChart, RadarChart, FunnelChart } from "@mantine/charts";
import { Card, RingProgress, ScrollArea, SimpleGrid, Text } from "@mantine/core";
import {
  DollarSignIcon,
  GiftIcon,
  LayersIcon,
  ShoppingBagIcon,
  TimerIcon,
  UserCheckIcon,
} from "lucide-react";
import DashboardStatCard from "../../../../components/DashboardStatCard/DashboardStatCard";
import { UserDashboardVm } from "../../../../features/userDashboard/userDashboard.types";
import { Legend } from "recharts";

type UserDashboardInfoProps = {
  data: UserDashboardVm;
};

const UserDashboardInfo = ({ data }: UserDashboardInfoProps) => {
  return (
    <>
      {/* stat cards */}
      <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }} spacing="md" mt="lg">
        <DashboardStatCard
          title="Enrolled Courses"
          value={data.stats.totalEnrolledCourses}
          growth={data.stats.totalEnrolledCoursesGrowth}
          icon={<LayersIcon size={20} />}
          className="shadow-md hover:shadow-lg"
          classNames={{
            icon: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
          }}
        />

        <DashboardStatCard
          title="Gifts Sent"
          value={data.stats.totalSentGifts}
          growth={data.stats.totalSentGiftsGrowth}
          icon={<GiftIcon size={20} />}
          className="shadow-md hover:shadow-lg"
          classNames={{
            icon: "bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300",
          }}
        />

        <DashboardStatCard
          title="Completed Orders"
          value={data.stats.totalOrders}
          growth={data.stats.totalOrdersGrowth}
          icon={<ShoppingBagIcon size={20} />}
          className="shadow-md hover:shadow-lg"
          classNames={{
            icon: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300",
          }}
        />

        <DashboardStatCard
          title="Total Spent"
          value={data.stats.totalSpent}
          prefix="$"
          growth={data.stats.totalSpentGrowth}
          icon={<DollarSignIcon size={20} />}
          className="shadow-md hover:shadow-lg"
          classNames={{
            icon: "bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300",
          }}
        />

        <DashboardStatCard
          title="Inventory Items"
          value={data.stats.totalInventoryItems}
          growth={data.stats.totalInventoryItemsGrowth}
          icon={<UserCheckIcon size={20} />}
          className="shadow-md hover:shadow-lg"
          classNames={{
            icon: "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300",
          }}
        />

        <DashboardStatCard
          title="Learning Time"
          value={data.stats.totalLearningSeconds}
          countUpProps={{
            formattingFn: (n) => (n / 3600).toFixed(1),
          }}
          suffix="h"
          growth={data.stats.totalLearningSecondsGrowth}
          icon={<TimerIcon size={20} />}
          className="shadow-md hover:shadow-lg"
          classNames={{
            icon: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300",
          }}
        />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mt="lg">
        {/* Course Distribution By Level */}
        <Card
          withBorder
          radius="2xl"
          p="lg"
          className="border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition dark:bg-gray-900"
        >
          <Text size="lg" fw={600} mb="md">
            Courses Distribution by level
          </Text>
          <RadarChart
            data={data.coursesByLevel}
            dataKey="level"
            series={[{ name: "count", label: "Courses count", color: "blue.4", opacity: 0.2 }]}
            h={350}
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

        {/* Course Conversion - Funnel */}
        <Card
          withBorder
          radius="2xl"
          p="lg"
          className="border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition dark:bg-gray-900"
        >
          <Text size="lg" fw={600} mb="md">
            Course Conversion Funnel
          </Text>
          <FunnelChart
            className="flex-1 self-center"
            size={300}
            data={[
              {
                value: data.courseConversion.purchasedCoursesQuantity,
                name: "Purchased (total qty)",
                color: "violet.6",
              },
              {
                value: data.courseConversion.purchasedCoursesUnique,
                name: "Purchased (unique)",
                color: "pink.6",
              },
              {
                value: data.courseConversion.enrolledCourses,
                name: "Enrolled",
                color: "yellow.6",
              },
              {
                value: data.courseConversion.completedCourses,
                name: "Completed",
                color: "teal.6",
              },
            ]}
            labelsPosition="right"
            withLabels
          >
            <Legend
              verticalAlign="bottom"
              align="center"
              content={() => (
                <div className="flex justify-center gap-2 flex-wrap lg:flex-nowrap">
                  {[
                    {
                      name: "Bought(total)",
                      color: "violet-6",
                    },
                    {
                      name: "Bought(unique)",
                      color: "pink-6",
                    },
                    {
                      name: "Enrolled",
                      color: "yellow-6",
                    },
                    {
                      name: "Completed",
                      color: "teal-6",
                    },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-1 sm:gap-2 text-xs md:text-sm"
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ background: `var(--mantine-color-${item.color})` }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              )}
            />
          </FunnelChart>
        </Card>
      </SimpleGrid>

      {/* Courses Info by Category - Composite */}
      <Card
        withBorder
        radius="2xl"
        p="lg"
        className="border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition dark:bg-gray-900
          mt-lg"
      >
        <Text size="lg" fw={600} mb="md">
          Info by Category
        </Text>
        <ScrollArea type="auto" offsetScrollbars>
          <div className="overflow-auto min-w-2xl">
            <CompositeChart
              data={data.infoByCategory.slice(0, 5)}
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
              yAxisLabel="Spent ($)"
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
                  name: "totalSpent",
                  label: "Spent ($)",
                  color: "blue.6",
                  yAxisId: "left",
                },
                {
                  type: "line",
                  name: "enrolledCoursesCount",
                  label: "Number of enrolled courses",
                  color: "green.6",
                  yAxisId: "right",
                },
                {
                  type: "line",
                  name: "completedCoursesCount",
                  label: "Completed Courses",
                  color: "orange.6",
                  yAxisId: "right",
                },
                {
                  type: "line",
                  name: "purchasedCoursesQuantityCount",
                  label: "Purchased Courses Quantity",
                  color: "red.6",
                  yAxisId: "right",
                },
              ]}
            />
          </div>
        </ScrollArea>
      </Card>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mt="lg">
        {/* Overall Completion Progress */}
        <Card
          withBorder
          radius="2xl"
          p="lg"
          className="border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition dark:bg-gray-900"
        >
          <Text size="lg" fw={600} mb="md">
            Overall Completion Progress
          </Text>
          <div className="self-center flex-1">
            <RingProgress
              size={250}
              roundCaps
              thickness={18}
              sections={[
                {
                  value: data.overallCompletionPercent,
                  color: "blue",
                  tooltip: "Overall Completion",
                },
              ]}
              label={
                <Text c="blue" fw={700} ta="center" size="xl">
                  {data.overallCompletionPercent}%
                </Text>
              }
            />
          </div>
        </Card>
        {/* Course Rating Distribution */}
        <Card
          withBorder
          radius="2xl"
          p="lg"
          className="border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition dark:bg-gray-900"
        >
          <Text size="lg" fw={600} mb="md">
            Rating Distribution
          </Text>
          <RadarChart
            data={data.reviewDistribution}
            dataKey="star"
            series={[{ name: "count", label: "Ratings", color: "yellow", opacity: 0.2 }]}
            h={280}
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
    </>
  );
};
export default UserDashboardInfo;
