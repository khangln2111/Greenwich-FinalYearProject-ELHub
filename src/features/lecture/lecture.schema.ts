import z from "zod";
import { ALLOWED_VIDEO_TYPES, MAX_VIDEO_SIZE_MB } from "../../constants/ValidationConstants";

// Schema for creating a lecture
export const createLectureSchema = z.object({
  title: z.string({ message: "Title is required" }).min(1, "Title must be at least 1 character"),
  description: z
    .string({ message: "Description is required" })
    .min(1, "Description must be at least 1 character"),
  isPreview: z.boolean().default(false),
  video: z
    .instanceof(File, { message: "Video is required" })
    .refine((file) => ALLOWED_VIDEO_TYPES.includes(file.type), {
      message: "Only MP4, WebM, or OGG videos are allowed",
    })
    .refine((file) => file.size <= MAX_VIDEO_SIZE_MB * 1024 * 1024, {
      message: `Video must be less than ${MAX_VIDEO_SIZE_MB}MB`,
    }),
});

export type CreateLectureFormValues = z.infer<typeof createLectureSchema>;

// Schema for updating a lecture
export const UpdateLectureSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  video: z
    .instanceof(File, { message: "Promotional video is required" })
    .refine((file) => ALLOWED_VIDEO_TYPES.includes(file.type), {
      message: "Only MP4, WebM, or OGG videos are allowed",
    })
    .refine((file) => file.size <= MAX_VIDEO_SIZE_MB * 1024 * 1024, {
      message: `Video must be less than ${MAX_VIDEO_SIZE_MB}MB`,
    })
    .or(z.string()),
  isPreview: z.boolean(),
});

export type UpdateLectureFormValues = z.infer<typeof UpdateLectureSchema>;
