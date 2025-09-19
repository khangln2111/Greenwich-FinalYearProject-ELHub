import { GridifyQueryBuilder, ConditionalOperator as op } from "gridify-client";
import { ApiSuccessResponse, ListData } from "../../api-client/api.types";
import apiClient from "../../api-client/apiClient";
import { applyConditions } from "../../utils/gridifyHelper";
import { InstructorVm } from "../instructor/instructor.types";
import {
  CourseDetailVm,
  CourseEnrollmentStatusVm,
  CourseLevel,
  CoursePriceMode,
  CourseQueryCriteria,
  CourseVm,
  CreateCourseCommand,
  ModerateCourseCommand,
  UpdateCourseCommand,
} from "./course.types";

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
        .addCondition("summary", op.Contains, query.search!, false)
        .or()
        .addCondition("description", op.Contains, query.search!, false)
        .or()
        .addCondition("instructorName", op.Contains, query.search!, false)
        .endGroup(),
    );
  }

  if (query.minPrice != null)
    conditions.push(() =>
      qb.addCondition("discountedPrice", op.GreaterThanOrEqual, query.minPrice!),
    );

  if (query.maxPrice != null)
    conditions.push(() => qb.addCondition("discountedPrice", op.LessThanOrEqual, query.maxPrice!));

  if (query.categoryId?.trim())
    conditions.push(() => qb.addCondition("categoryId", op.Equal, query.categoryId!));

  if (query.minDurationInSeconds != null)
    conditions.push(() =>
      qb.addCondition("durationInSeconds", op.GreaterThanOrEqual, query.minDurationInSeconds!),
    );

  if (query.maxDurationInSeconds != null)
    conditions.push(() =>
      qb.addCondition("durationInSeconds", op.LessThanOrEqual, query.maxDurationInSeconds!),
    );

  if (query.status != null)
    conditions.push(() => qb.addCondition("status", op.Equal, query.status!));

  if (query.levels?.length && query.levels.length < Object.values(CourseLevel).length) {
    conditions.push(() => {
      qb.startGroup().addCondition("level", op.Equal, query.levels![0]);
      for (let i = 1; i < query.levels!.length; i++) {
        qb.or().addCondition("level", op.Equal, query.levels![i]);
      }
      qb.endGroup();
    });
  }

  if (query.priceModes?.length && query.priceModes.length < Object.values(CoursePriceMode).length) {
    const mode = query.priceModes[0];
    if (mode === CoursePriceMode.Free) {
      conditions.push(() => qb.addCondition("discountedPrice", op.Equal, 0));
    } else if (mode === CoursePriceMode.Paid) {
      conditions.push(() => qb.addCondition("discountedPrice", op.GreaterThan, 0));
    }
  }

  if (query.instructorId?.trim())
    conditions.push(() => qb.addCondition("instructorId", op.Equal, query.instructorId!));

  applyConditions(qb, conditions);

  if (query.orderBy) {
    qb.addOrderBy(query.orderBy.field, query.orderBy.direction === "desc");
  } else {
    qb.addOrderBy("createdAt", true); // true = desc
  }

  return qb.build();
};

export const getAllCourses = async (query?: CourseQueryCriteria) => {
  const response = await apiClient.get<ListData<CourseVm>>(`${BASE_URL}/all`, {
    params: buildCourseQuery(query),
  });
  return response.data;
};

export const getOwnedCourses = async (query?: CourseQueryCriteria) => {
  const response = await apiClient.get<ListData<CourseVm>>(`${BASE_URL}/owned`, {
    params: buildCourseQuery(query),
  });
  return response.data;
};
export const getPublishedCourses = async (query?: CourseQueryCriteria) => {
  const response = await apiClient.get<ListData<CourseVm>>(`${BASE_URL}/published`, {
    params: buildCourseQuery(query),
  });
  return response.data;
};

export const getCourseDetail = async (id: string) => {
  const response = await apiClient.get<CourseDetailVm>(`${BASE_URL}/${id}`);
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

export const toggleBannedStatus = async (id: string) => {
  const response = await apiClient.post<ApiSuccessResponse>(
    `${BASE_URL}/${id}/toggle-banned-status`,
  );
  return response.data;
};

export const getInstructorByCourseId = async (id: string) => {
  const response = await apiClient.get<InstructorVm>(`${BASE_URL}/${id}/instructor`);
  return response.data;
};

export const moderateCourse = async (command: ModerateCourseCommand) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}/moderate`, command);
  return response.data;
};

export const submitCourse = async (id: string) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}/${id}/submit`);
  return response.data;
};

export const resubmitCourse = async (id: string) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}/${id}/resubmit`);
  return response.data;
};

export const getCurrentUserCourseEnrollmentStatus = async (courseId: string) => {
  const response = await apiClient.get<CourseEnrollmentStatusVm>(
    `${BASE_URL}/${courseId}/current-user-enrollment-status`,
  );
  return response.data;
};

// export const getCourses = async (query?: CourseQueryCriteria) => {
//   const response = await apiClient.get<ListData<CourseVm>>(`${BASE_URL}`, {
//     params: buildCourseQuery(query),
//   });
//   return response.data;
// };
