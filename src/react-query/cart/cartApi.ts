import { ApiSuccessResponse } from "../../http-client/api.types";
import apiClient from "../../http-client/apiClient";
import { AddCartItemCommand, Cart, UpdateCartItemCommand } from "./cart.types";

const BASE_URL = "/cart";

export const getCart = async () => {
  const response = await apiClient.get<Cart>(`${BASE_URL}/me`);
  return response.data;
};

export const addCartItem = async (command: AddCartItemCommand) => {
  const response = await apiClient.post<Cart>(`${BASE_URL}/AddCartItem`, command);
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
