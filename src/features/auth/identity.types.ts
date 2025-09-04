// Auth tokens + user info
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number; // in seconds
  refreshTokenExpiresIn: number; // in seconds
}

// Login
export interface LoginCommand {
  email: string;
  password: string;
}

// Register
export type RegisterCommand = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Google Login
export interface LoginWithGoogleCommand {
  idToken: string;
}

// Confirm Email
export interface ConfirmEmailCommand {
  email: string;
  otp: string;
}

// Resend Confirmation Email
export interface SendEmailConfirmationOtpCommand {
  email: string;
}

// Send Reset Password OTP
export interface SendResetPasswordOtpCommand {
  email: string;
}

// Validate Reset Password OTP
export interface ValidateResetPasswordOtpCommand {
  email: string;
  otp: string;
}

// Reset Password
export interface ResetPasswordCommand {
  email: string;
  newPassword: string;
  otp: string;
}

// Refresh Token
export interface RefreshTokenCommand {
  refreshToken: string;
}

export interface CurrentUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  dateOfBirth: string;
  gender: Gender;
  roles: string[]; // ["Admin", "User"]
}

export enum RoleName {
  ADMIN = "ADMIN",
  INSTRUCTOR = "INSTRUCTOR",
  LEARNER = "LEARNER",
}

export interface WorkProfileVm {
  id: string;
  firstName: string;
  lastName: string;
  professionalTitle?: string;
  about?: string;
  avatarUrl?: string;
  favoriteQuote?: string;
  favoriteQuoteCite?: string;
}

export interface UpdateUserProfileSelfCommand {
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  dateOfBirth?: string;
  avatar?: File;
}

export interface UpdateWorkProfileSelfCommand {
  firstName?: string;
  lastName?: string;
  professionalTitle?: string;
  about?: string;
  avatar?: File;
  favoriteQuote?: string;
  favoriteQuoteCite?: string;
}

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}
