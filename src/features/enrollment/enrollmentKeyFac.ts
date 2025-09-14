import { createQueryKeys } from "@lukemorales/query-key-factory";
import { EnrollmentQueryCriteria } from "./enrollment.types";
import { getEnrollmentsSelf, getEnrollmentDetailSelf } from "./enrollment.api";

export const enrollmentKeyFac = createQueryKeys("enrollments", {
  getEnrollmentsSelf: (query?: EnrollmentQueryCriteria) => ({
    queryKey: [query],
    queryFn: () => getEnrollmentsSelf(query),
  }),
  getEnrollmentDetailSelf: (id: string) => ({
    queryKey: [id],
    queryFn: () => getEnrollmentDetailSelf(id),
  }),
});
