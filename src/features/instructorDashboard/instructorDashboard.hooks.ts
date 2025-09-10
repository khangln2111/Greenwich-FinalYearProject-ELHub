import { useQuery } from "@tanstack/react-query";
import { authStorage } from "../../utils/storageHelper";
import { getInstructorDashboard } from "./instructorDashboard.api";
import { instructorDashboardKeyFac } from "./instructorDashboard.keyFac";

export const useGetInstructorDashboard = () => {
  const accessToken = authStorage.getAccessToken();

  return useQuery({
    queryKey: instructorDashboardKeyFac.getInstructorDashboard.queryKey,
    queryFn: getInstructorDashboard,
    enabled: !!accessToken,
  });
};
