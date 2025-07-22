import { createQueryKeys } from "@lukemorales/query-key-factory";
import { OrderQueryCriteria } from "./order.types";

export const orderKeyFac = createQueryKeys("orders", {
  confirmOrder: (paymentIntentId: string) => ({
    queryKey: [paymentIntentId],
  }),
  getOrdersSelf: (query?: OrderQueryCriteria) => ({
    queryKey: [query],
  }),
  getOrderDetailSelf: (id: string) => ({
    queryKey: [id],
  }),
});
