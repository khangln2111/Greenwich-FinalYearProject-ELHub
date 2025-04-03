import { GridifyQueryBuilder, ConditionalOperator as op } from "gridify-client";
import { ListData } from "../types/api";
import apiClient from "./axios";
import { Course, CourseQueryCriteria, CreateCourseRequest } from "../types/course";

export const getCourses = async (query: CourseQueryCriteria) => {
  // Xây dựng query bằng GridifyQueryBuilder
  const queryBuilder = new GridifyQueryBuilder().addOrderBy("createdAt", false);

  // Nếu có các tiêu chí filter, thêm chúng vào query
  if (!query.page) queryBuilder.setPage(1); // Đặt page mặc định là 1 nếu không có giá trị
  if (!query.pageSize) queryBuilder.setPageSize(10); // Đặt pageSize mặc định là 10 nếu không có giá trị
  if (query.page) queryBuilder.setPage(query.page);
  if (query.pageSize) queryBuilder.setPageSize(query.pageSize);

  if (query.search) {
    queryBuilder.startGroup();
    queryBuilder.addCondition("title", op.Contains, query.search);
    queryBuilder.or();
    queryBuilder.addCondition("summary", op.Contains, query.search);
    queryBuilder.or();
    queryBuilder.addCondition("description", op.Contains, query.search);
    queryBuilder.endGroup();
  }

  if (query.minPrice) queryBuilder.addCondition("price", op.GreaterThanOrEqual, query.minPrice);
  if (query.maxPrice) queryBuilder.addCondition("price", op.LessThanOrEqual, query.maxPrice);
  if (query.categoryId) queryBuilder.addCondition("categoryId", op.Equal, query.categoryId);
  if (query.level) queryBuilder.addCondition("level", op.Equal, query.level);
  if (query.durationInSeconds)
    queryBuilder.addCondition("durationInSeconds", op.Equal, query.durationInSeconds);

  // Build searchParams từ queryBuilder
  const searchParams = queryBuilder.build();

  // Gọi apiClient với các searchParams đã xây dựng, sử dụng axios
  const response = await apiClient.get<ListData<Course>>("/courses", {
    params: searchParams, // Axios tự động xử lý việc chuyển đổi params thành query string
  });

  console.log("Fetched courses");

  return response.data;
};

export const getCourse = async (id: string) => {
  const response = await apiClient.get<Course>(`/courses/${id}`);
  return response.data;
};

export const createCourse = async (course: CreateCourseRequest) => {
  const response = await apiClient.post<Course>("/courses", course);
  return response.data;
};

export const updateCourse = async (course: Course) => {
  const response = await apiClient.put<Course>(`/courses/${course.id}`, course);
  return response.data;
};

export const deleteCourse = async (id: string) => {
  const response = await apiClient.delete<Course>(`/courses/${id}`);
  return response.data;
};
