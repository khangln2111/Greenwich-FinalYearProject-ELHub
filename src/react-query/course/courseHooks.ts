import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import { CreateCourseRequest } from "./course.schema";
import { CourseQueryCriteria, UpdateCourseCommand } from "./course.types";
import { createCourse, deleteCourse, updateCourse } from "./courseApi";

export const useGetCourses = (query: CourseQueryCriteria = {}) => {
  return useQuery(keyFac.courses.list(query));
};

export const useGetCourseDetail = (id: string) => {
  return useQuery(keyFac.courses.detail(id));
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (command: CreateCourseRequest) => createCourse(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses", "list"] });
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
      queryClient.invalidateQueries({ queryKey: keyFac.courses.detail(variables.id).queryKey });
      queryClient.invalidateQueries({ queryKey: keyFac.courses.list._def });
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
      queryClient.invalidateQueries({ queryKey: keyFac.courses.list._def });
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
