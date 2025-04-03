import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import theme from "../styles/theme";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ms from "ms";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ms("15m"),
    },
  },
});

const App = () => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MantineProvider>
  );
};

export default App;
