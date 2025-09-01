import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { identityKeyFac } from "../auth/identity.keyFac";
import { cartKeyFac } from "../cart/cart.keyFac";
import { categoryKeyFac } from "../category/categoryKeyFac";
import { courseKeyFac } from "../course/course.keyFac";
import { orderKeyFac } from "../order/order.keyFac";
import { inventoryKeyFac } from "../inventory/inventory.keyFac";
import { enrollmentKeyFac } from "../enrollment/enrollmentKeyFac";
import { reviewKeyFac } from "../review/review.keyFac";
import { giftKeyFac } from "../gift/gift.keyFac";
import { instructorApplicationKeyFac } from "../instructorApplication/instructorApplicationKeyFac";
import { userKeyFac } from "../user/user.keyFac";
import { instructorKeyFac } from "../instructor/instructor.keyFac";
import { adminDashboardKeyFac } from "../adminDashboard/adminDashboard.keyFac";
import { instructorDashboardKeyFac } from "../instructorDashboard/instructorDashboard.keyFac";
import { userDashboardKeyFac } from "../userDashboard/userDashboard.keyFac";

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
  instructorApplicationKeyFac,
  userKeyFac,
  instructorKeyFac,
  adminDashboardKeyFac,
  instructorDashboardKeyFac,
  userDashboardKeyFac,
);
