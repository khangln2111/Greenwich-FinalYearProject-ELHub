import { useQuery } from "@tanstack/react-query";
import { keyFac } from "../common-service/queryKeyFactory";
import { InstructorQueryCriteria } from "./instructor.types";
import { getCoursesByInstructorId, getInstructorById, getInstructors } from "./instructorApi";
import { CourseQueryCriteria } from "../course/course.types";

export const useGetInstructors = (query?: InstructorQueryCriteria) => {
  return useQuery({
    queryKey: keyFac.instructors.getInstructors(query).queryKey,
    queryFn: () => getInstructors(query),
  });
};

export const useGetInstructorById = (id: string) => {
  return useQuery({
    queryKey: keyFac.instructors.getInstructorById(id).queryKey,
    queryFn: () => getInstructorById(id),
    enabled: !!id,
    retry: (failureCount, error) => {
      // ❌ Do not retry if 404
      if (error && error.response?.status === 404) {
        return false;
      }
      // ✅ Retry maximum 2 times for other errors
      return failureCount < 2;
    },
  });
};

export const useGetCoursesByInstructorId = (instructorId: string, query?: CourseQueryCriteria) => {
  return useQuery({
    queryKey: keyFac.instructors.getCoursesByInstructorId(instructorId, query).queryKey,
    queryFn: () => getCoursesByInstructorId(instructorId, query),
    enabled: !!instructorId,
    retry: (failureCount, error) => {
      // ❌ Do not retry if 404
      if (error && error.response?.status === 404) {
        return false;
      }
      // ✅ Retry maximum 2 times for other errors
      return failureCount < 2;
    },
  });
};
