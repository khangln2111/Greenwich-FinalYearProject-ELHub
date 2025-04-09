import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { Course, CourseQueryCriteria } from "../types/course.types";
import apiClient from "../api/axios";
import { ListData } from "../types/api.types";

export const keyFac = createQueryKeyStore({
  courses: {
    list: (query?: CourseQueryCriteria) => ({
      queryKey: [query],
      queryFn: async () => {
        const response = await apiClient.get<ListData<Course>>("/courses");
        return response.data;
      },
    }),
    detail: (id: string) => [id],
  },
});
