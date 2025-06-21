import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import { CourseQueryCriteria, CreateCourseCommand, UpdateCourseCommand } from "./course.types";
import {
  createCourse,
  deleteCourse,
  getCourseDetail,
  getCourseLearning,
  getCourses,
  getInstructorByCourseId,
  updateCourse,
} from "./courseApi";
import { useAppStore } from "../../zustand/store";

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
      // ❌ Không retry nếu là 404
      if (error && error.response?.status === 404) {
        return false;
      }
      // ✅ Retry tối đa 2 lần cho lỗi khác
      return failureCount < 2;
    },
  });
};

export const useGetCourseLearning = (id: string) => {
  const currentUser = useAppStore.use.currentUser();
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
      // ❌ Không retry nếu là 404
      if (error && error.response?.status === 404) {
        return false;
      }
      // ✅ Retry tối đa 2 lần cho lỗi khác
      return failureCount < 2;
    },
  });
};
