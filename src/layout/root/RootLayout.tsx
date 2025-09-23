import { Outlet, ScrollRestoration } from "react-router";
import GlobalNavigationProgress from "../../components/GlobalNavigationProgress/GlobalNavigationProgress";
import AOSInit from "../../components/AOSInit/AOSInit";

export default function RootLayout() {
  return (
    <div className="text-gray-900 dark:text-gray-100">
      <GlobalNavigationProgress />
      <AOSInit />
      <Outlet />
      <ScrollRestoration />
    </div>
  );
}
