import { Outlet, ScrollRestoration } from "react-router";
import GlobalNavigationProgress from "../../components/GlobalNavigationProgress/GlobalNavigationProgress";

export default function RootLayout() {
  return (
    <>
      <GlobalNavigationProgress />
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
