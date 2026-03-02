import z from "zod";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE_MB } from "../../constants/ValidationConstants";
import { Gender } from "./identity.types";

// Schema for user login
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Please enter at least 8 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// Schema for user registration
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
    email: z.string().min(1, "Please enter your email").email("Invalid email address").trim(),
    password: z
      .string()
      .regex(/[a-z]/, "Add at least one lowercase letter")
      .regex(/[A-Z]/, "Add at least one uppercase letter")
      .regex(/[0-9]/, "Include at least one number in your password")
      .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, "Use at least one special symbol like !@#$")
      .min(8, "Enter at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Confirm passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

// schema for updating user work profile
export const updateWorkProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  professionalTitle: z.string().optional(),
  about: z.string().max(2000, "About must be under 2000 characters").optional(),
  favoriteQuote: z.string().optional(),
  favoriteQuoteCite: z.string().optional(),
  avatar: z
    .instanceof(File)
    .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
      message: "Only JPG, JPEG, PNG, WEBP images are allowed",
    })
    .refine((file) => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024, {
      message: `Image must be less than ${MAX_IMAGE_SIZE_MB}MB`,
    })
    .optional()
    .or(z.string()),
});

export type UpdateWorkProfileFormType = z.infer<typeof updateWorkProfileSchema>;

// Schema for updating user profile
export const updateUserProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.nativeEnum(Gender),
  dateOfBirth: z
    .string()
    .refine(
      (val) => {
        if (!val) return true;
        const date = new Date(val);
        return !isNaN(date.getTime()) && date <= new Date();
      },
      { message: "Invalid or future date" },
    )
    .optional(),
  avatar: z
    .instanceof(File, {
      message: "Profile photo is required",
    })
    .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
      message: "Only JPG, JPEG, PNG, WEBP images are allowed",
    })
    .refine((file) => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024, {
      message: `Image must be less than ${MAX_IMAGE_SIZE_MB}MB`,
    })
    .or(z.string()),
});

export type UpdateUserProfileFormType = z.infer<typeof updateUserProfileSchema>;

// Schema for changing password
export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .regex(/[a-z]/, "Add at least one lowercase letter")
      .regex(/[A-Z]/, "Add at least one uppercase letter")
      .regex(/[0-9]/, "Include at least one number in your password")
      .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, "Use at least one special symbol like !@#$")
      .min(8, "Enter at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Confirm passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
