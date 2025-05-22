import { ApiSuccessResponse } from "../../http-client/api.types";
import apiClient from "../../http-client/apiClient";
import { CreatePaymentIntentCommand } from "./order.types";

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
