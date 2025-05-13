import { GridifyQueryBuilder, ConditionalOperator as op } from "gridify-client";
import { ApiSuccessResponse, ListData } from "../../http-client/api.types";
import apiClient from "../../http-client/apiClient";
import { CourseVm, CourseQueryCriteria, UpdateCourseCommand, CourseDetailVm } from "./course.types";
import { CreateCourseRequest } from "./course.schema";

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

  if (query.minPrice) queryBuilder.addCondition("price", op.GreaterThanOrEqual, query.minPrice);
  if (query.maxPrice) queryBuilder.addCondition("price", op.LessThanOrEqual, query.maxPrice);
  if (query.categoryId) queryBuilder.addCondition("categoryId", op.Equal, query.categoryId);
  if (query.level) queryBuilder.addCondition("level", op.Equal, query.level);
  if (query.durationInSeconds)
    queryBuilder.addCondition("durationInSeconds", op.Equal, query.durationInSeconds);

  return queryBuilder.build();
};

export const getCourses = async (query: CourseQueryCriteria = {}) => {
  const response = await apiClient.get<ListData<CourseVm>>(`${BASE_URL}`, {
    params: buildCourseQuery(query),
  });
  return response.data;
};

export const getCourseDetail = async (id: string) => {
  const response = await apiClient.get<CourseDetailVm>(`/courses/${id}`);
  return response.data;
};

export const createCourse = async (course: CreateCourseRequest) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}`, course, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateCourse = async (course: UpdateCourseCommand) => {
  const response = await apiClient.put<ApiSuccessResponse>(`${BASE_URL}`, course, {
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
