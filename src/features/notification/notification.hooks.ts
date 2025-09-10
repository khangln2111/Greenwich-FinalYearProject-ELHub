import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../utils/toastHelper";
import { useAuthStore } from "../../zustand/stores/authStore";
import { RoleName } from "../auth/identity.types";
import { keyFac } from "../common-service/queryKeyFactory";
import {
  getNotifications,
  getUnreadNotificationsCount,
  markAllNotificationsAsRead,
  toggleNotificationRead,
} from "./notification.api";
import { NotificationQueryCriteria } from "./notification.types";

export const useGetNotifications = (roleName: RoleName, query?: NotificationQueryCriteria) => {
  const accessToken = useAuthStore((s) => s.accessToken);

  return useQuery({
    enabled: !!accessToken,
    queryKey: keyFac.notifications.getNotifications(roleName, query).queryKey,
    queryFn: () => getNotifications(roleName, query),
  });
};

export const useGetUnreadNotificationsCount = (roleName: RoleName) => {
  const accessToken = useAuthStore((s) => s.accessToken);

  return useQuery({
    enabled: !!accessToken,
    queryKey: keyFac.notifications.getUnreadNotificationsCount(roleName).queryKey,
    queryFn: () => getUnreadNotificationsCount(roleName),
  });
};

export const useToggleNotificationRead = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => toggleNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.notifications._def });
      showSuccessToast("Done!", "The notification has been marked as read.");
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (roleName: RoleName) => markAllNotificationsAsRead(roleName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.notifications._def });
      showSuccessToast("Done!", "All notification have been marked as read.");
    },
  });
};
