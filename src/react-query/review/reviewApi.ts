import { GridifyQueryBuilder, ConditionalOperator as op } from "gridify-client";
import { ApiSuccessResponse, ListData } from "../../http-client/api.types";
import apiClient from "../../http-client/apiClient";
import {
  CreateReviewCommand,
  ReplyToReviewCommand,
  ReviewQueryCriteria,
  ReviewVm,
  UpdateReviewCommand,
  UpdateReviewReplyCommand,
} from "./review.types";
import { applyConditions } from "../../utils/gridifyHelper";

const BASE_URL = "/reviews";

export const getReviewsByCourseId = async (courseId: string, query: ReviewQueryCriteria = {}) => {
  const response = await apiClient.get<ListData<ReviewVm>>(`${BASE_URL}/course/${courseId}`, {
    params: buildReviewQuery(query),
  });
  return response.data;
};

export const buildReviewQuery = (query: ReviewQueryCriteria = {}) => {
  const queryBuilder = new GridifyQueryBuilder();
  queryBuilder.setPage(query.page ?? 1);
  queryBuilder.setPageSize(query.pageSize ?? 10);

  const conditions: Array<() => void> = [];

  if (query.content?.trim())
    conditions.push(() => queryBuilder.addCondition("content", op.Contains, query.content!, false));

  if (query.rating != null)
    conditions.push(() => queryBuilder.addCondition("rating", op.Equal, query.rating!));

  if (query.isReplied != null)
    conditions.push(() => queryBuilder.addCondition("isReplied", op.Equal, query.isReplied!));

  applyConditions(queryBuilder, conditions);

  if (query.orderBy != null) {
    queryBuilder.addOrderBy(query.orderBy.field, query.orderBy.direction === "desc");
  } else {
    queryBuilder.addOrderBy("createdAt", true); // true = desc
  }

  return queryBuilder.build();
};

export const createReview = async (command: CreateReviewCommand) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}`, command);
  return response.data;
};

export const updateReview = async (command: UpdateReviewCommand) => {
  const response = await apiClient.put<ApiSuccessResponse>(`${BASE_URL}`, command);
  return response.data;
};

export const deleteReview = async (id: string) => {
  const response = await apiClient.delete<ApiSuccessResponse>(`${BASE_URL}/${id}`);
  return response.data;
};

export const replyToReview = async (command: ReplyToReviewCommand) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}/reply`, command);
  return response.data;
};

export const updateReviewReply = async (command: UpdateReviewReplyCommand) => {
  const response = await apiClient.put<ApiSuccessResponse>(`${BASE_URL}/reply`, command);
  return response.data;
};
