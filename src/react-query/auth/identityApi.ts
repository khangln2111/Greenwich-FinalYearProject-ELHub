import apiClient from "../../http-client/axios";
import {
  AuthResponse,
  ConfirmEmailRequest,
  LoginWithGoogleRequest,
  LoginRequest,
  RefreshTokenRequest,
  RegisterRequest,
  ResendConfirmationEmailRequest,
  ResetPasswordRequest,
  SendResetPasswordOtpRequest,
  ValidateResetPasswordOtpRequest,
  CurrentUser,
} from "./identity.types";
import { ApiSuccessResponse } from "../../http-client/api.types";

const baseUrl = "/identity";

export const register = async (data: RegisterRequest) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${baseUrl}/Register`, data);
  return response.data;
};

export const login = async (data: LoginRequest) => {
  const response = await apiClient.post<AuthResponse>(`${baseUrl}/LoginCustom`, data);
  return response.data;
};

export const loginWithGoogle = async (data: LoginWithGoogleRequest) => {
  const response = await apiClient.post<AuthResponse>(`${baseUrl}/LoginWithGoogle`, data);
  return response.data;
};

export const confirmEmail = async (data: ConfirmEmailRequest) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${baseUrl}/ConfirmEmail`, data);
  return response.data;
};

export const resendConfirmationEmail = async (data: ResendConfirmationEmailRequest) => {
  const response = await apiClient.post<ApiSuccessResponse>(
    `${baseUrl}/ResendConfirmationEmail`,
    data,
  );
  return response.data;
};

export const sendResetPasswordOtp = async (data: SendResetPasswordOtpRequest) => {
  const response = await apiClient.post<ApiSuccessResponse>(
    `${baseUrl}/SendResetPasswordOtp`,
    data,
  );
  return response.data;
};

export const validateResetPasswordOtp = async (data: ValidateResetPasswordOtpRequest) => {
  const response = await apiClient.post<ApiSuccessResponse>(
    `${baseUrl}/ValidateResetPasswordOtp`,
    data,
  );
  return response.data;
};

export const resetPassword = async (data: ResetPasswordRequest) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${baseUrl}/ResetPassword`, data);
  return response.data;
};

export const refreshToken = async (data: RefreshTokenRequest) => {
  const response = await apiClient.post<AuthResponse>(`${baseUrl}/RefreshToken`, data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await apiClient.get<CurrentUser>(`${baseUrl}/me`);
  return response.data;
};
