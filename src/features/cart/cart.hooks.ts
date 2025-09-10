import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import { addCartItem, deleteCartItem, getCartSelf, updateCartItem } from "./cart.api";
import { AddCartItemCommand, UpdateCartItemCommand } from "./cart.types";
import { useAuthStore } from "../../zustand/stores/authStore";

export const useGetCart = () => {
  const accessToken = useAuthStore((s) => s.accessToken);
  return useQuery({
    queryKey: keyFac.cart._def,
    queryFn: getCartSelf,
    enabled: !!accessToken,
  });
};

export const useAddCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: AddCartItemCommand) => addCartItem(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.cart._def });
      showSuccessToast("Item Added", "The item was added to the cart successfully.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Not Found", "The course not found"),
          },
        ],
      }),
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: UpdateCartItemCommand) => updateCartItem(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.cart._def });
      showSuccessToast("Item Updated", "The item was updated successfully.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Not Found", "The cart item not found"),
          },
        ],
      }),
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cartItemId: string) => deleteCartItem(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.cart._def });
      showSuccessToast("Item Deleted", "The item was deleted from the cart successfully.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Not Found", "The cart item not found"),
          },
        ],
      }),
  });
};
