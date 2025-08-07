import { ApiSuccessResponse } from "../../api-client/api.types";
import apiClient from "../../api-client/apiClient";
import { AddCartItemCommand, CartVm, UpdateCartItemCommand } from "./cart.types";

const BASE_URL = "/cart";

export const getCartSelf = async () => {
  const response = await apiClient.get<CartVm>(`${BASE_URL}/self`);
  return response.data;
};

export const addCartItem = async (command: AddCartItemCommand) => {
  const response = await apiClient.post<CartVm>(`${BASE_URL}/AddCartItem`, command);
  return response.data;
};

export const updateCartItem = async (command: UpdateCartItemCommand) => {
  const response = await apiClient.put<ApiSuccessResponse>(`${BASE_URL}/UpdateCartItem`, command);
  return response.data;
};

export const deleteCartItem = async (cartItemId: string) => {
  const response = await apiClient.delete<ApiSuccessResponse>(`${BASE_URL}/${cartItemId}`);
  return response.data;
};
