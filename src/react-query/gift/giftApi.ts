import apiClient from "../../http-client/apiClient";
import { ChangeGiftReceiverCommand, CreateGiftCommand } from "./gift.types";

const BASE_URL = "/gifts";

export const createGift = async (command: CreateGiftCommand) => {
  const response = await apiClient.post(`${BASE_URL}`, command);
  return response.data;
};

export const changeGiftReceiver = async (command: ChangeGiftReceiverCommand) => {
  const response = await apiClient.put(`${BASE_URL}/ChangeReceiver`, command);
  return response.data;
};

export const redeemGift = async (giftId: string) => {
  const response = await apiClient.post(`${BASE_URL}/${giftId}/Redeem`);
  return response.data;
};

export const revokeGift = async (giftId: string) => {
  const response = await apiClient.delete(`${BASE_URL}/${giftId}/Revoke`);
  return response.data;
};
