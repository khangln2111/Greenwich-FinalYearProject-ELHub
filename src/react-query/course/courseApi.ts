import { GridifyQueryBuilder, ConditionalOperator as op } from "gridify-client";
import { ApiSuccessResponse, ListData } from "../../http-client/api.types";
import apiClient from "../../http-client/apiClient";
import {
  CourseDetailVm,
  CourseQueryCriteria,
  CourseVm,
  CreateCourseCommand,
  InstructorVm,
  LearningCourseVm,
  ReviewCourseCommand,
  UpdateCourseCommand,
} from "./course.types";

const BASE_URL = "/courses";

const buildCourseQuery = (query: CourseQueryCriteria = {}) => {
  const queryBuilder = new GridifyQueryBuilder();

  queryBuilder.setPage(query.page ?? 1);
  queryBuilder.setPageSize(query.pageSize ?? 10);
  queryBuilder.addOrderBy("createdAt", true);

  if (query.search) {
    queryBuilder
      .startGroup()
      .addCondition("title", op.Contains, query.search)
      .or()
      .addCondition("summary", op.Contains, query.search)
      .or()
      .addCondition("description", op.Contains, query.search)
      .endGroup();
  }

  const conditions: Array<() => void> = [];

  if (query.minPrice)
    conditions.push(() =>
      queryBuilder.addCondition("price", op.GreaterThanOrEqual, query.minPrice!),
    );
  if (query.maxPrice)
    conditions.push(() => queryBuilder.addCondition("price", op.LessThanOrEqual, query.maxPrice!));
  if (query.categoryId)
    conditions.push(() => queryBuilder.addCondition("categoryId", op.Equal, query.categoryId!));
  if (query.level)
    conditions.push(() => queryBuilder.addCondition("level", op.Equal, query.level!));
  if (query.durationInSeconds)
    conditions.push(() =>
      queryBuilder.addCondition("durationInSeconds", op.Equal, query.durationInSeconds!),
    );

  conditions.forEach((addCondition, index) => {
    if (index > 0) queryBuilder.and();
    addCondition();
  });

  return queryBuilder.build();
};

export const getCourses = async (query: CourseQueryCriteria = {}) => {
  const response = await apiClient.get<ListData<CourseVm>>(`${BASE_URL}`, {
    params: buildCourseQuery(query),
  });
  return response.data;
};

export const getCourseDetail = async (id: string) => {
  const response = await apiClient.get<CourseDetailVm>(`${BASE_URL}/${id}`);
  return response.data;
};

export const getCourseLearning = async (id: string) => {
  const response = await apiClient.get<LearningCourseVm>(`${BASE_URL}/Learning/${id}`);
  return response.data;
};

export const createCourse = async (command: CreateCourseCommand) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}`, command, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateCourse = async (command: UpdateCourseCommand) => {
  const response = await apiClient.put<ApiSuccessResponse>(`${BASE_URL}`, command, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteCourse = async (id: string) => {
  const response = await apiClient.delete<ApiSuccessResponse>(`${BASE_URL}/${id}`);
  return response.data;
};

export const getInstructorByCourseId = async (id: string) => {
  const response = await apiClient.get<InstructorVm>(`${BASE_URL}/${id}/instructor`);
  return response.data;
};

export const reviewCourse = async (command: ReviewCourseCommand) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}/Review`, command);
  return response.data;
};

export const submitCourseForReview = async (id: string) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}/${id}/SubmitForReview`);
  return response.data;
};

export const retryCourseSubmission = async (id: string) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}/${id}/RetrySubmission`);
  return response.data;
};
