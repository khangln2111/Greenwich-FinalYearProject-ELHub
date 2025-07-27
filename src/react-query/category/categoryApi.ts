import { GridifyQueryBuilder, ConditionalOperator as op } from "gridify-client";
import { ApiSuccessResponse, ListData } from "../../http-client/api.types";
import apiClient from "../../http-client/apiClient";
import {
  CategoryVm,
  CategoryQueryCriteria,
  CreateCategoryCommand,
  UpdateCategoryCommand,
} from "./category.types";

const BASE_URL = "/categories";

const buildCategoryQuery = (query: CategoryQueryCriteria = {}) => {
  const qb = new GridifyQueryBuilder();

  qb.setPage(query.page ?? 1);
  qb.setPageSize(query.pageSize ?? 20);
  if (query.name?.trim()) {
    qb.addCondition("name", op.Contains, query.name, false);
  }

  return qb.build();
};

export const getCategories = async (query: CategoryQueryCriteria = {}) => {
  const response = await apiClient.get<ListData<CategoryVm>>(`${BASE_URL}`, {
    params: buildCategoryQuery(query),
  });
  return response.data;
};

export const getCategoryDetail = async (id: string) => {
  const response = await apiClient.get<CategoryVm>(`${BASE_URL}/${id}`);
  return response.data;
};

export const createCategory = async (command: CreateCategoryCommand) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}`, command, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateCategory = async (command: UpdateCategoryCommand) => {
  const response = await apiClient.put<ApiSuccessResponse>(`${BASE_URL}`, command, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteCategory = async (id: string) => {
  const response = await apiClient.delete<ApiSuccessResponse>(`${BASE_URL}/${id}`);
  return response.data;
};
