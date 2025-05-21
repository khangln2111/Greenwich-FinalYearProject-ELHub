// src/api/client.ts
import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { showErrorToast } from "../utils/toastHelper";
import { ApiErrorResponse, ErrorCode } from "./api.types";
import { authStorageHelper, loginSessionStorageHelper } from "../utils/storageHelper";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "https://localhost:7014/api"; //Fallback url
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

// Interceptor cho response: xử lý refresh token khi gặp lỗi 401
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         // Gọi API refresh token
//         const { data } = await axios.post<{ accessToken: string }>(
//           "http://example.com/api/refresh",
//           { refreshToken },
//         );
//         localStorage.setItem("accessToken", data.accessToken);
//         // Gán lại header cho request gốc
//         if (originalRequest.headers) {
//           originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
//         }
//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         // Xử lý khi refresh token thất bại, ví dụ redirect về trang login
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   },
// );

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

    // ✅ Refresh token nếu gặp lỗi 401 và có tokens trong localStorage
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
          `${API_BASE_URL}/identity/RefreshToken`,
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
        authStorageHelper.clearTokens();
        window.location.href = "/login";
        loginSessionStorageHelper.setSessionExpiredToastFlag();
        localStorage.setItem("showSessionExpiredToast", "true");
        return Promise.reject(refreshError);
      }
    }

    // ✅ Chỉ show toast với các lỗi đặc biệt, còn lại trả ra để hook xử lý
    if (status === 401 && (errorCode === undefined || errorCode === ErrorCode.Unauthorized)) {
      showErrorToast("Unauthorized", "You must login to perform this action.");
      return;
    }

    if (status === 403 && (errorCode === undefined || errorCode === ErrorCode.Forbidden)) {
      showErrorToast("Forbidden", "You do not have permission to perform this action.");
      return;
    }

    // ❌ Không xử lý gì thêm — để react-query tự quản
    return Promise.reject(error);
  },
);

export default apiClient;
