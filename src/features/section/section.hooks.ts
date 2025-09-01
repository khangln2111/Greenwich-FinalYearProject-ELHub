import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import { CreateSectionCommand, ReorderSectionCommand, UpdateSectionCommand } from "./section.types";
import { createSection, deleteSection, reorderSection, updateSection } from "./section.api";

export const useReorderSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (command: ReorderSectionCommand) => reorderSection(command),

    onSuccess: async () => {
      showSuccessToast("Section Reordered", "The section was reordered successfully.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Not Found", "The section id or course id not found"),
          },
        ],
      }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: keyFac.courses.getCourseDetail._def,
      });
    },
  });
};

export const useCreateSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (command: CreateSectionCommand) => createSection(command),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: keyFac.courses.getCourseDetail._def,
      });
      showSuccessToast("Section Created", "The section was created successfully.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Not Found", "The course id not found"),
          },
        ],
      }),
  });
};

export const useUpdateSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: UpdateSectionCommand) => updateSection(command),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: keyFac.courses.getCourseDetail._def,
      });
      showSuccessToast("Section Updated", "The section was updated successfully.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Not Found", "The section id not found"),
          },
        ],
      }),
  });
};

export const useDeleteSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sectionId: string) => deleteSection(sectionId),
    onSuccess: () => {
      showSuccessToast("Section Deleted", "The section was deleted successfully.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Not Found", "The section id not found"),
          },
        ],
      }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: keyFac.courses._def,
      });
    },
  });
};
