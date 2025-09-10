import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { showErrorToast } from "../utils/toastHelper";
import { ApiErrorResponse, ErrorCode } from "./api.types";
import { authStorageHelper, loginSessionStorageHelper } from "../utils/storageHelper";

const API_BASE_URL = import.meta.env.VITE_BACK_END_BASE_URL
  ? `${import.meta.env.VITE_BACK_END_BASE_URL}/api`
  : "https://localhost:7014/api"; //Fallback url
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor cho request: chèn token vào header nếu có
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = authStorageHelper.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    if (!error.response) {
      showErrorToast("Network Error", "No response from the server. Please try again later.");
      return Promise.reject(error);
    }
    const { status, data } = error.response;
    const errorCode = data?.errorCode;
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // ✅ Call Refresh token endpoint if 401 and has tokens in localStorage
    if (
      status === 401 &&
      !originalRequest._retry &&
      authStorageHelper.getAccessToken() &&
      authStorageHelper.getRefreshToken()
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = authStorageHelper.getRefreshToken();
        const { data } = await axios.post<{ accessToken: string }>(
          `${API_BASE_URL}/identity/refresh-token`,
          {
            refreshToken,
          },
        );

        authStorageHelper.setAccessToken(data.accessToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        authStorageHelper.clearAll();
        window.location.href = "/login";
        loginSessionStorageHelper.setSessionExpiredToastFlag();
        return Promise.reject(refreshError);
      }
    }

    // ✅ Only show toast for specific errors, others are passed to hooks
    if (status === 401 && (errorCode === undefined || errorCode === ErrorCode.Unauthorized)) {
      showErrorToast("Unauthorized", "You must login to perform this action.");
      return;
    }

    if (status === 403 && (errorCode === undefined || errorCode === ErrorCode.Forbidden)) {
      showErrorToast("Forbidden", "You do not have permission to perform this action.");
      return;
    }

    // ❌ No further handling — let react-query manage it
    return Promise.reject(error);
  },
);

export default apiClient;
