const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const authStorageHelper = {
  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  setAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
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
