// course.schema.ts
import { z } from "zod";
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  MAX_IMAGE_SIZE_MB,
  MAX_VIDEO_SIZE_MB,
} from "../../constants/ValidationConstants";
import { CourseLevel } from "./course.types";

// schema for creating a course
export const createCourseSchema = z
  .object({
    title: z.string({ message: "Title is required" }).min(3, "Title must be at least 3 characters"),
    summary: z
      .string({ message: "Summary is required" })
      .min(10, "Summary must be at least 10 characters"),
    price: z.number({ message: "Price is required" }).min(0, { message: "Price must be >= 0" }),
    discountedPrice: z
      .number({ message: "Discounted price is required" })
      .min(0, { message: "Discounted price must be ≥ 0" }),
    image: z
      .instanceof(File, { message: "Course image is required" })
      .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
        message: "Only JPG, PNG, WEBP images are allowed",
      })
      .refine((file) => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024, {
        message: `Image must be less than ${MAX_IMAGE_SIZE_MB}MB`,
      }),
    promoVideo: z
      .instanceof(File, { message: "Promotional video is required" })
      .refine((file) => ALLOWED_VIDEO_TYPES.includes(file.type), {
        message: "Only MP4, WebM, or OGG videos are allowed",
      })
      .refine((file) => file.size <= MAX_VIDEO_SIZE_MB * 1024 * 1024, {
        message: `Video must be less than ${MAX_VIDEO_SIZE_MB}MB`,
      }),
    categoryId: z.string({ message: "Category is required" }).min(1, "Select a category"),
    level: z.nativeEnum(CourseLevel, {
      required_error: "Level is required",
      invalid_type_error: "Invalid level selected",
    }),
  })
  .refine((data) => data.discountedPrice <= data.price, {
    message: "Discounted price must be less than or equal to Price",
    path: ["discountedPrice"],
  });

export type CreateCourseFormValues = z.infer<typeof createCourseSchema>;

// Schema for updating course overview
export const updateCourseOverviewSchema = z
  .object({
    title: z.string().min(1, "Course title is required"),
    summary: z.string().min(10, "Summary must be at least 10 characters"),
    description: z.string().min(200, "Enter a description of at least 200 characters"),
    price: z.number({ message: "Price is required" }).min(0, { message: "Price must be >= 0" }),
    discountedPrice: z
      .number({ message: "Discounted price is required" })
      .min(0, { message: "Discounted price must be ≥ 0" }),
    learningOutcomes: z.array(
      z.object({
        id: z.string(),
        value: z.string().min(1, "Cannot be empty"),
      }),
    ),
    prerequisites: z.array(
      z.object({
        id: z.string(),
        value: z.string().min(1, "Cannot be empty"),
      }),
    ),
    level: z.nativeEnum(CourseLevel, {
      required_error: "Course level is required",
      invalid_type_error: "Invalid course level selected",
    }),
    image: z
      .instanceof(File, { message: "Course image is required" })
      .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
        message: "Only JPG, PNG, WEBP images are allowed",
      })
      .refine((file) => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024, {
        message: `Image must be less than ${MAX_IMAGE_SIZE_MB}MB`,
      })
      .or(z.string()),
    promoVideo: z
      .instanceof(File, { message: "Promotional video is required" })
      .refine((file) => ALLOWED_VIDEO_TYPES.includes(file.type), {
        message: "Only MP4, WebM, or OGG videos are allowed",
      })
      .refine((file) => file.size <= MAX_VIDEO_SIZE_MB * 1024 * 1024, {
        message: `Video must be less than ${MAX_VIDEO_SIZE_MB}MB`,
      })
      .or(z.string()),
  })
  .refine((data) => data.discountedPrice <= data.price, {
    message: "Discounted price must be less than or equal to Price",
    path: ["discountedPrice"],
  });

export type UpdateCourseOverviewFormValues = z.infer<typeof updateCourseOverviewSchema>;

// Schema for course approval
export const courseApprovalSchema = z.object({
  note: z.string().min(5, "Note must be at least 5 characters long"),
});

export type CourseApprovalFormValues = z.infer<typeof courseApprovalSchema>;

// schema for course moderation
export const moderateCourseSchema = z.object({
  note: z.string().min(1, { message: "Note is required" }),
});

export type ModerateCourseFormValues = z.infer<typeof moderateCourseSchema>;
