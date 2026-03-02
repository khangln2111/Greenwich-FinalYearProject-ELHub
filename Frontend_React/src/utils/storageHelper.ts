import { CurrentUser } from "../features/auth/identity.types";

const ACCESS_TOKEN_KEY = "access-token";
const REFRESH_TOKEN_KEY = "refresh-token";
const CURRENT_USER_KEY = "current-user";
const LOGIN_AT_KEY = "login-at";
const LOGOUT_AT_KEY = "logout-at";

export const authStorage = {
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

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },
  setLoginAt(): void {
    localStorage.setItem(LOGIN_AT_KEY, new Date().toISOString());
  },
  setLogoutAt(): void {
    localStorage.setItem(LOGOUT_AT_KEY, new Date().toISOString());
  },
  getAccessTokenKey(): string {
    return ACCESS_TOKEN_KEY;
  },
  getRefreshTokenKey(): string {
    return REFRESH_TOKEN_KEY;
  },
  getCurrentUserKey(): string {
    return CURRENT_USER_KEY;
  },
  getLoginAtKey(): string {
    return LOGIN_AT_KEY;
  },
  getLogoutAtKey(): string {
    return LOGOUT_AT_KEY;
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
