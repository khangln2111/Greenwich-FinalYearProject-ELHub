import { createQueryKeys } from "@lukemorales/query-key-factory";
import { NotificationQueryCriteria } from "./notification.types";
import { RoleName } from "../auth/identity.types";
import { getNotifications, getUnreadNotificationsCount } from "./notification.api";

export const notificationKeyFac = createQueryKeys("notifications", {
  getNotifications: (roleName: RoleName, query?: NotificationQueryCriteria) => ({
    queryKey: [roleName, query],
    queryFn: () => getNotifications(roleName, query),
  }),
  getUnreadNotificationsCount: (roleName: RoleName) => ({
    queryKey: [roleName],
    queryFn: () => getUnreadNotificationsCount(roleName),
  }),
});
