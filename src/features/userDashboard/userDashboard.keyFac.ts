import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getUserDashboard } from "./userDashboard.api";

export const userDashboardKeyFac = createQueryKeys("userDashboard", {
  getUserDashboard: {
    queryKey: null,
    queryFn: () => getUserDashboard(),
  },
});
