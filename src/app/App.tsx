import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications as Toasts } from "@mantine/notifications";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import ms from "ms";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { RouterProvider } from "react-router";
import "../styles/globals.css";
import theme from "../styles/theme";
import { AppNotificationProvider } from "./providers/AppNotificationProvider";
import { LocalStorageSyncProvider } from "./providers/LocalStorageSyncProvider";
import router from "./routes";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ms("5m"),
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Toasts />
        <GoogleOAuthProvider clientId="1008746493649-naguo15v10pmde540vr9ac4a6tbinm0t.apps.googleusercontent.com">
          <ModalsProvider>
            <AppNotificationProvider>
              <NuqsAdapter>
                <LocalStorageSyncProvider>
                  <RouterProvider router={router} />
                </LocalStorageSyncProvider>
              </NuqsAdapter>
            </AppNotificationProvider>
          </ModalsProvider>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};

export default App;
