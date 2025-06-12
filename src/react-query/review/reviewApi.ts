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
  const response = await apiClient.get<ListData<ReviewVm>>(`${BASE_URL}/${courseId}`);
  return response.data;
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
