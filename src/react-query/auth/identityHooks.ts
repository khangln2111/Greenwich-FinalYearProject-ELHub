import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { ErrorCode } from "../../http-client/api.types";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { useAppStore } from "../../zustand/store";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import {
  ConfirmEmailCommand,
  LoginCommand,
  LoginWithGoogleCommand,
  RefreshTokenCommand,
  RegisterCommand,
  SendEmailConfirmationOtpCommand,
  ResetPasswordCommand,
  SendResetPasswordOtpCommand,
  UpdateUserProfileSelfCommand,
  ValidateResetPasswordOtpCommand,
} from "./identity.types";
import {
  confirmEmail,
  getCurrentUser,
  login,
  loginWithGoogle,
  refreshToken,
  register,
  sendEmailConfirmationOtp,
  resetPassword,
  sendResetPasswordOtp,
  updateUserProfileSelf,
  validateResetPasswordOtp,
} from "./identityApi";

export const useCurrentUser = () => {
  const accessToken = useAppStore.use.accessToken();
  return useQuery({
    queryKey: keyFac.identity.getCurrentUser.queryKey,
    queryFn: getCurrentUser,
    enabled: !!accessToken,
    refetchOnWindowFocus: false,
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logout = useAppStore.use.logout();

  const handleLogout = () => {
    queryClient.removeQueries({ queryKey: keyFac.identity.getCurrentUser.queryKey });
    logout();
    navigate("/", { replace: true });
  };

  return handleLogout;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterCommand) => register(data),
    onSuccess: () => {
      showSuccessToast(
        "Registered",
        "You have registered successfully, please check your email to confirm your account.",
      );
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
  const queryClient = useQueryClient();
  const setTokens = useAppStore.use.setTokens();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: LoginCommand) => login(data),
    onSuccess: async (data) => {
      showSuccessToast("Logged In", "You are now logged in successfully.");
      const { accessToken, refreshToken } = data;
      setTokens(accessToken, refreshToken);
      await queryClient.invalidateQueries();
      // await queryClient.invalidateQueries({ queryKey: keyFac.identity.currentUser.queryKey });
      navigate("/");
    },
    onError: (error) =>
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
              navigate("/verify-email");
            },
          },
        ],
      }),
  });
};

export const useLoginWithGoogle = () => {
  const queryClient = useQueryClient();
  const setTokens = useAppStore.use.setTokens();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: LoginWithGoogleCommand) => loginWithGoogle(data),
    onSuccess: async (data) => {
      showSuccessToast("Logged In with google", "You are now logged in.");
      const { accessToken, refreshToken } = data;
      setTokens(accessToken, refreshToken);
      await queryClient.invalidateQueries({ queryKey: keyFac.identity.getCurrentUser.queryKey });
      navigate("/");
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
  return useMutation({
    mutationFn: (data: ConfirmEmailCommand) => confirmEmail(data),
    onSuccess: async () => {
      showSuccessToast("Email Confirmed", "Your email has been confirmed successfully.");
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
            handler: () =>
              showErrorToast("Invalid OTP", "The OTP is invalid or has expired. Please try again."),
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

export const useUpdateUserProfile = () => {
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
