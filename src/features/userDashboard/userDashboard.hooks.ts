import { useQuery } from "@tanstack/react-query";
import { keyFac } from "../common-service/queryKeyFactory";

export const useGetUserDashboard = () => {
  return useQuery({
    queryKey: keyFac.userDashboard.getUserDashboard.queryKey,
    queryFn: keyFac.userDashboard.getUserDashboard.queryFn,
  });
};
