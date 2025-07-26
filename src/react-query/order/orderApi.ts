import { GridifyQueryBuilder, ConditionalOperator as op } from "gridify-client";

import { ApiSuccessResponse, ListData } from "../../http-client/api.types";
import apiClient from "../../http-client/apiClient";
import { CreateOrderCommand, OrderDetailVm, OrderQueryCriteria, OrderVm } from "./order.types";

const BASE_URL = "/orders";

export const createOrder = async (command: CreateOrderCommand) => {
  const response = await apiClient.post<
    ApiSuccessResponse<{
      clientSecret?: string;
      orderId: string;
      isFree: boolean;
      status: string;
    }>
  >(`${BASE_URL}/Create`, command);
  return response.data;
};

export const confirmOrder = async (id: string) => {
  const response = await apiClient.get<
    ApiSuccessResponse<{
      orderId: string;
      status: string;
    }>
  >(`${BASE_URL}/${id}/Confirm`);
  return response.data;
};

export const getOrdersSelf = async (query?: OrderQueryCriteria) => {
  const response = await apiClient.get<ListData<OrderVm>>(`${BASE_URL}/self`, {
    params: buildOrderQuery(query),
  });
  return response.data;
};

export const getOrderDetailSelf = async (id: string) => {
  const response = await apiClient.get<OrderDetailVm>(`${BASE_URL}/self/${id}`);
  return response.data;
};

const buildOrderQuery = (query: OrderQueryCriteria = {}) => {
  const queryBuilder = new GridifyQueryBuilder();

  queryBuilder.setPage(query.page ?? 1);
  queryBuilder.setPageSize(query.pageSize ?? 10);

  if (query.orderBy !== undefined) {
    queryBuilder.addOrderBy(query.orderBy.field, query.orderBy.direction === "desc");
  } else {
    // Mặc định sắp xếp theo createdAt giảm dần (mới nhất trước)
    queryBuilder.addOrderBy("createdAt", true);
  }

  if (query.status !== undefined) queryBuilder.addCondition("status", op.Equal, query.status);

  return queryBuilder.build();
};
