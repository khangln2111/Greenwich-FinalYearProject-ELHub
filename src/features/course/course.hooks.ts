import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorCode } from "../../api-client/api.types";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { useAuthStore } from "../../zustand/stores/authStore";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import {
  createCourse,
  deleteCourse,
  moderateCourse,
  resubmitCourse,
  submitCourse,
  updateCourse,
} from "./course.api";
import {
  CourseQueryCriteria,
  CreateCourseCommand,
  ModerateCourseCommand,
  UpdateCourseCommand,
} from "./course.types";

export const useGetAllCourses = (query?: CourseQueryCriteria) => {
  return useQuery({
    queryKey: keyFac.courses.getAllCourses(query).queryKey,
    queryFn: keyFac.courses.getAllCourses(query).queryFn,
  });
};

export const useGetOwnedCourses = (query?: CourseQueryCriteria) => {
  return useQuery({
    queryKey: keyFac.courses.getOwnedCourses(query).queryKey,
    queryFn: keyFac.courses.getOwnedCourses(query).queryFn,
  });
};

export const useGetPublishedCourses = (query?: CourseQueryCriteria) => {
  return useQuery({
    queryKey: keyFac.courses.getPublishedCourses(query).queryKey,
    queryFn: keyFac.courses.getPublishedCourses(query).queryFn,
  });
};

export const useGetCurrentUserEnrollmentStatus = (courseId: string) => {
  const accessToken = useAuthStore((s) => s.accessToken);

  return useQuery({
    queryKey: keyFac.courses.getCurrentUserCourseEnrollmentStatus(courseId).queryKey,
    queryFn: keyFac.courses.getCurrentUserCourseEnrollmentStatus(courseId).queryFn,
    enabled: !!courseId && !!accessToken,
  });
};

export const useGetCourseDetail = (id: string) => {
  return useQuery({
    queryKey: keyFac.courses.getCourseDetail(id).queryKey,
    queryFn: keyFac.courses.getCourseDetail(id).queryFn,
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
    mutationFn: (command: ModerateCourseCommand) => moderateCourse(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.courses._def });
      showSuccessToast("Course moderated", "The course moderation was successful.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () =>
              showErrorToast("Not Found", "The course you are trying to moderate does not exist."),
          },
          {
            status: 400,
            errorCode: ErrorCode.InvalidOperation,
            handler: () =>
              showErrorToast(
                "Invalid Operation",
                "You cannot moderate a course that is not in pending status.",
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
      showSuccessToast("Course Submitted", "The course was submitted for moderation successfully.");
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

export const useResubmitCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => resubmitCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.courses._def });
      showSuccessToast(
        "Course Resubmitted",
        "The course was resubmitted for moderation successfully.",
      );
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () =>
              showErrorToast("Not Found", "The course you are trying to resubmit does not exist."),
          },
          {
            status: 400,
            errorCode: ErrorCode.InvalidOperation,
            handler: () =>
              showErrorToast(
                "Invalid Operation",
                "You cannot resubmit a course that is not in rejected status",
              ),
          },
          {
            status: 400,
            errorCode: ErrorCode.RetryLimitExceeded,
            handler: (err) => {
              const msg = err.response?.data?.message ?? "";
              showErrorToast("Retry Limit Exceeded", msg); // e.g. "You have exceeded the maximum number of retries"
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.courses._def });
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
      queryClient.invalidateQueries({ queryKey: keyFac.courses._def });
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
    queryFn: keyFac.courses.getInstructorByCourseId(courseId).queryFn,
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

// export const useGetCourses = (query?: CourseQueryCriteria) => {
//   return useQuery({
//     queryKey: keyFac.courses.getCourses(query).queryKey,
//     queryFn: () => getCourses(query),
//   });
// };
