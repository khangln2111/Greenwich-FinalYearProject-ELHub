import { useQuery } from "@tanstack/react-query";
import { keyFac } from "../common-service/queryKeyFactory";

export const useGetAdminDashboard = () => {
  return useQuery({
    queryKey: keyFac.adminDashboard.getAdminDashboard.queryKey,
    queryFn: keyFac.adminDashboard.getAdminDashboard.queryFn,
  });
};
