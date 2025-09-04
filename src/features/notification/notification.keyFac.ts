import { createQueryKeys } from "@lukemorales/query-key-factory";
import { NotificationQueryCriteria } from "./notification.types";
import { RoleName } from "../auth/identity.types";

export const notificationKeyFac = createQueryKeys("notifications", {
  getNotifications: (roleName: RoleName, query?: NotificationQueryCriteria) => ({
    queryKey: [roleName, query],
  }),
  getUnreadNotificationsCount: (roleName: RoleName) => ({
    queryKey: [roleName],
  }),
});
