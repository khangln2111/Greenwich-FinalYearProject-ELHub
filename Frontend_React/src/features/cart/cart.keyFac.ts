import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getCartItemCountSelf, getCartItemsSelf } from "./cart.api";
import { CartItemQueryCriteria } from "./cart.types";

export const cartKeyFac = createQueryKeys("cart", {
  getCartSelf: {
    queryKey: null,
    queryFn: () => getCartItemsSelf(),
  },
  getCartItemsSelf: (query?: CartItemQueryCriteria) => ({
    queryKey: [query],
    queryFn: () => getCartItemsSelf(query),
  }),
  getCartItemCountSelf: {
    queryKey: null,
    queryFn: () => getCartItemCountSelf(),
  },
});
