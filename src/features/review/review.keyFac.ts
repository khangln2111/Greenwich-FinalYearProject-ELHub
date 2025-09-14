import { createQueryKeys } from "@lukemorales/query-key-factory";
import { ReviewQueryCriteria } from "./review.types";
import { getReviewsByCourseId } from "./review.api";

export const reviewKeyFac = createQueryKeys("reviews", {
  getReviewsByCourseId: (courseId: string, query?: ReviewQueryCriteria) => ({
    queryKey: [courseId, query],
    queryFn: () => getReviewsByCourseId(courseId, query),
  }),
  getReviewById: (id: string) => ({
    queryKey: [id],
  }),
});
