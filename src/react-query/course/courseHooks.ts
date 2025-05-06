import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiErrorResponse, ErrorCode } from "../../http-client/api.types";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { CourseQueryCriteria, CreateCourseRequest, UpdateCourseRequest } from "./course.types";
import { createCourse, deleteCourse, updateCourse } from "./courseApi";
import { keyFac } from "../common-service/queryKeyFactory";

export const useGetCourses = (query: CourseQueryCriteria = {}) => {
  return useQuery(keyFac.courses.list(query));
};

export const useGetCourseDetail = (id: string) => {
  return useQuery(keyFac.courses.detail(id));
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (course: CreateCourseRequest) => createCourse(course),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: keyFac.courses.list._def });
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
          showErrorToast("Unauthorized", "You must login to perform this action.");
        } else if (status === 403) {
          showErrorToast("Forbidden", "You do not have permission to perform this action.");
        } else {
          showErrorToast("Unexpected Error", error.message);
        }
      } else {
        console.error("Axios Error:", error);
        showErrorToast("Network Error", "No response from the server. Please try again later.");
      }
    },
  });
};

export const useUpdateCourse = (course: UpdateCourseRequest) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateCourse(course),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.courses.list._def });
      showSuccessToast("Course Updated", "The course was updated successfully.");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 && data.errorCode === ErrorCode.ValidationError) {
          showErrorToast("Validation Error", data.message);
        } else if (status === 401) {
          showErrorToast("Unauthorized", "You must login to perform this action.");
        } else if (status === 403) {
          showErrorToast("Forbidden", "You do not have permission to perform this action.");
        } else if (status === 404) {
          showErrorToast("Not Found", "The course you are trying to update does not exist.");
        } else {
          showErrorToast("Unexpected Error", error.message);
        }
      } else {
        console.error("Axios Error:", error);
        showErrorToast("Network Error", "No response from the server. Please try again later.");
      }
    },
  });
};

export const useDeleteCourse = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.courses.list._def });
      showSuccessToast("Course Deleted", "The course was deleted successfully.");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          showErrorToast("Unauthorized", "You must login to perform this action.");
        } else if (status === 403) {
          showErrorToast("Forbidden", "You do not have permission to perform this action.");
        } else if (status === 404) {
          showErrorToast("Not Found", "The course you are trying to delete does not exist.");
        } else {
          showErrorToast("Unexpected Error", error.message);
        }
      } else {
        console.error("Axios Error:", error);
        showErrorToast("Network Error", "No response from the server. Please try again later.");
      }
    },
  });
};
