import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { keyFac } from "../../features/common-service/queryKeyFactory";
import { authStorageHelper } from "../../utils/storageHelper";
import { useAppStore } from "../../zustand/stores/appStore";
import { showNotificationToast } from "../../utils/toastHelper";

interface NotificationContextValue {
  connection: HubConnection | null;
  isConnected: boolean;
}

const NotificationContext = createContext<NotificationContextValue>({
  connection: null,
  isConnected: false,
});

export const useNotificationHub = () => useContext(NotificationContext);

export function AppNotificationProvider({ children }: { children: ReactNode }) {
  const accessToken = authStorageHelper.getAccessToken();
  const currentUser = useAppStore((s) => s.currentUser);

  const [isConnected, setIsConnected] = useState(false);
  const [connection, setConnection] = useState<HubConnection | null>(null);

  const connectionRef = useRef<HubConnection | null>(null);
  const startingRef = useRef(false); // ✅ chặn start/stop chồng chéo
  const queryClient = useQueryClient();

  useEffect(() => {
    // Nếu chưa login thì disconnect
    if (!currentUser || !accessToken) {
      if (connectionRef.current && !startingRef.current) {
        connectionRef.current.stop();
        connectionRef.current = null;
        setConnection(null);
        setIsConnected(false);
        console.log("🔌 Disconnected from Notification Hub (guest mode)");
      }
      return;
    }

    // Nếu đã có connection thì không tạo lại
    if (connectionRef.current) return;

    // ✅ Tạo connection mới
    const hubConnection = new HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_BACK_END_BASE_URL}/hubs/notifications`, {
        accessTokenFactory: () => accessToken,
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Error)
      .build();

    connectionRef.current = hubConnection;
    setConnection(hubConnection);

    startingRef.current = true;

    hubConnection
      .start()
      .then(() => {
        setIsConnected(true);
        console.log("✅ Connected to Notification Hub");
      })
      .catch((err) => {
        console.error("❌ Connection failed:", err);
        connectionRef.current = null;
      })
      .finally(() => {
        startingRef.current = false;
      });

    // Event từ server
    hubConnection.on("ReceiveNotification", (notification) => {
      console.log("📩 New notification received: ", notification);
      queryClient.invalidateQueries({
        queryKey: keyFac.notifications._def,
      });
      showNotificationToast();
    });

    // Cleanup khi unmount app
    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
        connectionRef.current = null;
        setConnection(null);
        setIsConnected(false);
        console.log("🔌 Connection cleaned up");
      }
    };
  }, [currentUser, accessToken, queryClient]);

  return (
    <NotificationContext.Provider value={{ connection, isConnected }}>
      {children}
    </NotificationContext.Provider>
  );
}
