import { useQuery } from "@tanstack/react-query";
import { getInstructorDashboard } from "./instructorDashboardApi";
import { instructorDashboardKeyFac } from "./instructorDashboardKeyFac";

export const useGetInstructorDashboard = () => {
  return useQuery({
    queryKey: instructorDashboardKeyFac.getInstructorDashboard.queryKey,
    queryFn: getInstructorDashboard,
  });
};
