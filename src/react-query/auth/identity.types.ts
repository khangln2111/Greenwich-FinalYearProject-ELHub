// Auth tokens + user info
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number; // in seconds
  refreshTokenExpiresIn: number; // in seconds
}

// Login
export interface LoginRequest {
  email: string;
  password: string;
}

// Register
export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

// Google Login
export interface LoginWithGoogleRequest {
  idToken: string;
}

// Confirm Email
export interface ConfirmEmailRequest {
  email: string;
  code: string;
}

// Resend Confirmation Email
export interface ResendConfirmationEmailRequest {
  email: string;
}

// Send Reset Password OTP
export interface SendResetPasswordOtpRequest {
  email: string;
}

// Validate Reset Password OTP
export interface ValidateResetPasswordOtpRequest {
  email: string;
  otp: string;
}

// Reset Password
export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
  otp: string;
}

// Refresh Token
export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  roles: string[]; // ["Admin", "User"]
}
