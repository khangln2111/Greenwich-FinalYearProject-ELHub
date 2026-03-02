import z from "zod";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE_MB } from "../../constants/ValidationConstants";

export const editUserSchema = z.object({
  firstName: z.string().optional(),

  lastName: z.string().optional(),

  professionalTitle: z.string().optional(),

  dateOfBirth: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(new Date(val).getTime()), {
      message: "Invalid date",
    })
    .refine((val) => !val || new Date(val) <= new Date(), {
      message: "Date of birth cannot be in the future",
    }),

  avatar: z
    .union([
      z
        .instanceof(File)
        .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
          message: "Only JPG, JPEG, PNG, WEBP images are allowed",
        })
        .refine((file) => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024, {
          message: `Image must be less than ${MAX_IMAGE_SIZE_MB}MB`,
        }),
      z.string(),
    ])
    .optional(),
});

export type EditUserFormValues = z.infer<typeof editUserSchema>;
