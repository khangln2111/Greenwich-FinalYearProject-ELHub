import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../zustand/stores/authStore";
import { keyFac } from "../common-service/queryKeyFactory";

export const useGetInstructorDashboard = () => {
  const accessToken = useAuthStore((s) => s.accessToken);

  return useQuery({
    queryKey: keyFac.instructorDashboard.getInstructorDashboard.queryKey,
    queryFn: keyFac.instructorDashboard.getInstructorDashboard.queryFn,
    enabled: !!accessToken,
  });
};
