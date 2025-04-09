import { GridifyQueryBuilder, ConditionalOperator as op } from "gridify-client";
import {
  Category,
  CategoryQueryCriteria,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "./category.types";
import { ListData } from "../../httpClient/api.types";
import apiClient from "../../httpClient/axios";

const buildCategoryQuery = (query: CategoryQueryCriteria = {}) => {
  const queryBuilder = new GridifyQueryBuilder();

  queryBuilder.setPage(query.page ?? 1);
  queryBuilder.setPageSize(query.pageSize ?? 10);

  return queryBuilder.build();
};

export const getCategories = async (query: CategoryQueryCriteria = {}) => {
  const response = await apiClient.get<ListData<Category>>("/categories", {
    params: buildCategoryQuery(query),
  });
  return response.data;
};

export const getCategoryDetail = async (id: string) => {
  const response = await apiClient.get<Category>(`/categories/${id}`);
  return response.data;
};

export const createCategory = async (category: CreateCategoryRequest) => {
  const response = await apiClient.post<Category>("/categories", category);
  return response.data;
};

export const updateCategory = async (category: UpdateCategoryRequest) => {
  const response = await apiClient.put<Category>(`/categories/${category.id}`, category);
  return response.data;
};

export const deleteCategory = async (id: string) => {
  const response = await apiClient.delete<Category>(`/categories/${id}`);
  return response.data;
};
