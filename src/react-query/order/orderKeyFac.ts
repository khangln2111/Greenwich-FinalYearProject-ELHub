import { createQueryKeys } from "@lukemorales/query-key-factory";

export const orderKeyFac = createQueryKeys("orders", {
  confirmPaymentIntent: (paymentIntentId: string) => ({
    queryKey: [paymentIntentId],
  }),
});
