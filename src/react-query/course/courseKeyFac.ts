import { createQueryKeys } from "@lukemorales/query-key-factory";
import { CourseQueryCriteria } from "./course.types";
import { getCourses, getCourseDetail } from "./courseApi";

export const courseKeyFac = createQueryKeys("courses", {
  list: (query?: CourseQueryCriteria) => ({
    queryKey: [query],
    queryFn: () => getCourses(query),
  }),
  detail: (id: string) => ({
    queryKey: [id],
    queryFn: () => getCourseDetail(id),
  }),
});
