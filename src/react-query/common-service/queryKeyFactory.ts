import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { identityKeyFac } from "../auth/identityKeyFac";
import { cartKeyFac } from "../cart/cartKeyFac";
import { categoryKeyFac } from "../category/categoryKeyFac";
import { courseKeyFac } from "../course/courseKeyFac";
import { orderKeyFac } from "../order/orderKeyFac";

export const keyFac = mergeQueryKeys(
  courseKeyFac,
  categoryKeyFac,
  identityKeyFac,
  cartKeyFac,
  orderKeyFac,
);
