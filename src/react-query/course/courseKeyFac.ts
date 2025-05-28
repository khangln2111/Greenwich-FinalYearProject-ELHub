import { createQueryKeys } from "@lukemorales/query-key-factory";
import { CourseQueryCriteria } from "./course.types";

export const courseKeyFac = createQueryKeys("courses", {
  list: (query?: CourseQueryCriteria) => ({
    queryKey: [query],
  }),
  detail: (id: string) => ({
    queryKey: [id],
  }),
});
