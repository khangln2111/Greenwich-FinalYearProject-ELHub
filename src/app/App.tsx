import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ms from "ms";
import { RouterProvider } from "react-router-dom";
import "../styles/globals.css";
import theme from "../styles/theme";
import IdentityProvider from "./providers/IdentityProvider";
import router from "./routes";
import utc from "dayjs/plugin/utc";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

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
        <Notifications />
        <IdentityProvider>
          <GoogleOAuthProvider clientId="1008746493649-naguo15v10pmde540vr9ac4a6tbinm0t.apps.googleusercontent.com">
            <ModalsProvider>
              <RouterProvider router={router} />
            </ModalsProvider>
          </GoogleOAuthProvider>
        </IdentityProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};

export default App;
