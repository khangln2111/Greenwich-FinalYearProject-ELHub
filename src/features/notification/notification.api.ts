import { GridifyQueryBuilder, ConditionalOperator as op } from "gridify-client";
import { NotificationQueryCriteria, NotificationType, NotificationVm } from "./notification.types";
import apiClient from "../../api-client/apiClient";
import { ApiSuccessResponse, ListData } from "../../api-client/api.types";
import { applyConditions } from "../../utils/gridifyHelper";

const BASE_URL = "/notifications";

export const buildNotificationQuery = (query: NotificationQueryCriteria = {}) => {
  const qb = new GridifyQueryBuilder();

  qb.setPage(query.page ?? 1);
  qb.setPageSize(query.pageSize ?? 10);

  const conditions: Array<() => void> = [];

  if (query.isRead != null)
    conditions.push(() => qb.addCondition("isRead", op.Equal, query.isRead!));

  if (query.types?.length && query.types.length < Object.values(NotificationType).length) {
    conditions.push(() => {
      qb.startGroup().addCondition("type", op.Equal, query.types![0]);
      for (let i = 1; i < query.types!.length; i++) {
        qb.or().addCondition("type", op.Equal, query.types![i]);
      }
      qb.endGroup();
    });
  }

  applyConditions(qb, conditions);

  qb.addOrderBy("createdAt", true); // true = desc

  return qb.build();
};

export const getNotifications = async (query?: NotificationQueryCriteria) => {
  const response = await apiClient.get<ListData<NotificationVm>>(`${BASE_URL}/self`, {
    params: buildNotificationQuery(query),
  });
  return response.data;
};

export const markAllNotificationsAsRead = async () => {
  const response = await apiClient.put<ApiSuccessResponse>(`${BASE_URL}/mark-all-as-read`);
  return response.data;
};

export const markNotificationAsRead = async (id: string) => {
  const response = await apiClient.put<ApiSuccessResponse>(`${BASE_URL}/${id}/mark-as-read`);
  return response.data;
};

export const getUnreadNotificationsCount = async () => {
  const response = await apiClient.get<number>(`${BASE_URL}/unread-count`);
  return response.data;
};
