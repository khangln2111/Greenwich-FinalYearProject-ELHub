import { useQuery } from "@tanstack/react-query";
import {
  getInstructorDashboardOverview,
  getInstructorDashboardRevenueSales,
  getInstructorDashboardTrends,
} from "./instructorDashboardApi";
import { instructorDashboardKeyFac } from "./instructorDashboardKeyFac";

export const useGetInstructorDashboardOverview = () => {
  return useQuery({
    queryKey: instructorDashboardKeyFac.getOverview.queryKey,
    queryFn: getInstructorDashboardOverview,
  });
};

export const useGetInstructorDashboardTrends = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: instructorDashboardKeyFac.getTrends(startDate, endDate).queryKey,
    queryFn: () => getInstructorDashboardTrends(startDate, endDate),
  });
};

export const useGetInstructorDashboardRevenueSales = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: instructorDashboardKeyFac.getRevenueSales(startDate, endDate).queryKey,
    queryFn: () => getInstructorDashboardRevenueSales(startDate, endDate),
  });
};
