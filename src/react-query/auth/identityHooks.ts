import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ErrorCode } from "../../http-client/api.types";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import {
  ConfirmEmailRequest,
  LoginWithGoogleRequest,
  LoginRequest,
  RefreshTokenRequest,
  RegisterRequest,
  ResendConfirmationEmailRequest,
  ResetPasswordRequest,
  SendResetPasswordOtpRequest,
  ValidateResetPasswordOtpRequest,
} from "./identity.types";
import {
  confirmEmail,
  loginWithGoogle,
  login,
  refreshToken,
  register,
  resendConfirmationEmail,
  resetPassword,
  sendResetPasswordOtp,
  validateResetPasswordOtp,
  getCurrentUser,
} from "./identityApi";
import { handleApiError } from "../common-service/handleApiError";
import { useAppStore } from "../../zustand/store";
import { keyFac } from "../common-service/queryKeyFactory";
import { useNavigate } from "react-router-dom";

export const useCurrentUser = () => {
  const accessToken = useAppStore.use.accessToken();
  return useQuery({
    queryKey: keyFac.identity.currentUser.queryKey,
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
    queryClient.removeQueries({ queryKey: keyFac.identity.currentUser.queryKey });
    logout();
    navigate("/", { replace: true });
  };

  return handleLogout;
};

export const useRegister = async (data: RegisterRequest) => {
  return useMutation({
    mutationFn: () => register(data),
    onSuccess: async () => {
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
    mutationFn: (data: LoginRequest) => login(data),
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
            handler: () =>
              showErrorToast(
                "Email Not Confirmed",
                "Please confirm your email address before logging in.",
              ),
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
    mutationFn: (data: LoginWithGoogleRequest) => loginWithGoogle(data),
    onSuccess: async (data) => {
      showSuccessToast("Logged In with google", "You are now logged in.");
      const { accessToken, refreshToken } = data;
      setTokens(accessToken, refreshToken);
      await queryClient.invalidateQueries({ queryKey: keyFac.identity.currentUser.queryKey });
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

export const useConfirmEmail = async (data: ConfirmEmailRequest) => {
  return useMutation({
    mutationFn: () => confirmEmail(data),
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

export const useResendConfirmationEmail = async (data: ResendConfirmationEmailRequest) => {
  return useMutation({
    mutationFn: () => resendConfirmationEmail(data),
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

export const useSendResetPasswordOtp = async (data: SendResetPasswordOtpRequest) => {
  return useMutation({
    mutationFn: () => sendResetPasswordOtp(data),
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

export const useValidateResetPasswordOtp = async (data: ValidateResetPasswordOtpRequest) => {
  return useMutation({
    mutationFn: () => validateResetPasswordOtp(data),
    onSuccess: async () => {
      showSuccessToast("OTP Validated", "The OTP has been validated successfully.");
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

export const useResetPassword = async (data: ResetPasswordRequest) => {
  return useMutation({
    mutationFn: () => resetPassword(data),
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

export const useRefreshToken = async (data: RefreshTokenRequest) => {
  return useMutation({
    mutationFn: () => refreshToken(data),
    onSuccess: async () => {
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
