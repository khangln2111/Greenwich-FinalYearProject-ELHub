import { GridifyQueryBuilder } from "gridify-client";
import { ApiSuccessResponse, ListData } from "../../http-client/api.types";
import apiClient from "../../http-client/apiClient";
import {
  Category,
  CategoryQueryCriteria,
  CreateCategoryCommand,
  UpdateCategoryCommand,
} from "./category.types";

const BASE_URL = "/categories";

const buildCategoryQuery = (query: CategoryQueryCriteria = {}) => {
  const queryBuilder = new GridifyQueryBuilder();

  queryBuilder.setPage(query.page ?? 1);
  queryBuilder.setPageSize(query.pageSize ?? 10);

  return queryBuilder.build();
};

export const getCategories = async (query: CategoryQueryCriteria = {}) => {
  const response = await apiClient.get<ListData<Category>>(`${BASE_URL}`, {
    params: buildCategoryQuery(query),
  });
  return response.data;
};

export const getCategoryDetail = async (id: string) => {
  const response = await apiClient.get<Category>(`${BASE_URL}/${id}`);
  return response.data;
};

export const createCategory = async (command: CreateCategoryCommand) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}`, command);
  return response.data;
};

export const updateCategory = async (command: UpdateCategoryCommand) => {
  const response = await apiClient.put<ApiSuccessResponse>(`${BASE_URL}/${command.id}`, command);
  return response.data;
};

export const deleteCategory = async (id: string) => {
  const response = await apiClient.delete<ApiSuccessResponse>(`${BASE_URL}/${id}`);
  return response.data;
};
