import z from "zod";

// Schema for leaving course review
export const CreateReviewFormSchema = z.object({
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(1000, "Content cannot exceed 1000 characters"),
});

export type CreateReviewFormValues = z.infer<typeof CreateReviewFormSchema>;
