import z from "zod";

// Schema for creating a section
export const createSectionFormSchema = z.object({
  title: z.string({ message: "Title is required" }).min(1, "Title must be at least 1 character"),
  description: z
    .string({ message: "Description is required" })
    .min(1, "Description must be at least 1 character"),
});

export type CreateSectionFormValues = z.infer<typeof createSectionFormSchema>;

// schema for updating a section
export const editSectionFormSchema = z.object({
  id: z.string().min(1, "Section ID is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export type UpdateSectionFormValues = z.infer<typeof editSectionFormSchema>;
