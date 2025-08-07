import z from "zod";

// Schema for creating an instructor application
export const createInstructorApplicationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  professionalTitle: z.string().min(1, "Professional title is required"),
  about: z.string().min(1, "About section is required"),
  avatar: z.instanceof(File, { message: "Avatar is required" }),
});

export type CreateInstructorApplicationFormValues = z.infer<
  typeof createInstructorApplicationSchema
>;

// Schema for retrying an instructor application
export const retryInstructorApplicationSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  professionalTitle: z.string().optional(),
  about: z.string().optional(),
  avatar: z.instanceof(File).optional(),
});

export type RetryInstructorApplicationFormValues = z.infer<typeof retryInstructorApplicationSchema>;
