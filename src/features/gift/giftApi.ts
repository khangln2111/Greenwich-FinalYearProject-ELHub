import { ApiSuccessResponse, ListData } from "../../api-client/api.types";
import apiClient from "../../api-client/apiClient";
import {
  ChangeGiftReceiverCommand,
  CreateGiftCommand,
  ReceivedGiftVm,
  SentGiftVm,
} from "./gift.types";

const BASE_URL = "/gifts";

export const createGift = async (command: CreateGiftCommand) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}`, command);
  return response.data;
};

export const changeGiftReceiver = async (command: ChangeGiftReceiverCommand) => {
  const response = await apiClient.put<ApiSuccessResponse>(`${BASE_URL}/ChangeReceiver`, command);
  return response.data;
};

export const redeemGift = async (giftId: string) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}/${giftId}/Redeem`);
  return response.data;
};

export const revokeGift = async (giftId: string) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}/${giftId}/Revoke`);
  return response.data;
};

export const getSentGifts = async () => {
  const response = await apiClient.get<ListData<SentGiftVm>>(`${BASE_URL}/Sent`);
  return response.data;
};

export const getReceivedGifts = async () => {
  const response = await apiClient.get<ListData<ReceivedGiftVm>>(`${BASE_URL}/Received`);
  return response.data;
};
