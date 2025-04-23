import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { categoryKeyFac } from "../category/categoryKeyFac";
import { courseKeyFac } from "../course/courseKeyFac";
import { identityKeyFac } from "../auth/identityKeyFac";

export const keyFac = mergeQueryKeys(courseKeyFac, categoryKeyFac, identityKeyFac);
