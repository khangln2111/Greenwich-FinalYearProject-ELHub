import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createCourse, getCourse, getCourses } from "../api/courseApi";
import { ErrorCode, ErrorResponse } from "../types/api";
import { CourseQueryCriteria, CreateCourseRequest } from "../types/course";
import { queries } from "./query-key-factory";

export const useGetCourses = (query: CourseQueryCriteria) => {
  return useQuery({
    queryKey: queries.courses.list(query).queryKey,
    queryFn: () => getCourses(query),
  });
};

export const useGetCourse = (id: string) => {
  return useQuery({
    queryKey: queries.courses.detail(id).queryKey,
    queryFn: () => getCourse(id),
  });
};

export const useCreateCourse = (course: CreateCourseRequest) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createCourse(course),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queries.courses.list._def,
      });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        // check status and error code
        const { status, data } = error.response;
        if (status === 400 && data.errorCode === ErrorCode.ValidationError) {
          console.log("Validation error:", data.message);
        }
        if (status === 401) {
          console.log("Unauthorized error:", data.message);
        }
        if (status === 403 && data.errorCode) {
          console.log("Forbidden error:", data.message);
        }
      }
    },
  });
};
