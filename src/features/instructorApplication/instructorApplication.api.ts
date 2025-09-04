import { ApiSuccessResponse, ListData } from "../../api-client/api.types";
import apiClient from "../../api-client/apiClient";
import { applyConditions } from "../../utils/gridifyHelper";
import {
  CreateInstructorApplicationCommand,
  InstructorApplicationQueryCriteria,
  InstructorApplicationVm,
  ResubmitInstructorApplicationCommand,
  ModerateInstructorApplicationCommand,
} from "./instructorApplication.types";
import { GridifyQueryBuilder, ConditionalOperator as op } from "gridify-client";

const BASE_URL = "/instructor-applications";

export const buildInstructorApplicationQuery = (query: InstructorApplicationQueryCriteria = {}) => {
  const qb = new GridifyQueryBuilder();
  qb.setPage(query.page ?? 1);
  qb.setPageSize(query.pageSize ?? 10);

  const conditions: Array<() => void> = [];

  if (query.search?.trim()) {
    conditions.push(() =>
      qb
        .startGroup()
        .addCondition("email", op.Contains, query.search!, false)
        .or()
        .addCondition("professionalTitle", op.Contains, query.search!, false)
        .or()
        .addCondition("fullName", op.Contains, query.search!, false)
        .endGroup(),
    );
  }

  if (query.status != null)
    conditions.push(() => qb.addCondition("status", op.Equal, query.status!));

  applyConditions(qb, conditions);

  if (query.orderBy != null) {
    qb.addOrderBy(query.orderBy.field, query.orderBy.direction === "desc");
  } else {
    qb.addOrderBy("createdAt", true); // true = desc
  }

  return qb.build();
};

export const getInstructorApplications = async (query?: InstructorApplicationQueryCriteria) => {
  const response = await apiClient.get<ListData<InstructorApplicationVm>>(`${BASE_URL}`, {
    params: buildInstructorApplicationQuery(query),
  });
  return response.data;
};

export const createInstructorApplication = async (command: CreateInstructorApplicationCommand) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}`, command, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const resubmitInstructorApplication = async (
  command: ResubmitInstructorApplicationCommand,
) => {
  const response = await apiClient.put<ApiSuccessResponse>(`${BASE_URL}/resubmit`, command, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const moderateInstructorApplication = async (
  command: ModerateInstructorApplicationCommand,
) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}/moderate`, command);
  return response.data;
};

export const getInstructorApplicationSelf = async () => {
  const response = await apiClient.get<InstructorApplicationVm>(`${BASE_URL}/self`);
  return response.data;
};

export const getCanRetrySelf = async () => {
  const response = await apiClient.get<boolean>(`${BASE_URL}/self/can-resubmit`);
  return response.data;
};
