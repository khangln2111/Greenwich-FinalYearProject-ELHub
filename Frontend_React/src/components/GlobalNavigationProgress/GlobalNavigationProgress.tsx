import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { useEffect } from "react";
import { useNavigation } from "react-router";

const GlobalNavigationProgress = () => {
  const { state } = useNavigation();

  useEffect(() => {
    if (state === "loading") {
      nprogress.start();
    } else {
      nprogress.complete();
    }
  }, [state]);

  return <NavigationProgress size={5} color="primary" />;
};
export default GlobalNavigationProgress;
