import { CurrentUser } from "../../features/auth/identity.types";
import { authStorage } from "../../utils/storageHelper";
import { create } from "zustand";

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  currentUser: CurrentUser | null;
  logout: () => void;
  setCurrentUser: (user: CurrentUser) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setLoginAt: () => void;
  setLogoutAt: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: authStorage.getAccessToken(),
  refreshToken: authStorage.getRefreshToken(),
  currentUser: authStorage.getCurrentUser(),
  logout: () => {
    authStorage.clearAll();
    set({ accessToken: null, refreshToken: null, currentUser: null });
  },
  setCurrentUser: (user) => {
    authStorage.setCurrentUser(user);
    set({ currentUser: user });
  },
  setAccessToken: (token) => {
    authStorage.setAccessToken(token);
    set({ accessToken: token });
  },
  setRefreshToken: (token) => {
    authStorage.setRefreshToken(token);
    set({ refreshToken: token });
  },
  setLoginAt: () => {
    authStorage.setLoginAt();
  },
  setLogoutAt: () => {
    authStorage.setLogoutAt();
  },
}));
