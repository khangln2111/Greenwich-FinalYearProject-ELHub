import { useQuery } from "@tanstack/react-query";
import { getInstructorDashboard } from "./instructorDashboard.api";
import { instructorDashboardKeyFac } from "./instructorDashboard.keyFac";

export const useGetInstructorDashboard = () => {
  return useQuery({
    queryKey: instructorDashboardKeyFac.getInstructorDashboard.queryKey,
    queryFn: getInstructorDashboard,
  });
};
