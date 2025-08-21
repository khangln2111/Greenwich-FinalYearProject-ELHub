import { createQueryKeys } from "@lukemorales/query-key-factory";

export const adminDashboardKeyFac = createQueryKeys("adminDashboard", {
  getAdminDashboard: {
    queryKey: null,
  },
});
