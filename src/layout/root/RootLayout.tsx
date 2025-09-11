import { Outlet, useNavigation } from "react-router";
import CenterLoaderWithLogo from "../../components/CenterLoader/CenterLoaderWithLogo";

export default function RootLayout() {
  const { state } = useNavigation();

  return state === "loading" ? <CenterLoaderWithLogo /> : <Outlet />;
}
