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

  const conditions: Array<() => void> = [];

  if (query.search) {
    conditions.push(() =>
      queryBuilder
        .startGroup()
        .addCondition("title", op.Contains, query.search!)
        .or()
        .addCondition("description", op.Contains, query.search!)
        .endGroup(),
    );
  }

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

  if (query.status)
    conditions.push(() => queryBuilder.addCondition("status", op.Equal, query.status!));

  conditions.forEach((addCondition, index) => {
    if (index > 0) queryBuilder.and();
    addCondition();
  });

  if (query.orderBy) {
    queryBuilder.addOrderBy(query.orderBy.field, query.orderBy.direction === "desc");
  } else {
    // Mặc định sắp xếp theo createdAt giảm dần (mới nhất trước)
    queryBuilder.addOrderBy("createdAt", true);
  }

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

export const moderateCourse = async (command: ReviewCourseCommand) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}/Moderate`, command);
  return response.data;
};

export const submitCourse = async (id: string) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}/${id}/Submit`);
  return response.data;
};

export const retrySubmitCourse = async (id: string) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}/${id}/RetrySubmit`);
  return response.data;
};
