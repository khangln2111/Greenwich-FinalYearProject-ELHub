import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  getUnreadNotificationsCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "./notification.api";
import { NotificationQueryCriteria } from "./notification.types";
import { keyFac } from "../common-service/queryKeyFactory";
import { showSuccessToast } from "../../utils/toastHelper";

export const useGetNotifications = (query?: NotificationQueryCriteria) => {
  return useQuery({
    queryKey: keyFac.notifications.getNotifications(query).queryKey,
    queryFn: () => getNotifications(query),
  });
};

export const useGetUnreadNotificationsCount = () => {
  return useQuery({
    queryKey: keyFac.notifications.getUnreadNotificationsCount.queryKey,
    queryFn: () => getUnreadNotificationsCount(),
  });
};

export const useMarkNotificationAsRead = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.notifications._def });
      showSuccessToast("Done!", "The notification has been marked as read.");
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => markAllNotificationsAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.notifications._def });
      showSuccessToast("Done!", "All notification have been marked as read.");
    },
  });
};
