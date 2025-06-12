import { useMutation, useQuery } from "@tanstack/react-query";
import { showErrorToast } from "../../utils/toastHelper";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import { CreatePaymentIntentCommand, OrderQueryCriteria } from "./order.types";
import {
  confirmPaymentIntent,
  createPaymentIntent,
  getOrderDetailSelf,
  getOrdersSelf,
} from "./orderApi";

export const useGetOrdersSelf = (query?: OrderQueryCriteria) => {
  return useQuery({
    queryKey: keyFac.orders.getOrdersSelf(query).queryKey,
    queryFn: () => getOrdersSelf(query),
  });
};

export const useGetOrderDetailSelf = (id: string) => {
  return useQuery({
    queryKey: keyFac.orders.getOrderDetailSelf(id).queryKey,
    queryFn: () => getOrderDetailSelf(id),
    enabled: !!id,
    retry: (failureCount, error) => {
      // ❌ Không retry nếu là 404
      if (error && error.response?.status === 404) {
        return false;
      }
      // ✅ Retry tối đa 2 lần cho lỗi khác
      return failureCount < 2;
    },
  });
};

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

export const useConfirmPaymentIntent = (paymentIntentId: string) => {
  return useQuery({
    queryKey: keyFac.orders.confirmPaymentIntent(paymentIntentId).queryKey,
    queryFn: () => confirmPaymentIntent(paymentIntentId),
    enabled: !!paymentIntentId,
    retry: false,
  });
};

// export const useConfirmPaymentIntent = () => {
//   return useMutation({
//     mutationFn: (command: ConfirmPaymentIntentCommand) => confirmPaymentIntent(command),
//     onSuccess: () => {
//       showSuccessToast("Payment successful", "Your payment was successful");
//     },
//     onError: (error) =>
//       handleApiError(error, {
//         matchers: [
//           {
//             status: 404,
//             handler: () => showErrorToast("Not Found", "The cart or cart item was not found"),
//           },
//           {
//             status: 402,
//             errorCode: ErrorCode.PaymentFailed,
//             handler: () => showErrorToast("Payment failed", "The payment was not successful"),
//           },
//         ],
//       }),
//   });
// };
