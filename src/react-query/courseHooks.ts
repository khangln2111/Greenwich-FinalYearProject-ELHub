import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createCourse, getCourse, getCourses } from "../api/courseApi";
import { ErrorCode, ErrorResponse } from "../types/api";
import { CourseQueryCriteria, CreateCourseRequest } from "../types/course";
import { keyFactory } from "./queryKeyFactory";
import { showErrorToast, showSuccessToast } from "./toastHelper";

export const useGetCourses = (query: CourseQueryCriteria) => {
  return useQuery({
    queryKey: keyFactory.courses.list(query).queryKey,
    queryFn: () => getCourses(query),
  });
};

export const useGetCourse = (id: string) => {
  return useQuery({
    queryKey: keyFactory.courses.detail(id).queryKey,
    queryFn: () => getCourse(id),
  });
};

export const useCreateCourse = (course: CreateCourseRequest) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createCourse(course),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: keyFactory.courses.list._def,
      });
      showSuccessToast(
        "Course Created",
        "Course created successfully, you can check it in the list",
      );
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 && data.errorCode === ErrorCode.ValidationError) {
          showErrorToast("Validation Error", data.message);
        } else if (status === 401) {
          showErrorToast("Unauthorized", data.message);
        } else if (status === 403) {
          showErrorToast("Forbidden", data.message);
        } else {
          showErrorToast("Error", data.message);
        }
      } else {
        showErrorToast("Network Error", "No response from the server. Please try again later.");
      }
    },
  });
};
