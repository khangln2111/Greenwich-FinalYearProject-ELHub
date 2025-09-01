import { createQueryKeys } from "@lukemorales/query-key-factory";
import { NotificationQueryCriteria } from "./notification.types";

export const notificationKeyFac = createQueryKeys("notifications", {
  getNotifications: (query?: NotificationQueryCriteria) => ({
    queryKey: [query],
  }),
  getUnreadNotificationsCount: {
    queryKey: null,
  },
});
