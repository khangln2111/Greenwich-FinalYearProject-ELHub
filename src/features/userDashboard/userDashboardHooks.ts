import { useQuery } from "@tanstack/react-query";
import { keyFac } from "../common-service/queryKeyFactory";
import { getUserDashboard } from "./userDashboardApi";

export const useGetUserDashboard = () => {
  return useQuery({
    queryKey: keyFac.userDashboard.getUserDashboard.queryKey,
    queryFn: getUserDashboard,
  });
};
