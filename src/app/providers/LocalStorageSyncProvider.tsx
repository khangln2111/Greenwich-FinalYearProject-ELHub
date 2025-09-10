import { useQueryClient } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { authStorageHelper } from "../../utils/storageHelper";
import { useAuthStore } from "../../zustand/stores/authStore";
import router from "../routes";

export const LocalStorageSyncProvider = ({ children }: { children: ReactNode }) => {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setRefreshToken = useAuthStore((s) => s.setRefreshToken);
  const logout = useAuthStore((s) => s.logout);
  const queryClient = useQueryClient();
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (!event.key) return;
      switch (event.key) {
        // When another tab logs in, update tokens in this tab as well
        case authStorageHelper.getLoginAtKey():
          const accessToken = authStorageHelper.getAccessToken();
          if (accessToken) setAccessToken(accessToken);
          const refreshToken = authStorageHelper.getRefreshToken();
          if (refreshToken) setRefreshToken(refreshToken);
          break;
        // When another tab logs out, log out in this tab as well
        case authStorageHelper.getLogoutAtKey():
          logout();
          queryClient.clear();
          router.navigate("/", { replace: true });
          break;
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);
  return <>{children}</>;
};
