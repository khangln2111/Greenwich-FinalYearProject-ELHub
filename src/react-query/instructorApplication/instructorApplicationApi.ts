import { ApiSuccessResponse, ListData } from "../../http-client/api.types";
import apiClient from "../../http-client/apiClient";
import { applyConditions } from "../../utils/gridifyHelper";
import {
  CreateInstructorApplicationCommand,
  InstructorApplicationQueryCriteria,
  InstructorApplicationVm,
  RetryInstructorApplicationCommand,
  ReviewInstructorApplicationCommand,
} from "./instructorApplication.types";
import { GridifyQueryBuilder, ConditionalOperator as op } from "gridify-client";

const BASE_URL = "/InstructorApplications";

export const buildInstructorApplicationQuery = (query: InstructorApplicationQueryCriteria = {}) => {
  const qb = new GridifyQueryBuilder();
  qb.setPage(query.page ?? 1);
  qb.setPageSize(query.pageSize ?? 10);

  const conditions: Array<() => void> = [];

  if (query.search) {
    conditions.push(() =>
      qb
        .startGroup()
        .addCondition("displayName", op.Contains, query.search!)
        .or()
        .addCondition("email", op.Contains, query.search!)
        .or()
        .addCondition("professionalTitle", op.Contains, query.search!)
        .or()
        .addCondition("fullName", op.Contains, query.search!)
        .endGroup(),
    );
  }

  if (query.status) {
    conditions.push(() => qb.addCondition("status", op.Equal, query.status!));
  }

  applyConditions(qb, conditions);

  if (query.orderBy) {
    qb.addOrderBy(query.orderBy.field, query.orderBy.direction === "asc");
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

export const retryInstructorApplication = async (command: RetryInstructorApplicationCommand) => {
  const response = await apiClient.put<ApiSuccessResponse>(`${BASE_URL}/retry`, command, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const reviewInstructorApplication = async (command: ReviewInstructorApplicationCommand) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}/review`, command);
  return response.data;
};

export const getInstructorApplicationSelf = async () => {
  const response = await apiClient.get<InstructorApplicationVm>(`${BASE_URL}/self`);
  return response.data;
};

export const getCanRetrySelf = async () => {
  const response = await apiClient.get<boolean>(`${BASE_URL}/self/can-retry`);
  return response.data;
};
