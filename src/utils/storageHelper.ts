import { CurrentUser } from "../features/auth/identity.types";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const CURRENT_USER_KEY = "current-user";

export const authStorageHelper = {
  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  setAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  getCurrentUser(): CurrentUser | null {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser(user: CurrentUser): void {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  },

  removeAccessToken(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  removeRefreshToken(): void {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  clearTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  clearAll(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
  },
};

const SESSION_EXPIRED_TOAST_KEY = "showSessionExpiredToast";

export const loginSessionStorageHelper = {
  setSessionExpiredToastFlag: () => {
    localStorage.setItem(SESSION_EXPIRED_TOAST_KEY, "true");
  },

  clearSessionExpiredToastFlag: () => {
    localStorage.removeItem(SESSION_EXPIRED_TOAST_KEY);
  },

  shouldShowSessionExpiredToast: (): boolean => {
    return localStorage.getItem(SESSION_EXPIRED_TOAST_KEY) === "true";
  },
};
