import { createQueryKeys } from "@lukemorales/query-key-factory";
import { InstructorQueryCriteria } from "./instructor.types";
import { CourseQueryCriteria } from "../course/course.types";

export const instructorKeyFac = createQueryKeys("instructors", {
  getInstructors: (query?: InstructorQueryCriteria) => ({
    queryKey: [query],
  }),
  getInstructorById: (id: string) => ({
    queryKey: [id],
  }),
  getCoursesByInstructorId: (instructorId: string, query?: CourseQueryCriteria) => ({
    queryKey: [instructorId, query],
  }),
});
