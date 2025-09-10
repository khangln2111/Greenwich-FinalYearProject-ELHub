import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../zustand/stores/authStore";
import { getInstructorDashboard } from "./instructorDashboard.api";
import { instructorDashboardKeyFac } from "./instructorDashboard.keyFac";

export const useGetInstructorDashboard = () => {
  const accessToken = useAuthStore((s) => s.accessToken);

  return useQuery({
    queryKey: instructorDashboardKeyFac.getInstructorDashboard.queryKey,
    queryFn: getInstructorDashboard,
    enabled: !!accessToken,
  });
};
