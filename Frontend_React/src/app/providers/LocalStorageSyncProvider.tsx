import { useQueryClient } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { useAuthStore } from "../../zustand/stores/authStore";
import router from "../routes";
import { authStorage } from "../../utils/storageHelper";

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
        case authStorage.getLoginAtKey():
          const accessToken = authStorage.getAccessToken();
          if (accessToken) setAccessToken(accessToken);
          const refreshToken = authStorage.getRefreshToken();
          if (refreshToken) setRefreshToken(refreshToken);
          router.navigate(window.location.pathname + window.location.search, { replace: true });
          break;
        // When another tab logs out, log out in this tab as well
        case authStorage.getLogoutAtKey():
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
