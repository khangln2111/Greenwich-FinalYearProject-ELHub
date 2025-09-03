import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { keyFac } from "../../features/common-service/queryKeyFactory";
import { authStorageHelper } from "../../utils/storageHelper";
import { showNotificationToast } from "../../utils/toastHelper";
import { useAppStore } from "../../zustand/stores/appStore";

interface NotificationContextValue {
  connection: HubConnection | null;
}

const NotificationContext = createContext<NotificationContextValue>({
  connection: null,
});

export const useNotificationHub = () => useContext(NotificationContext);

export function AppNotificationProvider({ children }: { children: ReactNode }) {
  const accessToken = authStorageHelper.getAccessToken();
  const currentUser = useAppStore((s) => s.currentUser);

  const [connection, setConnection] = useState<HubConnection | null>(null);
  const queryClient = useQueryClient();

  function createHubConnection() {
    const hubConnection = new HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_BACK_END_BASE_URL}/hubs/notifications`, {
        accessTokenFactory: () => accessToken ?? "",
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Error)
      .build();
    setConnection(hubConnection);
  }

  useEffect(() => {
    if (accessToken && currentUser) {
      createHubConnection();
    }
  }, [accessToken, currentUser]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("✅ Connected to Notification Hub");
        })
        .catch((err) => {
          console.error("❌ Connection failed:", err);
        })
        .finally(() => {});

      connection.on("ReceiveNotification", (notification) => {
        console.log("📩 New notification received: ", notification);
        queryClient.invalidateQueries({
          queryKey: keyFac.notifications._def,
        });
        showNotificationToast();
      });
    }

    return () => {
      connection?.stop();
    };
  }, [connection]);

  return (
    <NotificationContext.Provider value={{ connection }}>{children}</NotificationContext.Provider>
  );
}
