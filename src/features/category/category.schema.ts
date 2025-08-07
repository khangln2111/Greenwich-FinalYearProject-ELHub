import z from "zod";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE_MB } from "../../constants/ValidationConstants";

// Schema for creating a new category
export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z
    .instanceof(File, { message: "Image is required" })
    .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
      message: "Only PNG, JPG, JPEG, or WEBP images are allowed",
    })
    .refine((file) => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024, {
      message: `Image must be less than ${MAX_IMAGE_SIZE_MB}MB`,
    }),
});

export type CreateCategoryFormValues = z.infer<typeof createCategorySchema>;

// Schema for updating an existing category
export const updateCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z
    .instanceof(File, { message: "Image is required" })
    .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
      message: "Only PNG, JPG, JPEG, or WEBP images are allowed",
    })
    .refine((file) => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024, {
      message: `Image must be less than ${MAX_IMAGE_SIZE_MB}MB`,
    })
    .or(z.string()),
});

export type UpdateCategoryFormValues = z.infer<typeof updateCategorySchema>;
