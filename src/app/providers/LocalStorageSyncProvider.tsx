import { useQueryClient } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { authStorageHelper } from "../../utils/storageHelper";
import { useAuthStore } from "../../zustand/stores/authStore";
import router from "../routes";

export const LocalStorageSyncProvider = ({ children }: { children: ReactNode }) => {
  const setCurrentUser = useAuthStore((s) => s.setCurrentUser);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setRefreshToken = useAuthStore((s) => s.setRefreshToken);
  const logout = useAuthStore((s) => s.logout);
  const queryClient = useQueryClient();
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (!event.key) return;
      switch (event.key) {
        case authStorageHelper.getAccessTokenKey():
          if (event.newValue) {
            setAccessToken(event.newValue);
            queryClient.invalidateQueries();
          } else {
            logout();
            queryClient.clear();
            router.navigate("/", { replace: true });
          }
          break;
        case authStorageHelper.getRefreshTokenKey():
          if (event.newValue) {
            setRefreshToken(event.newValue);
            queryClient.invalidateQueries();
          } else {
            logout();
            queryClient.clear();
            router.navigate("/", { replace: true });
          }
          break;
        case authStorageHelper.getCurrentUserKey():
          if (event.newValue) {
            setCurrentUser(JSON.parse(event.newValue));
            queryClient.clear();
          } else {
            logout();
            queryClient.clear();
            router.navigate("/", { replace: true });
          }
          break;
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);
  return <>{children}</>;
};
