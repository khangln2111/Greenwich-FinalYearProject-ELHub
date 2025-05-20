import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CategoryQueryCriteria,
  CreateCategoryCommand,
  UpdateCategoryCommand,
} from "./category.types";

import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import { createCategory, deleteCategory, updateCategory } from "./categoryApi";

export const useGetCategories = (query: CategoryQueryCriteria = {}) => {
  return useQuery(keyFac.categories.list(query));
};

export const useGetCategoryDetail = (id: string) => {
  return useQuery(keyFac.categories.detail(id));
};

export const useCreateCategory = (category: CreateCategoryCommand) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createCategory(category),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: keyFac.categories.list._def });
      showSuccessToast("Category Created", "Category created successfully.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Not Found", "The category may not exist."),
          },
        ],
      }),
  });
};

export const useUpdateCategory = (category: UpdateCategoryCommand) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.categories.list._def });
      showSuccessToast("Category Updated", "The category was updated successfully.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Not Found", "The category may not exist."),
          },
        ],
      }),
  });
};

export const useDeleteCategory = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.categories.list._def });
      showSuccessToast("Category Deleted", "The category was deleted successfully.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Not Found", "The category may not exist."),
          },
        ],
      }),
  });
};
