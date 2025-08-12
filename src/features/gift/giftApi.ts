import { GridifyQueryBuilder } from "gridify-client";
import { ApiSuccessResponse, ListData } from "../../api-client/api.types";
import apiClient from "../../api-client/apiClient";
import { applyConditions } from "../../utils/gridifyHelper";
import {
  ChangeGiftReceiverCommand,
  CreateGiftCommand,
  GiftQueryCriteria,
  ReceivedGiftVm,
  SentGiftVm,
} from "./gift.types";

const BASE_URL = "/gifts";

export const buildGiftQuery = (query: GiftQueryCriteria = {}) => {
  const qb = new GridifyQueryBuilder();

  qb.setPage(query.page ?? 1);
  qb.setPageSize(query.pageSize ?? 10);

  const conditions: Array<() => void> = [];

  applyConditions(qb, conditions);

  if (query.orderBy) {
    qb.addOrderBy(query.orderBy.field, query.orderBy.direction === "desc");
  } else {
    qb.addOrderBy("createdAt", true); // true = desc
  }
  return qb.build();
};

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

export const getSentGifts = async (query?: GiftQueryCriteria) => {
  const response = await apiClient.get<ListData<SentGiftVm>>(`${BASE_URL}/Sent`, {
    params: buildGiftQuery(query),
  });
  return response.data;
};

export const getReceivedGifts = async (query?: GiftQueryCriteria) => {
  const response = await apiClient.get<ListData<ReceivedGiftVm>>(`${BASE_URL}/Received`, {
    params: buildGiftQuery(query),
  });
  return response.data;
};
