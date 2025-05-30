import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { identityKeyFac } from "../auth/identityKeyFac";
import { cartKeyFac } from "../cart/cartKeyFac";
import { categoryKeyFac } from "../category/categoryKeyFac";
import { courseKeyFac } from "../course/courseKeyFac";
import { orderKeyFac } from "../order/orderKeyFac";
import { inventoryKeyFac } from "../inventory/inventoryKeyFac";

export const keyFac = mergeQueryKeys(
  courseKeyFac,
  categoryKeyFac,
  identityKeyFac,
  cartKeyFac,
  orderKeyFac,
  inventoryKeyFac,
);
