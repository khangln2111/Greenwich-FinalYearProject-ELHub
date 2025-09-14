import { createQueryKeys } from "@lukemorales/query-key-factory";
import { CourseQueryCriteria } from "./course.types";
import {
  getAllCourses,
  getCourseDetail,
  getCurrentUserCourseEnrollmentStatus,
  getInstructorByCourseId,
  getOwnedCourses,
  getPublishedCourses,
} from "./course.api";

export const courseKeyFac = createQueryKeys("courses", {
  getCourses: (query?: CourseQueryCriteria) => ({
    queryKey: [query],
  }),
  getAllCourses: (query?: CourseQueryCriteria) => ({
    queryKey: [query],
    queryFn: () => getAllCourses(query),
  }),
  getOwnedCourses: (query?: CourseQueryCriteria) => ({
    queryKey: [query],
    queryFn: () => getOwnedCourses(query),
  }),
  getPublishedCourses: (query?: CourseQueryCriteria) => ({
    queryKey: [query],
    queryFn: () => getPublishedCourses(query),
  }),
  getCourseDetail: (id: string) => ({
    queryKey: [id],
    queryFn: () => getCourseDetail(id),
  }),
  getInstructorByCourseId: (courseId: string) => ({
    queryKey: [courseId],
    queryFn: () => getInstructorByCourseId(courseId),
  }),
  getCurrentUserCourseEnrollmentStatus: (courseId: string) => ({
    queryKey: [courseId],
    queryFn: () => getCurrentUserCourseEnrollmentStatus(courseId),
  }),
});
