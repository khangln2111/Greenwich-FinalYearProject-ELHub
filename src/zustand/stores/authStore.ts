import { CurrentUser } from "../../features/auth/identity.types";
import { authStorageHelper } from "../../utils/storageHelper";
import { create } from "zustand";

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  currentUser: CurrentUser | null;
  logout: () => void;
  setCurrentUser: (user: CurrentUser) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: authStorageHelper.getAccessToken(),
  refreshToken: authStorageHelper.getRefreshToken(),
  currentUser: authStorageHelper.getCurrentUser(),
  logout: () => {
    authStorageHelper.clearAll();
    set({ accessToken: null, refreshToken: null, currentUser: null });
  },
  setCurrentUser: (user) => {
    authStorageHelper.setCurrentUser(user);
    set({ currentUser: user });
  },
  setAccessToken: (token) => {
    authStorageHelper.setAccessToken(token);
    set({ accessToken: token });
  },
  setRefreshToken: (token) => {
    authStorageHelper.setRefreshToken(token);
    set({ refreshToken: token });
  },
}));
