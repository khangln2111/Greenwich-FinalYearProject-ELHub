import { ApiSuccessResponse } from "../../http-client/api.types";
import apiClient from "../../http-client/apiClient";
import {
  AuthResponse,
  ConfirmEmailRequest,
  CurrentUser,
  LoginRequest,
  LoginWithGoogleRequest,
  RefreshTokenRequest,
  RegisterRequest,
  ResendConfirmationEmailRequest,
  ResetPasswordRequest,
  SendResetPasswordOtpRequest,
  UpdateUserProfileCommand,
  ValidateResetPasswordOtpRequest,
} from "./identity.types";

const BASE_URL = "/identity";

export const register = async (data: RegisterRequest) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}/Register`, data);
  return response.data;
};

export const login = async (data: LoginRequest) => {
  const response = await apiClient.post<AuthResponse>(`${BASE_URL}/Login`, data);
  return response.data;
};

export const loginWithGoogle = async (data: LoginWithGoogleRequest) => {
  const response = await apiClient.post<AuthResponse>(`${BASE_URL}/LoginWithGoogle`, data);
  return response.data;
};

export const confirmEmail = async (data: ConfirmEmailRequest) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}/ConfirmEmail`, data);
  return response.data;
};

export const resendConfirmationEmail = async (data: ResendConfirmationEmailRequest) => {
  const response = await apiClient.post<ApiSuccessResponse>(
    `${BASE_URL}/ResendConfirmationEmail`,
    data,
  );
  return response.data;
};

export const sendResetPasswordOtp = async (data: SendResetPasswordOtpRequest) => {
  const response = await apiClient.post<ApiSuccessResponse>(
    `${BASE_URL}/SendResetPasswordOtp`,
    data,
  );
  return response.data;
};

export const validateResetPasswordOtp = async (data: ValidateResetPasswordOtpRequest) => {
  const response = await apiClient.post<ApiSuccessResponse>(
    `${BASE_URL}/ValidateResetPasswordOtp`,
    data,
  );
  return response.data;
};

export const resetPassword = async (data: ResetPasswordRequest) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}/ResetPassword`, data);
  return response.data;
};

export const refreshToken = async (data: RefreshTokenRequest) => {
  const response = await apiClient.post<AuthResponse>(`${BASE_URL}/RefreshToken`, data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await apiClient.get<CurrentUser>(`${BASE_URL}/me`);
  return response.data;
};

export const updateUserProfile = async (command: UpdateUserProfileCommand) => {
  const response = await apiClient.put<ApiSuccessResponse>(
    `${BASE_URL}/UpdateUserProfile`,
    command,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};
