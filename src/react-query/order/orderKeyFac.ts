import { createQueryKeys } from "@lukemorales/query-key-factory";
import { OrderQueryCriteria } from "./order.types";
import { getOrdersSelf } from "./orderApi";

export const orderKeyFac = createQueryKeys("orders", {
  confirmPaymentIntent: (paymentIntentId: string) => ({
    queryKey: [paymentIntentId],
  }),
  listSelf: (query?: OrderQueryCriteria) => ({
    queryKey: [query],
    queryFn: () => getOrdersSelf(query),
  }),
});
