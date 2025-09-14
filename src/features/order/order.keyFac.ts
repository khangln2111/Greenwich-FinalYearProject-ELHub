import { createQueryKeys } from "@lukemorales/query-key-factory";
import { OrderQueryCriteria } from "./order.types";
import { getOrderDetailSelf, getOrdersSelf, processOrder } from "./order.api";

export const orderKeyFac = createQueryKeys("orders", {
  processOrder: (paymentIntentId: string) => ({
    queryKey: [paymentIntentId],
    queryFn: () => processOrder(paymentIntentId),
  }),
  getOrdersSelf: (query?: OrderQueryCriteria) => ({
    queryKey: [query],
    queryFn: () => getOrdersSelf(query),
  }),
  getOrderDetailSelf: (id: string) => ({
    queryKey: [id],
    queryFn: () => getOrderDetailSelf(id),
  }),
});
