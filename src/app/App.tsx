import { MantineProvider } from "@mantine/core";
import { RouterProvider, ScrollRestoration } from "react-router-dom";
import router from "./routes";
import theme from "../styles/theme";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ms from "ms";
import { Notifications } from "@mantine/notifications";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ms("5m"),
    },
  },
});

const App = () => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="1008746493649-naguo15v10pmde540vr9ac4a6tbinm0t.apps.googleusercontent.com">
          <Notifications />
          <ReactQueryDevtools />
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};

export default App;
