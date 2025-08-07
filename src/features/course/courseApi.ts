import { GridifyQueryBuilder, ConditionalOperator as op } from "gridify-client";
import { ApiSuccessResponse, ListData } from "../../api-client/api.types";
import apiClient from "../../api-client/apiClient";
import {
  CourseDetailVm,
  CourseQueryCriteria,
  CourseVm,
  CreateCourseCommand,
  LearningCourseVm,
  ReviewCourseCommand,
  UpdateCourseCommand,
} from "./course.types";
import { applyConditions } from "../../utils/gridifyHelper";
import { InstructorVm } from "../instructor/instructor.types";

const BASE_URL = "/courses";

export const buildCourseQuery = (query: CourseQueryCriteria = {}) => {
  const qb = new GridifyQueryBuilder();

  qb.setPage(query.page ?? 1);
  qb.setPageSize(query.pageSize ?? 10);

  const conditions: Array<() => void> = [];

  if (query.search?.trim()) {
    conditions.push(() =>
      qb
        .startGroup()
        .addCondition("title", op.Contains, query.search!, false)
        .or()
        .addCondition("description", op.Contains, query.search!, false)
        .or()
        .addCondition("instructorName", op.Contains, query.search!, false)
        .endGroup(),
    );
  }

  if (query.minPrice != null)
    conditions.push(() => qb.addCondition("price", op.GreaterThanOrEqual, query.minPrice!));

  if (query.maxPrice != null)
    conditions.push(() => qb.addCondition("price", op.LessThanOrEqual, query.maxPrice!));

  if (query.categoryId?.trim())
    conditions.push(() => qb.addCondition("categoryId", op.Equal, query.categoryId!));

  if (query.level?.trim()) conditions.push(() => qb.addCondition("level", op.Equal, query.level!));

  if (query.durationInSeconds != null)
    conditions.push(() => qb.addCondition("durationInSeconds", op.Equal, query.durationInSeconds!));

  if (query.status != null)
    conditions.push(() => qb.addCondition("status", op.Equal, query.status!));

  applyConditions(qb, conditions);

  if (query.orderBy) {
    qb.addOrderBy(query.orderBy.field, query.orderBy.direction === "desc");
  } else {
    qb.addOrderBy("createdAt", true); // true = desc
  }

  return qb.build();
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
