import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  CategoryQueryCriteria,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "./category.types";

import { ApiErrorResponse, ErrorCode } from "../../http-client/api.types";
import { showErrorToast, showSuccessToast } from "../toastHelper";
import { keyFac } from "../queryKeyFactory";
import { createCategory, deleteCategory, updateCategory } from "./categoryApi";

export const useGetCategories = (query: CategoryQueryCriteria = {}) => {
  return useQuery(keyFac.categories.list(query));
};

export const useGetCategoryDetail = (id: string) => {
  return useQuery(keyFac.categories.detail(id));
};

export const useCreateCategory = (category: CreateCategoryRequest) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createCategory(category),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: keyFac.categories.list._def });
      showSuccessToast("Category Created", "Category created successfully.");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => handleApiError(error),
  });
};

export const useUpdateCategory = (category: UpdateCategoryRequest) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.categories.list._def });
      showSuccessToast("Category Updated", "The category was updated successfully.");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => handleApiError(error),
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
    onError: (error: AxiosError<ApiErrorResponse>) => handleApiError(error),
  });
};

const handleApiError = (error: AxiosError<ApiErrorResponse>) => {
  if (error.response) {
    const { status, data } = error.response;
    if (status === 400 && data.errorCode === ErrorCode.ValidationError) {
      showErrorToast("Validation Error", data.message);
    } else if (status === 401) {
      showErrorToast("Unauthorized", "You must login to perform this action.");
    } else if (status === 403) {
      showErrorToast("Forbidden", "You do not have permission to perform this action.");
    } else if (status === 404) {
      showErrorToast("Not Found", "The requested category does not exist.");
    } else {
      showErrorToast("Unexpected Error", error.message);
    }
  } else {
    console.error("Axios Error:", error);
    showErrorToast("Network Error", "No response from the server. Please try again later.");
  }
};
