import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { CourseQueryCriteria } from "../types/course.types";

export const keyFac = createQueryKeyStore({
  courses: {
    list: (query: CourseQueryCriteria) => [query],
    detail: (id: string) => [id],
  },
});
