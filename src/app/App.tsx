import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications as Toasts } from "@mantine/notifications";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import ms from "ms";
import { NuqsAdapter } from "nuqs/adapters/react-router/v6";
import { RouterProvider } from "react-router-dom";
import "../styles/globals.css";
import theme from "../styles/theme";
import IdentityProvider from "./providers/IdentityProvider";
import router from "./routes";
import { AppNotificationProvider } from "./providers/AppNotificationProvider";

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
        {/* <ReactQueryDevtools buttonPosition="bottom-left" /> */}
        <Toasts />
        <IdentityProvider>
          <GoogleOAuthProvider clientId="1008746493649-naguo15v10pmde540vr9ac4a6tbinm0t.apps.googleusercontent.com">
            <AppNotificationProvider>
              <ModalsProvider>
                <NuqsAdapter>
                  <RouterProvider router={router} />
                </NuqsAdapter>
              </ModalsProvider>
            </AppNotificationProvider>
          </GoogleOAuthProvider>
        </IdentityProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};

export default App;
