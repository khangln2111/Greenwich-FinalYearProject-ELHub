import { createQueryKeys } from "@lukemorales/query-key-factory";
import { CourseQueryCriteria } from "./course.types";

export const courseKeyFac = createQueryKeys("courses", {
  getCourses: (query?: CourseQueryCriteria) => ({
    queryKey: [query],
  }),
  getAllCourses: (query?: CourseQueryCriteria) => ({
    queryKey: [query],
  }),
  getOwnedCourses: (query?: CourseQueryCriteria) => ({
    queryKey: [query],
  }),
  getPublishedCourses: (query?: CourseQueryCriteria) => ({
    queryKey: [query],
  }),
  getCourseDetail: (id: string) => ({
    queryKey: [id],
  }),
  getInstructorByCourseId: (courseId: string) => ({
    queryKey: [courseId],
  }),
  getCurrentUserCourseEnrollmentStatus: (courseId: string) => ({
    queryKey: [courseId],
  }),
});
