import { ApiSuccessResponse, ListData } from "../../http-client/api.types";
import apiClient from "../../http-client/apiClient";
import { CreatePaymentIntentCommand, OrderQueryCriteria, OrderVm } from "./order.types";

const BASE_URL = "/orders";

export const createPaymentIntent = async (command: CreatePaymentIntentCommand) => {
  const response = await apiClient.post<
    ApiSuccessResponse<{
      clientSecret: string;
    }>
  >(`${BASE_URL}/CreatePaymentIntent`, command);
  return response.data;
};

export const confirmPaymentIntent = async (paymentIntentId: string) => {
  const response = await apiClient.get<ApiSuccessResponse>(
    `${BASE_URL}/ConfirmPaymentIntent/${paymentIntentId}`,
  );
  return response.data;
};

const buildOrderQuery = (query: OrderQueryCriteria = {}) => {
  const queryBuilder = new URLSearchParams();
  if (query.status) queryBuilder.append("status", query.status);
  if (query.pageNumber) queryBuilder.append("pageNumber", query.pageNumber.toString());
  if (query.pageSize) queryBuilder.append("pageSize", query.pageSize.toString());
  return queryBuilder.toString();
};

export const getOrdersSelf = async (query?: OrderQueryCriteria) => {
  const response = await apiClient.get<ListData<OrderVm>>(`${BASE_URL}/me`, {
    params: buildOrderQuery(query),
  });
  return response.data;
};
