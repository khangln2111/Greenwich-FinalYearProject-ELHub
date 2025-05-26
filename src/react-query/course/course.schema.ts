// course.schema.ts
import { z } from "zod";
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  MAX_IMAGE_SIZE_MB,
  MAX_VIDEO_SIZE_MB,
} from "../../constants/ValidationConstants";
import { CourseLevel } from "./course.types";

export const createCourseFormSchema = z.object({
  title: z.string({ message: "Title is required" }).min(3, "Title must be at least 3 characters"),
  description: z
    .string({ message: "Description is required" })
    .min(10, "Description must be at least 10 characters"),
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
  level: z.enum(
    [CourseLevel.Beginner, CourseLevel.Intermediate, CourseLevel.Advanced, CourseLevel.All],
    {
      required_error: "Level is required",
      invalid_type_error: "Invalid level selected",
    },
  ),
});

export type CreateCourseFormValues = z.infer<typeof createCourseFormSchema>;

export const UpdateCourseOverviewFormSchema = z.object({
  title: z.string().min(1, "Course title is required"),
  description: z.string().min(1, "Course description is required"),
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
  level: z.enum(
    [CourseLevel.Beginner, CourseLevel.Intermediate, CourseLevel.Advanced, CourseLevel.All],
    {
      required_error: "Course level is required",
      invalid_type_error: "Invalid course level selected",
    },
  ),
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
});

export type UpdateCourseOverviewFormValues = z.infer<typeof UpdateCourseOverviewFormSchema>;

export const UpdateCourseOverviewCommandSchema = UpdateCourseOverviewFormSchema.extend({
  id: z.string(),
}).transform((data) => ({
  ...data,
  learningOutcomes: data.learningOutcomes.map((item) => item.value),
  prerequisites: data.prerequisites.map((item) => item.value),
}));

export type UpdateCourseOverviewCommand = z.infer<typeof UpdateCourseOverviewCommandSchema>;
