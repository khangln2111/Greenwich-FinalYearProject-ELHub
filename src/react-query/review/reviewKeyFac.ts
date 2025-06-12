import { createQueryKeys } from "@lukemorales/query-key-factory";
import { ReviewQueryCriteria } from "./review.types";

export const reviewKeyFac = createQueryKeys("reviews", {
  getReviewsByCourseId: (courseId: string, query?: ReviewQueryCriteria) => ({
    queryKey: [courseId, query],
  }),
  getReviewById: (id: string) => ({
    queryKey: [id],
  }),
});
