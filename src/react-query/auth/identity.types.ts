import { z } from "zod";

// Auth tokens + user info
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number; // in seconds
  refreshTokenExpiresIn: number; // in seconds
}

// Login
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Please enter at least 8 characters"),
});

export type LoginCommand = z.infer<typeof loginSchema>;

// Register
export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "Please enter at least 2 characters")
      .max(50, "That’s too long – max 50 characters allowed"),
    lastName: z
      .string()
      .min(2, "Please enter at least 2 characters")
      .max(50, "That’s too long – max 50 characters allowed"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must have at least 8 characters")
      .regex(/[0-9]/, "Include at least one number in your password")
      .regex(/[a-z]/, "Add at least one lowercase letter")
      .regex(/[A-Z]/, "Add at least one uppercase letter")
      .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, "Use at least one special symbol like !@#$"),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Confirm passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterCommand = z.infer<typeof registerSchema>;

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
  firstName: string;
  lastName: string;
  avatarUrl: string;
  dateOfBirth: Date;
  gender: Gender;
  roles: string[]; // ["Admin", "User"]
}

export interface UpdateUserProfileSelfCommand {
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  dateOfBirth?: Date;
  avatar?: File;
}

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}
