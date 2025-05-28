import { createQueryKeys } from "@lukemorales/query-key-factory";
import { OrderQueryCriteria } from "./order.types";

export const orderKeyFac = createQueryKeys("orders", {
  confirmPaymentIntent: (paymentIntentId: string) => ({
    queryKey: [paymentIntentId],
  }),
  listSelf: (query?: OrderQueryCriteria) => ({
    queryKey: [query],
  }),
  detailSelf: (id: string) => ({
    queryKey: [id],
  }),
});
