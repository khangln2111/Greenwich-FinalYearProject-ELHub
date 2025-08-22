import { createQueryKeys } from "@lukemorales/query-key-factory";

export const instructorDashboardKeyFac = createQueryKeys("instructorDashboard", {
  getOverview: { queryKey: null },
  getTrends: (startDate: string, endDate: string) => ({
    queryKey: [startDate, endDate],
  }),
  getRevenueSales: (startDate: string, endDate: string) => ({
    queryKey: [startDate, endDate],
  }),
});
