import { GridifyQueryBuilder, ConditionalOperator as op } from "gridify-client";
import { ListData } from "../../http-client/api.types";
import apiClient from "../../http-client/apiClient";
import {
  AssignRoleToUserCommand,
  SetUserActivationCommand,
  UpdateUserCommand,
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

  if (query.search?.trim()) {
    conditions.push(() =>
      qb
        .startGroup()
        .addCondition("fullName", op.Contains, query.search!, false)
        .or()
        .addCondition("email", op.Contains, query.search!, false)
        .endGroup(),
    );
  }
  if (query.role?.trim()) conditions.push(() => qb.addCondition("roles", op.Contains, query.role!));

  if (query.isActivated != null)
    conditions.push(() => qb.addCondition("isActivated", op.Equal, query.isActivated!));

  if (query.fullName?.trim())
    conditions.push(() => qb.addCondition("fullName", op.Contains, query.fullName!));

  if (query.email?.trim()) conditions.push(() => qb.addCondition("email", op.Equal, query.email!));

  applyConditions(qb, conditions);

  if (query.orderBy) {
    qb.addOrderBy(query.orderBy.field, query.orderBy.direction === "desc");
  } else {
    qb.addOrderBy("fullName", false); // true = desc
  }

  return qb.build();
};

export const getUsers = async (query?: UserQueryCriteria) => {
  const response = await apiClient.get<ListData<UserVm>>(`${BASE_URL}`, {
    params: buildUserQuery(query),
  });

  return response.data;
};

export const assignRolesToUser = async (command: AssignRoleToUserCommand) => {
  const response = await apiClient.post(`${BASE_URL}/AssignRoles`, command);
  return response.data;
};

export const setUserActivation = async (command: SetUserActivationCommand) => {
  const response = await apiClient.put(`${BASE_URL}/SetActivation`, command);
  return response.data;
};

export const updateUser = async (command: UpdateUserCommand) => {
  const response = await apiClient.put(`${BASE_URL}`, command, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
