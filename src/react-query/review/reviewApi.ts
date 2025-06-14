import { GridifyQueryBuilder } from "gridify-client";
import { ListData } from "../../http-client/api.types";
import apiClient from "../../http-client/apiClient";
import {
  CreateReviewCommand,
  ReviewQueryCriteria,
  ReviewVm,
  UpdateReviewCommand,
} from "./review.types";

const BASE_URL = "/reviews";

export const getReviewsByCourseId = async (courseId: string, query: ReviewQueryCriteria = {}) => {
  const response = await apiClient.get<ListData<ReviewVm>>(`${BASE_URL}/course/${courseId}`, {
    params: buildReviewQuery(query),
  });
  return response.data;
};

export const buildReviewQuery = (query: ReviewQueryCriteria = {}) => {
  const queryBuilder = new GridifyQueryBuilder();
  queryBuilder.setPage(query.pageIndex ?? 1);
  queryBuilder.setPageSize(query.pageSize ?? 10);
  queryBuilder.addOrderBy("createdAt", true);

  if (query.content) {
    queryBuilder.addCondition("content", "Contains", query.content, false);
  }

  if (query.rating) {
    queryBuilder.addCondition("rating", "Equal", query.rating);
  }

  return queryBuilder.build();
};

export const createReview = async (command: CreateReviewCommand) => {
  const response = await apiClient.post<ReviewVm>(`${BASE_URL}`, command);
  return response.data;
};

export const updateReview = async (command: UpdateReviewCommand) => {
  const response = await apiClient.put<ReviewVm>(`${BASE_URL}`, command);
  return response.data;
};

export const deleteReview = async (id: string) => {
  const response = await apiClient.delete(`${BASE_URL}/${id}`);
  return response.data;
};
