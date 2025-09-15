import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getCartItemCountSelf, getCartItemsSelf } from "./cart.api";

export const cartKeyFac = createQueryKeys("cart", {
  getCartSelf: {
    queryKey: null,
    queryFn: () => getCartItemsSelf(),
  },
  getCartItemsSelf: {
    queryKey: null,
    queryFn: () => getCartItemsSelf(),
  },
  getCartItemCountSelf: {
    queryKey: null,
    queryFn: () => getCartItemCountSelf(),
  },
});
