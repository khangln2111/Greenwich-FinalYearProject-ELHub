import { Outlet, ScrollRestoration } from "react-router";
import GlobalNavigationProgress from "../../components/GlobalNavigationProgress/GlobalNavigationProgress";
import AOSInit from "../../components/AOSInit/AOSInit";

export default function RootLayout() {
  return (
    <>
      <GlobalNavigationProgress />
      <AOSInit />
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
