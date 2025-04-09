import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { categoryKeyFac } from "./category/categoryKeyFac";
import { courseKeyFac } from "./course/courseKeyFac";

export const keyFac = mergeQueryKeys(courseKeyFac, categoryKeyFac);
