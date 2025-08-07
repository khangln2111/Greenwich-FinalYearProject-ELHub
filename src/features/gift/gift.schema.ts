import z from "zod";

// Schema for creating a gift
export const createGiftSchema = z.object({
  receiverEmail: z.string().email("Invalid email address").trim(),
});

export type CreateGiftSchemaFormValues = z.infer<typeof createGiftSchema>;

// Schema for changing gift receiver
export const changeGiftReceiverSchema = z.object({
  receiverEmail: z.string().email("Invalid email address"),
});

export type ChangeGiftReceiverFormValues = z.infer<typeof changeGiftReceiverSchema>;

// Schema for redeeming a gift
export const redeemGiftSchema = z.object({
  giftCode: z.string().trim().min(1, { message: "Gift code is required" }),
});

export type RedeemGiftFormValues = z.infer<typeof redeemGiftSchema>;
