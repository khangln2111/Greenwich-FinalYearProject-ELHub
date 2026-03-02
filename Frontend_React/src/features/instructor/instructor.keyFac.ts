import { createQueryKeys } from "@lukemorales/query-key-factory";
import { InstructorQueryCriteria } from "./instructor.types";
import { CourseQueryCriteria } from "../course/course.types";
import { getCoursesByInstructorId, getInstructorById, getInstructors } from "./instructor.api";

export const instructorKeyFac = createQueryKeys("instructors", {
  getInstructors: (query?: InstructorQueryCriteria) => ({
    queryKey: [query],
    queryFn: () => getInstructors(query),
  }),
  getInstructorById: (id: string) => ({
    queryKey: [id],
    queryFn: () => getInstructorById(id),
  }),
  getCoursesByInstructorId: (instructorId: string, query?: CourseQueryCriteria) => ({
    queryKey: [instructorId, query],
    queryFn: () => getCoursesByInstructorId(instructorId, query),
  }),
});
