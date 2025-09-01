import { createQueryKeys } from "@lukemorales/query-key-factory";

export const instructorDashboardKeyFac = createQueryKeys("instructorDashboard", {
  getInstructorDashboard: { queryKey: null },
});
