import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CategoryQueryCriteria,
  CreateCategoryCommand,
  UpdateCategoryCommand,
} from "./category.types";

import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryDetail,
  updateCategory,
} from "./categoryApi";

export const useGetCategories = (query: CategoryQueryCriteria = {}) => {
  return useQuery({
    queryKey: keyFac.categories.list(query).queryKey,
    queryFn: () => getCategories(query),
  });
};

export const useGetCategoryDetail = (id: string) => {
  return useQuery({
    queryKey: keyFac.categories.detail(id).queryKey,
    queryFn: () => getCategoryDetail(id),
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
