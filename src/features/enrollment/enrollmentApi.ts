import { GridifyQueryBuilder, ConditionalOperator as op } from "gridify-client";
import { ApiSuccessResponse, ListData } from "../../api-client/api.types";
import apiClient from "../../api-client/apiClient";
import {
  EnrollFromInventoryCommand,
  EnrollmentQueryCriteria,
  EnrollmentSelfVm,
} from "./enrollment.types";
import { applyConditions } from "../../utils/gridifyHelper";
import { EnrollmentDetailSelfVm } from "../course/course.types";

const BASE_URL = "/enrollments";

export const buildEnrollmentQuery = (query: EnrollmentQueryCriteria = {}) => {
  const qb = new GridifyQueryBuilder();

  qb.setPage(query.page ?? 1);
  qb.setPageSize(query.pageSize ?? 10);

  const conditions: Array<() => void> = [];

  if (query.search?.trim()) {
    conditions.push(() =>
      qb
        .startGroup()
        .addCondition("courseTitle", op.Contains, query.search!, false)
        .or()
        .addCondition("courseSummary", op.Contains, query.search!, false)
        .or()
        .addCondition("courseDescription", op.Contains, query.search!, false)
        .or()
        .addCondition("instructorName", op.Contains, query.search!, false)
        .endGroup(),
    );
  }

  applyConditions(qb, conditions);

  if (query.orderBy) {
    qb.addOrderBy(query.orderBy.field, query.orderBy.direction === "desc");
  } else {
    qb.addOrderBy("createdAt", true); // true = desc
  }
  return qb.build();
};

export const getEnrollmentsSelf = async (query?: EnrollmentQueryCriteria) => {
  const response = await apiClient.get<ListData<EnrollmentSelfVm>>(`${BASE_URL}/self`, {
    params: buildEnrollmentQuery(query),
  });
  return response.data;
};

export const getEnrollmentDetailSelf = async (id: string) => {
  const response = await apiClient.get<EnrollmentDetailSelfVm>(`${BASE_URL}/self/${id}`);
  return response.data;
};

export const enrollFromInventory = async (command: EnrollFromInventoryCommand) => {
  const response = await apiClient.post<ApiSuccessResponse>(
    `${BASE_URL}/EnrollFromInventory`,
    command,
  );

  return response.data;
};
