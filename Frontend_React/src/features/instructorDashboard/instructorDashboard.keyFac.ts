import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getInstructorDashboard } from "./instructorDashboard.api";

export const instructorDashboardKeyFac = createQueryKeys("instructorDashboard", {
  getInstructorDashboard: {
    queryKey: null,
    queryFn: () => getInstructorDashboard(),
  },
});
