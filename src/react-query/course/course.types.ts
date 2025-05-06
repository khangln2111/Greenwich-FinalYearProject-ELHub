import { z } from "zod";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE_MB,
  ALLOWED_VIDEO_TYPES,
  MAX_VIDEO_SIZE_MB,
} from "../../constants/ValidationConstants";

export enum CourseStatus {
  Draft = "Draft",
  Published = "Published",
  Pending = "Pending",
  Archived = "Archived",
}

export enum CourseLevel {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
  All = "All",
}
export interface CourseVm {
  id: string;
  title: string;
  status: CourseStatus;
  summary: string;
  description: string;
  imageUrl: string | null;
  promoVideoUrl: string | null;
  price: number;
  rating: number;
  ratingCount: number;
  discountPercentage: number;
  discountedPrice: number;
  language: string | null;
  level: CourseLevel;
  studentEnrollmentCount: number;
  lectureCount: number;
  sectionCount: number;
  durationInSeconds: number;
  categoryName: string;
  createdAt: string | null;
  updatedAt: string | null;
}

export const createCourseSchema = z.object({
  title: z.string({ message: "Title is required" }).min(3, "Title must be at least 3 characters"),
  description: z
    .string({ message: "Description is required" })
    .min(10, "Description must be at least 10 characters"),
  price: z.number({ message: "Price is required" }).min(0, { message: "Price must be >= 0" }),
  discountPercentage: z
    .number({ message: "Discount percentage is required" })
    .min(0, { message: "Discount must be >= 0%" })
    .max(100, { message: "Discount must be <= 100%" }),
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

export type CreateCourseRequest = z.infer<typeof createCourseSchema>;

// export interface CreateCourseRequest {
//   title: string;
//   summary: string;
//   description: string;
//   sectionCount: number;
//   imageUrl?: string | null;
//   promoVideoUrl?: string | null;
//   price: number;
//   discountPercentage?: number;
//   discountedPrice?: number;
//   durationInSeconds?: number;
//   language?: string | null;
//   level?: string | null;
//   categoryId: string;
// }

export interface UpdateCourseRequest {
  id: string;
  title?: string;
  summary?: string;
  description?: string;
  sectionCount?: number;
  image?: File;
  promoVideo?: File;
  price?: number;
  discountPercentage?: number;
  discountedPrice?: number;
  durationInSeconds?: number;
  language?: string;
  level?: string;
  categoryId?: string;
}

export interface CourseQueryCriteria {
  page?: number;
  pageSize?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
  level?: string;
  durationInSeconds?: number;
  language?: string;
  sectionCount?: number;
}
