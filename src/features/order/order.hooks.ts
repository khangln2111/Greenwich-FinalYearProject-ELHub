import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showErrorToast } from "../../utils/toastHelper";
import { useAuthStore } from "../../zustand/stores/authStore";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import { createOrder, processOrder } from "./order.api";
import { CreateOrderCommand, OrderQueryCriteria } from "./order.types";

export const useGetOrdersSelf = (query?: OrderQueryCriteria) => {
  const accessToken = useAuthStore((s) => s.accessToken);

  return useQuery({
    enabled: !!accessToken,
    queryKey: keyFac.orders.getOrdersSelf(query).queryKey,
    queryFn: keyFac.orders.getOrdersSelf(query).queryFn,
  });
};

export const useGetOrderDetailSelf = (id: string) => {
  return useQuery({
    queryKey: keyFac.orders.getOrderDetailSelf(id).queryKey,
    queryFn: keyFac.orders.getOrderDetailSelf(id).queryFn,
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

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (command: CreateOrderCommand) => createOrder(command),
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

export const useProcessOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => processOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.cart._def });
      queryClient.invalidateQueries({ queryKey: keyFac.orders._def });
      queryClient.invalidateQueries({ queryKey: keyFac.inventories._def });
    },
  });
};
