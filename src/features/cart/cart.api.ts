import { GridifyQueryBuilder } from "gridify-client";
import { ApiSuccessResponse, ListData } from "../../api-client/api.types";
import apiClient from "../../api-client/apiClient";
import {
  AddCartItemCommand,
  CartItemQueryCriteria,
  CartItemVm,
  CartVm,
  UpdateCartItemCommand,
} from "./cart.types";

const BASE_URL = "/cart";

export const buildCartItemQuery = (query: CartItemQueryCriteria = {}) => {
  const qb = new GridifyQueryBuilder();
  qb.setPage(query.page ?? 1);
  qb.setPageSize(query.pageSize ?? 20);
  return qb.build();
};

export const getCartSelf = async () => {
  const response = await apiClient.get<CartVm>(`${BASE_URL}/self`);
  return response.data;
};

export const getCartItemsSelf = async (query?: CartItemQueryCriteria) => {
  const response = await apiClient.get<ListData<CartItemVm>>(`${BASE_URL}/self/cart-items`, {
    params: buildCartItemQuery(query),
  });
  return response.data;
};

export const getCartItemCountSelf = async () => {
  const response = await apiClient.get<number>(`${BASE_URL}/self/cart-item-count`);
  return response.data;
};

export const addCartItem = async (command: AddCartItemCommand) => {
  const response = await apiClient.post<CartVm>(`${BASE_URL}/add-cart-item`, command);
  return response.data;
};

export const updateCartItem = async (command: UpdateCartItemCommand) => {
  const response = await apiClient.put<ApiSuccessResponse>(`${BASE_URL}/update-cart-item`, command);
  return response.data;
};

export const deleteCartItem = async (cartItemId: string) => {
  const response = await apiClient.delete<ApiSuccessResponse>(`${BASE_URL}/${cartItemId}`);
  return response.data;
};
