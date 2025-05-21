import { ApiSuccessResponse } from "../../http-client/api.types";
import apiClient from "../../http-client/apiClient";
import { ConfirmPaymentIntentCommand, CreatePaymentIntentCommand } from "./order.types";

const BASE_URL = "/orders";

export const createPaymentIntent = async (command: CreatePaymentIntentCommand) => {
  const response = await apiClient.post<
    ApiSuccessResponse<{
      clientSecret: string;
    }>
  >(`${BASE_URL}/CreatePaymentIntent`, command);
  return response.data;
};

export const confirmPaymentIntent = async (command: ConfirmPaymentIntentCommand) => {
  const response = await apiClient.post<ApiSuccessResponse>(
    `${BASE_URL}/ConfirmPaymentIntent`,
    command,
  );
  return response.data;
};
