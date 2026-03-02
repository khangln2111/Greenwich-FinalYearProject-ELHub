import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getAdminDashboard } from "./adminDashboard.api";

export const adminDashboardKeyFac = createQueryKeys("adminDashboard", {
  getAdminDashboard: {
    queryKey: null,
    queryFn: () => getAdminDashboard(),
  },
});
