import { GridifyQueryBuilder, ConditionalOperator as op } from "gridify-client";
import { ListData } from "../../http-client/api.types";
import apiClient from "../../http-client/apiClient";
import {
  AssignRoleToUserCommand,
  SetUserActivationCommand,
  UserQueryCriteria,
  UserVm,
} from "./user.types";
import { applyConditions } from "../../utils/gridifyHelper";

const BASE_URL = "/users";

const buildUserQuery = (query: UserQueryCriteria = {}) => {
  const qb = new GridifyQueryBuilder();
  qb.setPage(query.page ?? 1);
  qb.setPageSize(query.pageSize ?? 10);
  const conditions: Array<() => void> = [];
  if (query.search) {
    conditions.push(() =>
      qb
        .startGroup()
        .addCondition("fullName", op.Contains, query.search!)
        .or()
        .addCondition("email", op.Contains, query.search!)
        .endGroup(),
    );
  }
  if (query.role) {
    conditions.push(() => qb.addCondition("roles", op.Contains, query.role!));
  }

  if (query.isActivated) {
    conditions.push(() => qb.addCondition("isActivated", op.Equal, query.isActivated!));
  }

  if (query.fullName) {
    conditions.push(() => qb.addCondition("fullName", op.Contains, query.fullName!));
  }

  if (query.email) {
    conditions.push(() => qb.addCondition("email", op.Contains, query.email!));
  }

  applyConditions(qb, conditions);

  if (query.orderBy) {
    qb.addOrderBy(query.orderBy.field, query.orderBy.direction === "asc");
  } else {
    qb.addOrderBy("fullName", true);
  }
};

export const getUsers = async (query?: UserQueryCriteria) => {
  const response = await apiClient.get<ListData<UserVm>>(`${BASE_URL}`, {
    params: buildUserQuery(query),
  });

  return response.data;
};

export const assignRolesToUser = async (command: AssignRoleToUserCommand) => {
  const response = await apiClient.post(`${BASE_URL}/assign-roles`, command);
  return response.data;
};

export const setUserActivation = async (command: SetUserActivationCommand) => {
  const response = await apiClient.post(`${BASE_URL}/set-activation`, command);
  return response.data;
};
