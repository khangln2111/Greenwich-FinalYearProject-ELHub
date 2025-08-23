import { useQuery } from "@tanstack/react-query";
import { getInstructorDashboardOverview } from "./instructorDashboardApi";
import { instructorDashboardKeyFac } from "./instructorDashboardKeyFac";

export const useGetInstructorDashboardOverview = () => {
  return useQuery({
    queryKey: instructorDashboardKeyFac.getOverview.queryKey,
    queryFn: getInstructorDashboardOverview,
  });
};
