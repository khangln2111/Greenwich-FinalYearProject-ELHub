import { createQueryKeys } from "@lukemorales/query-key-factory";
import { EnrollmentQueryCriteria } from "./enrollment.types";

export const enrollmentKeyFac = createQueryKeys("enrollments", {
  getEnrollmentsSelf: (query?: EnrollmentQueryCriteria) => ({
    queryKey: [query],
  }),
  getEnrollmentDetailSelf: (id: string) => ({
    queryKey: [id],
  }),
});
