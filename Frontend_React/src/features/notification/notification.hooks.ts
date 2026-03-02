import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../utils/toastHelper";
import { useAuthStore } from "../../zustand/stores/authStore";
import { RoleName } from "../auth/identity.types";
import { keyFac } from "../common-service/queryKeyFactory";
import { markAllNotificationsAsRead, toggleNotificationRead } from "./notification.api";
import { NotificationQueryCriteria } from "./notification.types";

export const useGetNotifications = (roleName: RoleName, query?: NotificationQueryCriteria) => {
  const accessToken = useAuthStore((s) => s.accessToken);

  return useQuery({
    enabled: !!accessToken,
    queryKey: keyFac.notifications.getNotifications(roleName, query).queryKey,
    queryFn: keyFac.notifications.getNotifications(roleName, query).queryFn,
  });
};

export const useGetUnreadNotificationsCount = (roleName: RoleName) => {
  const accessToken = useAuthStore((s) => s.accessToken);

  return useQuery({
    enabled: !!accessToken,
    queryKey: keyFac.notifications.getUnreadNotificationsCount(roleName).queryKey,
    queryFn: keyFac.notifications.getUnreadNotificationsCount(roleName).queryFn,
  });
};

export const useToggleNotificationRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => toggleNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.notifications._def });
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
