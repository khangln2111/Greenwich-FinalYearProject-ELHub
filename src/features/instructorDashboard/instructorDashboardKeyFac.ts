import { createQueryKeys } from "@lukemorales/query-key-factory";

export const instructorDashboardKeyFac = createQueryKeys("instructorDashboard", {
  getOverview: { queryKey: null },
  getRevenueByMonth: (year: number, month?: number) => ({
    queryKey: [year, month ?? "all"],
  }),
  getSalesTrend: (startDate: string, endDate: string) => ({
    queryKey: [startDate, endDate],
  }),
});
