import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import {
  CourseQueryCriteria,
  CreateCourseCommand,
  ReviewCourseCommand,
  UpdateCourseCommand,
} from "./course.types";
import {
  createCourse,
  deleteCourse,
  getCourseDetail,
  getCourseLearning,
  getCourses,
  getInstructorByCourseId,
  retrySubmitCourse,
  moderateCourse,
  submitCourse,
  updateCourse,
} from "./courseApi";
import { useAppStore } from "../../zustand/stores/appStore";
import { ErrorCode } from "../../api-client/api.types";

export const useGetCourses = (query?: CourseQueryCriteria) => {
  return useQuery({
    queryKey: keyFac.courses.getCourses(query).queryKey,
    queryFn: () => getCourses(query),
  });
};

export const useGetCourseDetail = (id: string) => {
  return useQuery({
    queryKey: keyFac.courses.getCourseDetail(id).queryKey,
    queryFn: () => getCourseDetail(id),
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

export const useModerateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: ReviewCourseCommand) => moderateCourse(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.courses._def });
      showSuccessToast("Course Reviewed", "The course review was successful.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () =>
              showErrorToast("Not Found", "The course you are trying to review does not exist."),
          },
          {
            status: 400,
            errorCode: ErrorCode.InvalidOperation,
            handler: () =>
              showErrorToast(
                "Invalid Operation",
                "You cannot review a course that is not in pending status.",
              ),
          },
        ],
      }),
  });
};

export const useSubmitCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => submitCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.courses._def });
      showSuccessToast("Course Submitted", "The course was submitted for review successfully.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () =>
              showErrorToast("Not Found", "The course you are trying to submit does not exist."),
          },
          {
            status: 400,
            errorCode: ErrorCode.InvalidOperation,
            handler: () =>
              showErrorToast(
                "Invalid Operation",
                "You cannot submit a course that is not in draft status.",
              ),
          },
        ],
      }),
  });
};

export const useRetrySubmitCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => retrySubmitCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.courses._def });
      showSuccessToast(
        "Course Submission Retried",
        "The course submission was retried successfully.",
      );
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () =>
              showErrorToast("Not Found", "The course you are trying to retry does not exist."),
          },
          {
            status: 400,
            errorCode: ErrorCode.InvalidOperation,
            handler: () =>
              showErrorToast(
                "Invalid Operation",
                "You cannot retry a course that is not in rejected status",
              ),
          },
          {
            status: 400,
            errorCode: ErrorCode.RetryLimitExceeded,
            handler: (err) => {
              const msg = err.response?.data?.message ?? "";
              showErrorToast("Retry Limit Exceeded", msg); // e.g. "Please retry after ..."
            },
          },
          {
            status: 400,
            errorCode: ErrorCode.RetryCooldown,
            handler: (err) => {
              const msg = err.response?.data?.message ?? "";
              showErrorToast("Retry Too Soon", msg); // e.g. "Please retry after ..."
            },
          },
        ],
      }),
  });
};

export const useGetCourseLearning = (id: string) => {
  const currentUser = useAppStore((s) => s.currentUser);
  return useQuery({
    queryKey: keyFac.courses.getCourseLearning(id).queryKey,
    queryFn: () => getCourseLearning(id),
    enabled: !!id && !!currentUser,
    retry: (failureCount, error) => {
      // ❌ Không retry nếu là 404
      if (error && error.response?.status === 404) {
        return false;
      }
      // ✅ Retry tối đa 2 lần cho lỗi khác
      return failureCount < 2;
    },
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (command: CreateCourseCommand) => createCourse(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.courses._def });
      showSuccessToast(
        "Course Created",
        "Course created successfully, you can check it in the list",
      );
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Not Found", "The category not found"),
          },
        ],
      }),
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (command: UpdateCourseCommand) => updateCourse(command),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: keyFac.courses.getCourseDetail(variables.id).queryKey,
      });
      queryClient.invalidateQueries({ queryKey: keyFac.courses.getCourses._def });
      showSuccessToast("Course Updated", "The course was updated successfully.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () =>
              showErrorToast("Not Found", "The course you are trying to update does not exist."),
          },
        ],
      }),
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.courses.getCourses._def });
      showSuccessToast("Course Deleted", "The course was deleted successfully.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () =>
              showErrorToast("Not Found", "The course you are trying to delete does not exist."),
          },
        ],
      }),
  });
};

export const useGetInstructorByCourseId = (courseId: string) => {
  return useQuery({
    queryKey: keyFac.courses.getInstructorByCourseId(courseId).queryKey,
    queryFn: () => getInstructorByCourseId(courseId),
    enabled: !!courseId,
    retry: (failureCount, error) => {
      // ❌ Do not retry if 404
      if (error && error.response?.status === 404) {
        return false;
      }
      // ✅ Retry up to 2 times for other errors
      return failureCount < 2;
    },
  });
};
