import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { CourseQueryCriteria } from "../types/course";

export const keyFactory = createQueryKeyStore({
  courses: {
    list: (query: CourseQueryCriteria) => [query],
    detail: (id: string) => [id],
  },
});
