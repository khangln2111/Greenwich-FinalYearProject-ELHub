import { ApiSuccessResponse } from "../../api-client/api.types";
import apiClient from "../../api-client/apiClient";
import {
  RegisterCommand,
  LoginCommand,
  AuthResponse,
  LoginWithGoogleCommand,
  SendEmailConfirmationOtpCommand,
  ConfirmEmailCommand,
  SendResetPasswordOtpCommand,
  ValidateResetPasswordOtpCommand,
  ResetPasswordCommand,
  RefreshTokenCommand,
  CurrentUser,
  UpdateUserProfileSelfCommand,
  UpdateWorkProfileSelfCommand,
  WorkProfileVm,
} from "./identity.types";

const BASE_URL = "/identity";

export const register = async (data: RegisterCommand) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}/register`, data);
  return response.data;
};

export const login = async (data: LoginCommand) => {
  const response = await apiClient.post<AuthResponse>(`${BASE_URL}/login`, data);
  return response.data;
};

export const loginWithGoogle = async (data: LoginWithGoogleCommand) => {
  const response = await apiClient.post<AuthResponse>(`${BASE_URL}/login-with-google`, data);
  return response.data;
};

export const sendEmailConfirmationOtp = async (data: SendEmailConfirmationOtpCommand) => {
  const response = await apiClient.post<ApiSuccessResponse>(
    `${BASE_URL}/send-email-confirmation-otp`,
    data,
  );
  return response.data;
};

export const confirmEmail = async (data: ConfirmEmailCommand) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}/confirm-email`, data);
  return response.data;
};

export const sendResetPasswordOtp = async (data: SendResetPasswordOtpCommand) => {
  const response = await apiClient.post<ApiSuccessResponse>(
    `${BASE_URL}/send-reset-password-otp`,
    data,
  );
  return response.data;
};

export const validateResetPasswordOtp = async (data: ValidateResetPasswordOtpCommand) => {
  const response = await apiClient.post<ApiSuccessResponse>(
    `${BASE_URL}/validate-reset-password-otp`,
    data,
  );
  return response.data;
};

export const resetPassword = async (data: ResetPasswordCommand) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}/reset-password`, data);
  return response.data;
};

export const refreshToken = async (data: RefreshTokenCommand) => {
  const response = await apiClient.post<AuthResponse>(`${BASE_URL}/refresh-token`, data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await apiClient.get<CurrentUser>(`${BASE_URL}/self`);
  return response.data;
};

export const getWorkProfileSelf = async () => {
  const response = await apiClient.get<WorkProfileVm>(`${BASE_URL}/work-profile-self`);
  return response.data;
};

export const updateUserProfileSelf = async (command: UpdateUserProfileSelfCommand) => {
  const response = await apiClient.put<ApiSuccessResponse>(
    `${BASE_URL}/update-user-profile-self`,
    command,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};

export const updateWorkProfileSelf = async (command: UpdateWorkProfileSelfCommand) => {
  const response = await apiClient.put<ApiSuccessResponse>(
    `${BASE_URL}/update-work-profile-self`,
    command,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};
