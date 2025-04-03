// src/api/client.ts
import axios, { InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = import.meta.env.API_BASE_URL; // Thay đổi URL phù hợp

const apiClient = axios.create({
  baseURL: API_BASE_URL, // Thay đổi URL phù hợp
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor cho request: chèn token vào header nếu có
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
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

export default apiClient;
