import { useQueryClient } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { authStorage } from "../../utils/storageHelper";
import router from "../routes";

export const LocalStorageSyncProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (!event.key) return;
      switch (event.key) {
        // When another tab logs in, update tokens in this tab as well
        case authStorage.getLoginAtKey():
          queryClient.invalidateQueries();
          router.navigate(window.location.pathname + window.location.search, { replace: true });
          break;
        // When another tab logs out, log out in this tab as well
        case authStorage.getLogoutAtKey():
          authStorage.clearAll();
          queryClient.clear();
          // router.navigate(window.location.pathname + window.location.search, { replace: true });
          router.navigate("/", { replace: true });
          break;
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);
  return <>{children}</>;
};
