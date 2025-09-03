import { useQuery } from "@tanstack/react-query";
import { getInstructorDashboard } from "./instructorDashboard.api";
import { instructorDashboardKeyFac } from "./instructorDashboard.keyFac";
import { useAppStore } from "../../zustand/stores/appStore";

export const useGetInstructorDashboard = () => {
  const currentUser = useAppStore((s) => s.currentUser);
  return useQuery({
    queryKey: instructorDashboardKeyFac.getInstructorDashboard.queryKey,
    queryFn: getInstructorDashboard,
    enabled: !!currentUser,
  });
};
