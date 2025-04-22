import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ApiErrorResponse, ErrorCode } from "../../http-client/api.types";
import { showErrorToast, showSuccessToast } from "../toastHelper";
import {
  ConfirmEmailRequest,
  GoogleLoginRequest,
  LoginRequest,
  RefreshTokenRequest,
  RegisterRequest,
  ResendConfirmationEmailRequest,
  ResetPasswordRequest,
  SendResetPasswordOtpRequest,
  ValidateResetPasswordOtpRequest,
} from "./auth.types";
import {
  confirmEmail,
  googleLogin,
  login,
  refreshToken,
  register,
  resendConfirmationEmail,
  resetPassword,
  sendResetPasswordOtp,
  validateResetPasswordOtp,
} from "./authApi";

export const useRegister = async (data: RegisterRequest) => {
  return useMutation({
    mutationFn: () => register(data),
    onSuccess: async () => {
      showSuccessToast(
        "Registered",
        "You have registered successfully, please check your email to confirm your account.",
      );
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 && data.errorCode === ErrorCode.ValidationError) {
          showErrorToast("Validation Error", data.message);
        } else if (status === 409 && data.errorCode === ErrorCode.EmailAlreadyTaken) {
          showErrorToast("Email Already Taken", "The email address is already in use.");
        } else {
          showErrorToast("Unexpected Error", error.message);
        }
      } else {
        console.error("Axios Error:", error);
        showErrorToast("Network Error", "No response from the server. Please try again later.");
      }
    },
  });
};

export const useLogin = async (data: LoginRequest) => {
  return useMutation({
    mutationFn: () => login(data),
    onSuccess: async () => {
      showSuccessToast("Logged In", "You are now logged in.");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 && data.errorCode === ErrorCode.ValidationError) {
          showErrorToast("Validation Error", data.message);
        } else if (status === 401 && data.errorCode === ErrorCode.EmailOrPasswordIncorrect) {
          showErrorToast("Login Failed", "The email or password is incorrect.");
        } else if (status === 403 && data.errorCode === ErrorCode.EmailNotConfirmed) {
          showErrorToast(
            "Email Not Confirmed",
            "Please confirm your email address before logging in.",
          );
        } else {
          showErrorToast("Unexpected Error", error.message);
        }
      } else {
        console.error("Axios Error:", error);
        showErrorToast("Network Error", "No response from the server. Please try again later.");
      }
    },
  });
};

export const useGoogleLogin = async (data: GoogleLoginRequest) => {
  return useMutation({
    mutationFn: () => googleLogin(data),
    onSuccess: async () => {
      showSuccessToast("Logged In", "You are now logged in.");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 && data.errorCode === ErrorCode.InvalidToken) {
          showErrorToast(
            "Invalid Token",
            "The token is invalid or has expired. Please login again.",
          );
        }
      }
    },
  });
};

export const useConfirmEmail = async (data: ConfirmEmailRequest) => {
  return useMutation({
    mutationFn: () => confirmEmail(data),
    onSuccess: async () => {
      showSuccessToast("Email Confirmed", "Your email has been confirmed successfully.");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 404) {
          showErrorToast("Email not found", "The email address does not exist.");
        } else if (status === 400 && data.errorCode === ErrorCode.EmailAlreadyConfirmed) {
          showErrorToast(
            "Email Already Confirmed",
            "The email address has already been confirmed.",
          );
        } else if (status === 400 && data.errorCode === ErrorCode.InvalidOtp) {
          showErrorToast("Invalid OTP", "The OTP is invalid or has expired. Please try again.");
        } else {
          showErrorToast("Unexpected Error", error.message);
        }
      } else {
        console.error("Axios Error:", error);
        showErrorToast("Network Error", "No response from the server. Please try again later.");
      }
    },
  });
};

export const useResendConfirmationEmail = async (data: ResendConfirmationEmailRequest) => {
  return useMutation({
    mutationFn: () => resendConfirmationEmail(data),
    onSuccess: async () => {
      showSuccessToast("Email Resent", "Confirmation email has been resent successfully.");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 404) {
          showErrorToast("Email not found", "The email address does not exist.");
        } else if (status === 400 && data.errorCode === ErrorCode.EmailAlreadyConfirmed) {
          showErrorToast(
            "Email Already Confirmed",
            "The email address has already been confirmed.",
          );
        } else {
          showErrorToast("Unexpected Error", error.message);
        }
      } else {
        console.error("Axios Error:", error);
        showErrorToast("Network Error", "No response from the server. Please try again later.");
      }
    },
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
    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (!error.response) {
        console.error("Axios Error:", error);
        showErrorToast("Network Error", "No response from the server. Please try again later.");
        return;
      }
      const { status } = error.response;
      if (status === 404) {
        showErrorToast("Email not found", "The email address does not exist.");
      } else {
        showErrorToast("Unexpected Error", error.message);
      }
    },
  });
};

export const useValidateResetPasswordOtp = async (data: ValidateResetPasswordOtpRequest) => {
  return useMutation({
    mutationFn: () => validateResetPasswordOtp(data),
    onSuccess: async () => {
      showSuccessToast("OTP Validated", "The OTP has been validated successfully.");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (!error.response) {
        console.error("Axios Error:", error);
        showErrorToast("Network Error", "No response from the server. Please try again later.");
        return;
      }
      const { status, data } = error.response;
      if (status === 404) {
        showErrorToast("Email not found", "The email address does not exist.");
      } else if (status === 400 && data.errorCode === ErrorCode.InvalidOtp) {
        showErrorToast("Invalid OTP", "The OTP is invalid or has expired. Please try again.");
      } else {
        showErrorToast("Unexpected Error", error.message);
      }
    },
  });
};

export const useResetPassword = async (data: ResetPasswordRequest) => {
  return useMutation({
    mutationFn: () => resetPassword(data),
    onSuccess: async () => {
      showSuccessToast("Password Reset", "Your password has been reset successfully.");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (!error.response) {
        console.error("Axios Error:", error);
        showErrorToast("Network Error", "No response from the server. Please try again later.");
        return;
      }
      const { status, data } = error.response;
      if (status === 404) {
        showErrorToast("Email not found", "The email address does not exist.");
      } else if (status === 400 && data.errorCode === ErrorCode.InvalidOtp) {
        showErrorToast("Invalid OTP", "The OTP is invalid or has expired. Please try again.");
      } else {
        showErrorToast("Unexpected Error", error.message);
      }
    },
  });
};

export const useRefreshToken = async (data: RefreshTokenRequest) => {
  return useMutation({
    mutationFn: () => refreshToken(data),
    onSuccess: async () => {
      showSuccessToast("Token Refreshed", "Your token has been refreshed successfully.");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (!error.response) {
        console.error("Axios Error:", error);
        showErrorToast("Network Error", "No response from the server. Please try again later.");
        return;
      }
      const { status, data } = error.response;
      if (status === 401 && data.errorCode === ErrorCode.InvalidToken) {
        showErrorToast(
          "Invalid refresh Token",
          "The token is invalid or has expired. Please login again.",
        );
      } else {
        showErrorToast("Unexpected Error", error.message);
      }
    },
  });
};
