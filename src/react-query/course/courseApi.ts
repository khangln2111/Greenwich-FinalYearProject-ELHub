import { GridifyQueryBuilder, ConditionalOperator as op } from "gridify-client";
import { ListData } from "../../http-client/api.types";
import apiClient from "../../http-client/axios";
import {
  CourseVm,
  CourseQueryCriteria,
  CreateCourseRequest,
  UpdateCourseRequest,
} from "./course.types";

const buildCourseQuery = (query: CourseQueryCriteria = {}) => {
  const queryBuilder = new GridifyQueryBuilder().addOrderBy("createdAt", false);

  queryBuilder.setPage(query.page ?? 1);
  queryBuilder.setPageSize(query.pageSize ?? 10);

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
  const response = await apiClient.get<ListData<CourseVm>>("/courses", {
    params: buildCourseQuery(query),
  });
  return response.data;
};

export const getCourseDetail = async (id: string) => {
  const response = await apiClient.get<CourseVm>(`/courses/${id}`);
  return response.data;
};

export const createCourse = async (course: CreateCourseRequest) => {
  const response = await apiClient.post<CourseVm>("/courses", course);
  return response.data;
};

export const updateCourse = async (course: UpdateCourseRequest) => {
  const response = await apiClient.put<CourseVm>(`/courses/${course.id}`, course);
  return response.data;
};

export const deleteCourse = async (id: string) => {
  const response = await apiClient.delete<CourseVm>(`/courses/${id}`);
  return response.data;
};
