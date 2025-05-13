// src/api/lectureHooks.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import { createLecture, deleteLecture, reorderLecture, updateLecture } from "./lectureApi";
import { CreateLectureCommand, ReorderLectureCommand } from "./lecture.types";

export const useReorderLecture = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ command }: { command: ReorderLectureCommand; courseId: string }) =>
      reorderLecture(command),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: keyFac.courses.detail(variables.courseId).queryKey,
      });
      showSuccessToast("Lecture Reordered", "The lecture was reordered successfully.");
    },

    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Not Found", "The lecture or section was not found"),
          },
        ],
      }),
  });
};

export const useCreateLecture = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ command }: { command: CreateLectureCommand; courseId: string }) =>
      createLecture(command),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: keyFac.courses.detail(variables.courseId).queryKey,
      });
      showSuccessToast("Lecture Created", "The lecture was created successfully.");
    },

    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Not Found", "The section ID or course ID was not found"),
          },
        ],
      }),
  });
};

export const useUpdateLecture = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ command }: { command: CreateLectureCommand; courseId: string }) =>
      updateLecture(command),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: keyFac.courses.detail(variables.courseId).queryKey,
      });
      showSuccessToast("Lecture Updated", "The lecture was updated successfully.");
    },

    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Not Found", "The lecture or section ID was not found"),
          },
        ],
      }),
  });
};

export const useDeleteLecture = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lectureId }: { lectureId: string; courseId: string }) =>
      deleteLecture(lectureId),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: keyFac.courses.detail(variables.courseId).queryKey,
      });
      showSuccessToast("Lecture Deleted", "The lecture was deleted successfully.");
    },

    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Not Found", "The lecture ID was not found"),
          },
        ],
      }),
  });
};
