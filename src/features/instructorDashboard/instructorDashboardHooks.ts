import { useQuery } from "@tanstack/react-query";
import {
  getInstructorDashboardOverview,
  getInstructorDashboardTrends,
} from "./instructorDashboardApi";
import { instructorDashboardKeyFac } from "./instructorDashboardKeyFac";

export const useInstructorDashboardOverview = () => {
  return useQuery({
    queryKey: instructorDashboardKeyFac.getOverview.queryKey,
    queryFn: getInstructorDashboardOverview,
  });
};

export const useInstructorSalesTrend = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: instructorDashboardKeyFac.getSalesTrend(startDate, endDate).queryKey,
    queryFn: () => getInstructorDashboardTrends(startDate, endDate),
  });
};
