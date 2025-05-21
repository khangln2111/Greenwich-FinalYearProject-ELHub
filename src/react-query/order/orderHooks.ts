import { useMutation } from "@tanstack/react-query";
import { showErrorToast } from "../../utils/toastHelper";
import { handleApiError } from "../common-service/handleApiError";
import { ConfirmPaymentIntentCommand, CreatePaymentIntentCommand } from "./order.types";
import { confirmPaymentIntent, createPaymentIntent } from "./orderApi";
import { ErrorCode } from "../../http-client/api.types";

export const useCreatePaymentIntent = () => {
  return useMutation({
    mutationFn: (command: CreatePaymentIntentCommand) => createPaymentIntent(command),
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Not Found", "The cart or cart items was not found"),
          },
        ],
      }),
  });
};

export const useConfirmPaymentIntent = () => {
  return useMutation({
    mutationFn: (command: ConfirmPaymentIntentCommand) => confirmPaymentIntent(command),
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Not Found", "The cart or cart item was not found"),
          },
          {
            status: 402,
            errorCode: ErrorCode.PaymentFailed,
            handler: () => showErrorToast("Payment failed", "The payment was not successful"),
          },
        ],
      }),
  });
};
