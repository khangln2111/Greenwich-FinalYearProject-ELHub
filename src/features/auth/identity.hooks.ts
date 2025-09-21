import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useLocation, useNavigate } from "react-router";
import { ErrorCode } from "../../api-client/api.types";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { useAuthStore } from "../../zustand/stores/authStore";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import {
  confirmEmail,
  getCurrentUserInfo,
  getWorkProfileSelf,
  login,
  loginWithGoogle,
  refreshToken,
  register,
  resetPassword,
  sendEmailConfirmationOtp,
  sendResetPasswordOtp,
  updateUserProfileSelf,
  updateWorkProfileSelf,
  validateResetPasswordOtp,
} from "./identity.api";
import {
  ConfirmEmailCommand,
  LoginCommand,
  LoginWithGoogleCommand,
  RefreshTokenCommand,
  RegisterCommand,
  ResetPasswordCommand,
  SendEmailConfirmationOtpCommand,
  SendResetPasswordOtpCommand,
  UpdateUserProfileSelfCommand,
  UpdateWorkProfileSelfCommand,
  ValidateResetPasswordOtpCommand,
} from "./identity.types";

export const useGetCurrentUser = () => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const setCurrentUser = useAuthStore((s) => s.setCurrentUser);
  const currentUser = useAuthStore((s) => s.currentUser);

  return useQuery({
    queryKey: keyFac.identity.getCurrentUser.queryKey,
    queryFn: async () => {
      const data = await getCurrentUserInfo();
      setCurrentUser(data);
      return data;
    },
    initialData: () => currentUser,
    staleTime: currentUser ? Infinity : 0,
    refetchOnWindowFocus: false,
    enabled: !!accessToken,
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logout = useAuthStore((s) => s.logout);
  const setLogoutAt = useAuthStore((s) => s.setLogoutAt);

  return useMutation({
    mutationFn: async () => {
      logout();
    },
    onSuccess: () => {
      queryClient.clear();
      setLogoutAt();
      navigate("/", { replace: true });
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: RegisterCommand) => register(data),
    onSuccess: (_data, variables) => {
      showSuccessToast(
        "Registered",
        "You have registered successfully, please check your email to confirm your account.",
      );
      navigate(`/confirm-email?email=${encodeURIComponent(variables.email)}`);
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 409,
            errorCode: ErrorCode.EmailAlreadyTaken,
            handler: () =>
              showErrorToast("Email Already Taken", "The email address is already in use."),
          },
        ],
      }),
  });
};

export const useLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const from = location.state?.from?.pathname || "/";
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setRefreshToken = useAuthStore((s) => s.setRefreshToken);
  const setLoginAt = useAuthStore((s) => s.setLoginAt);

  return useMutation({
    mutationFn: (data: LoginCommand) => login(data),
    onSuccess: async (data) => {
      const { accessToken, refreshToken } = data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      navigate(from, { replace: true });
      await queryClient.invalidateQueries();
      showSuccessToast("Logged In", "You are now logged in successfully.");
      setLoginAt();
    },
    onError: (error, variables) =>
      handleApiError(error, {
        matchers: [
          {
            status: 401,
            errorCode: ErrorCode.EmailOrPasswordIncorrect,
            handler: () => showErrorToast("Login Failed", "The email or password is incorrect."),
          },
          {
            status: 403,
            errorCode: ErrorCode.EmailNotConfirmed,
            handler: () => {
              showErrorToast(
                "Email Not Confirmed",
                "Please confirm your email address before logging in.",
              );
              navigate(`/confirm-email?email=${encodeURIComponent(variables.email)}`);
            },
          },
        ],
      }),
  });
};

export const useLoginWithGoogle = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const from = state?.from || "/";
  const queryClient = useQueryClient();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setRefreshToken = useAuthStore((s) => s.setRefreshToken);
  const setLoginAt = useAuthStore((s) => s.setLoginAt);

  return useMutation({
    mutationFn: (data: LoginWithGoogleCommand) => loginWithGoogle(data),
    onSuccess: async (data) => {
      const { accessToken, refreshToken } = data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      navigate(from, { replace: true });
      await queryClient.invalidateQueries();
      showSuccessToast("Logged In with google", "You are now logged in.");
      setLoginAt();
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 400,
            errorCode: ErrorCode.InvalidToken,
            handler: () =>
              showErrorToast(
                "Invalid Token",
                "The token is invalid or has expired. Please login again.",
              ),
          },
        ],
      }),
  });
};

export const useSendEmailConfirmationOtp = () => {
  return useMutation({
    mutationFn: (data: SendEmailConfirmationOtpCommand) => sendEmailConfirmationOtp(data),
    onSuccess: async () => {
      showSuccessToast("Email Resent", "Confirmation email has been resent successfully.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Email not found", "The email address does not exist."),
          },
          {
            status: 400,
            errorCode: ErrorCode.EmailAlreadyConfirmed,
            handler: () =>
              showErrorToast(
                "Email Already Confirmed",
                "The email address has already been confirmed.",
              ),
          },
        ],
      }),
  });
};

export const useConfirmEmail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const from = state?.from || "/";
  const queryClient = useQueryClient();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setRefreshToken = useAuthStore((s) => s.setRefreshToken);
  const setLoginAt = useAuthStore((s) => s.setLoginAt);

  return useMutation({
    mutationFn: (data: ConfirmEmailCommand) => confirmEmail(data),
    onSuccess: async (data) => {
      const { accessToken, refreshToken } = data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      await queryClient.invalidateQueries();
      navigate(from, { replace: true });
      showSuccessToast("Email Confirmed", "Your email has been confirmed successfully.");
      setLoginAt();
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Email not found", "The email address does not exist."),
          },
          {
            status: 400,
            errorCode: ErrorCode.EmailAlreadyConfirmed,
            handler: () =>
              showErrorToast(
                "Email Already Confirmed",
                "The email address has already been confirmed.",
              ),
          },
          {
            status: 400,
            errorCode: ErrorCode.InvalidOtp,
            handler: () => {
              showErrorToast("Invalid OTP", "The OTP is invalid or has expired. Please try again.");
            },
          },
        ],
      }),
  });
};

export const useSendResetPasswordOtp = () => {
  return useMutation({
    mutationFn: (data: SendResetPasswordOtpCommand) => sendResetPasswordOtp(data),
    onSuccess: async () => {
      showSuccessToast(
        "Reset Password OTP Sent",
        "An OTP has been sent to your email, please check your inbox.",
      );
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Email not found", "The email address does not exist."),
          },
        ],
      }),
  });
};

export const useValidateResetPasswordOtp = () => {
  return useMutation({
    mutationFn: (data: ValidateResetPasswordOtpCommand) => validateResetPasswordOtp(data),
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Email not found", "The email address does not exist."),
          },
          {
            status: 400,
            errorCode: ErrorCode.InvalidOtp,
            handler: () =>
              showErrorToast("Invalid OTP", "The OTP is invalid or has expired. Please try again."),
          },
        ],
      }),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordCommand) => resetPassword(data),
    onSuccess: async () => {
      showSuccessToast("Password Reset", "Your password has been reset successfully.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Email not found", "The email address does not exist."),
          },
          {
            status: 400,
            errorCode: ErrorCode.InvalidOtp,
            handler: () =>
              showErrorToast("Invalid OTP", "The OTP is invalid or has expired. Please try again."),
          },
        ],
      }),
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: (data: RefreshTokenCommand) => refreshToken(data),
    onSuccess: () => {
      showSuccessToast("Token Refreshed", "Your token has been refreshed successfully.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 401,
            errorCode: ErrorCode.InvalidToken,
            handler: () =>
              showErrorToast(
                "Invalid refresh Token",
                "The token is invalid or has expired. Please login again.",
              ),
          },
        ],
      }),
  });
};

export const useUpdateUserProfileSelf = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: UpdateUserProfileSelfCommand) => updateUserProfileSelf(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.identity.getCurrentUser.queryKey });
      showSuccessToast("Profile Updated", "Your profile has been updated successfully.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () =>
              showErrorToast(
                "User not found",
                "The user profile you are trying to update does not exist.",
              ),
          },
        ],
      }),
  });
};

export const useGetWorkProfileSelf = () => {
  const accessToken = useAuthStore((s) => s.accessToken);
  return useQuery({
    queryKey: keyFac.identity.getWorkProfileSelf.queryKey,
    queryFn: getWorkProfileSelf,
    refetchOnWindowFocus: false,
    enabled: !!accessToken,
  });
};

export const useUpdateWorkProfileSelf = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: UpdateWorkProfileSelfCommand) => updateWorkProfileSelf(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.identity.getWorkProfileSelf.queryKey });
      queryClient.invalidateQueries({ queryKey: keyFac.identity.getCurrentUser.queryKey });
      showSuccessToast(
        "Working Profile Updated",
        "Your work profile has been updated successfully.",
      );
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () =>
              showErrorToast(
                "Working Profile not found",
                "The work profile you are trying to update does not exist.",
              ),
          },
        ],
      }),
  });
};
