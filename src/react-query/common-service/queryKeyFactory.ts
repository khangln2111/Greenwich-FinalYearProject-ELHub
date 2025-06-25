import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { identityKeyFac } from "../auth/identityKeyFac";
import { cartKeyFac } from "../cart/cartKeyFac";
import { categoryKeyFac } from "../category/categoryKeyFac";
import { courseKeyFac } from "../course/courseKeyFac";
import { orderKeyFac } from "../order/orderKeyFac";
import { inventoryKeyFac } from "../inventory/inventoryKeyFac";
import { enrollmentKeyFac } from "../enrollment/enrollmentKeyFac";
import { reviewKeyFac } from "../review/reviewKeyFac";
import { giftKeyFac } from "../gift/giftKeyFac";

export const keyFac = mergeQueryKeys(
  courseKeyFac,
  categoryKeyFac,
  identityKeyFac,
  cartKeyFac,
  orderKeyFac,
  inventoryKeyFac,
  enrollmentKeyFac,
  reviewKeyFac,
  giftKeyFac,
);
