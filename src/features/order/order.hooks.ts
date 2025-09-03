import { useMutation, useQuery } from "@tanstack/react-query";
import { showErrorToast } from "../../utils/toastHelper";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import { CreateOrderCommand, OrderQueryCriteria } from "./order.types";
import { processOrder, createOrder, getOrderDetailSelf, getOrdersSelf } from "./order.api";
import { useAppStore } from "../../zustand/stores/appStore";

export const useGetOrdersSelf = (query?: OrderQueryCriteria) => {
  const currentUser = useAppStore((s) => s.currentUser);
  return useQuery({
    enabled: !!currentUser,
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

export const useProcessOrder = (id: string) => {
  return useQuery({
    queryKey: keyFac.orders.processOrder(id).queryKey,
    queryFn: () => processOrder(id),
    enabled: !!id,
    retry: false,
  });
};
