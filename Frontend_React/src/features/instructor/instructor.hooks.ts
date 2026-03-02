import { useQuery } from "@tanstack/react-query";
import { keyFac } from "../common-service/queryKeyFactory";
import { CourseQueryCriteria } from "../course/course.types";
import { InstructorQueryCriteria } from "./instructor.types";

export const useGetInstructors = (query?: InstructorQueryCriteria) => {
  return useQuery({
    queryKey: keyFac.instructors.getInstructors(query).queryKey,
    queryFn: keyFac.instructors.getInstructors(query).queryFn,
  });
};

export const useGetInstructorById = (id: string) => {
  return useQuery({
    queryKey: keyFac.instructors.getInstructorById(id).queryKey,
    queryFn: keyFac.instructors.getInstructorById(id).queryFn,
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
    queryFn: keyFac.instructors.getCoursesByInstructorId(instructorId, query).queryFn,
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
