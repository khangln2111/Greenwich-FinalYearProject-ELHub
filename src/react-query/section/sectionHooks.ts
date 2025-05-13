import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import { CreateSectionCommand, ReorderSectionCommand, UpdateSectionCommand } from "./section.types";
import { createSection, deleteSection, reorderSection, updateSection } from "./sectionApi";

export const useReorderSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ section }: { section: ReorderSectionCommand; courseId: string }) =>
      reorderSection(section),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: keyFac.courses.detail(variables.courseId).queryKey,
      });
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
  });
};

export const useCreateSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (section: CreateSectionCommand) => createSection(section),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: keyFac.courses.detail(variables.courseId).queryKey,
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
    mutationFn: ({ section }: { section: UpdateSectionCommand; courseId: string }) =>
      updateSection(section),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: keyFac.courses.detail(variables.courseId).queryKey,
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
    mutationFn: ({ sectionId }: { sectionId: string; courseId: string }) =>
      deleteSection(sectionId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: keyFac.courses.detail(variables.courseId).queryKey,
      });
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
  });
};
