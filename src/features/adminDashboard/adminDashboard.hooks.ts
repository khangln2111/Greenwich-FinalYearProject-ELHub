import { useQuery } from "@tanstack/react-query";
import { keyFac } from "../common-service/queryKeyFactory";
import { getAdminDashboard } from "./adminDashboard.api";

export const useGetAdminDashboard = () => {
  return useQuery({
    queryKey: keyFac.adminDashboard.getAdminDashboard.queryKey,
    queryFn: getAdminDashboard,
  });
};
