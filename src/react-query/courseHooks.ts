import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createCourse, getCourseDetail, getCourses } from "../api/courseApi";
import { CourseQueryCriteria, CreateCourseRequest } from "../types/course.types";
import { keyFac } from "./queryKeyFactory";
import { showErrorToast, showSuccessToast } from "./toastHelper";
import { ErrorCode, ApiErrorResponse } from "../types/api.types";

export const useGetCourses = (query: CourseQueryCriteria = {}) => {
  return useQuery({
    queryKey: keyFac.courses.list(query).queryKey,
    queryFn: () => getCourses(query),
  });
};

export const useGetCourseDetail = (id: string) => {
  return useQuery({
    queryKey: keyFac.courses.detail(id).queryKey,
    queryFn: () => getCourseDetail(id),
  });
};

export const useCreateCourse = (course: CreateCourseRequest) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createCourse(course),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: keyFac.courses.list._def,
      });
      showSuccessToast(
        "Course Created",
        "Course created successfully, you can check it in the list",
      );
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
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
