import { GridifyQueryBuilder } from "gridify-client";
import { InstructorQueryCriteria, InstructorVm } from "./instructor.types";
import { applyConditions } from "../../utils/gridifyHelper";
import apiClient from "../../http-client/apiClient";
import { ListData } from "../../http-client/api.types";
import { CourseQueryCriteria, CourseVm } from "../course/course.types";
import { buildCourseQuery } from "../course/courseApi";

const BASE_URL = "/instructors";

const buildInstructorQuery = (query: InstructorQueryCriteria = {}) => {
  const qb = new GridifyQueryBuilder();
  qb.setPage(query.page ?? 1);
  qb.setPageSize(query.pageSize ?? 10);

  const conditions: Array<() => void> = [];
  if (query.search?.trim()) {
    conditions.push(() =>
      qb
        .startGroup()
        .addCondition("email", "contains", query.search!, false)
        .or()
        .addCondition("fullName", "contains", query.search!, false)
        .endGroup(),
    );
  }

  applyConditions(qb, conditions);

  if (query.orderBy != null) {
    qb.addOrderBy(query.orderBy.field, query.orderBy.direction === "desc");
  } else {
    qb.addOrderBy("createdAt", true); // true = desc
  }
  return qb.build();
};

export const getInstructors = async (query?: InstructorQueryCriteria) => {
  const response = await apiClient.get<ListData<InstructorVm>>(`${BASE_URL}`, {
    params: buildInstructorQuery(query),
  });
  return response.data;
};

export const getInstructorById = async (id: string) => {
  const response = await apiClient.get<InstructorVm>(`${BASE_URL}/${id}`);
  return response.data;
};

export const getCoursesByInstructorId = async (
  instructorId: string,
  query?: CourseQueryCriteria,
) => {
  const response = await apiClient.get<ListData<CourseVm>>(`${BASE_URL}/${instructorId}/courses`, {
    params: buildCourseQuery(query),
  });
  return response.data;
};
