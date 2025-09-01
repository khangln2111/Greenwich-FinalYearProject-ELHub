import { createQueryKeys } from "@lukemorales/query-key-factory";

export const userDashboardKeyFac = createQueryKeys("userDashboard", {
  getUserDashboard: { queryKey: null },
});
