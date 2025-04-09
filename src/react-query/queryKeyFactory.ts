import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { courseKeyFac } from "./course/courseHooks";

export const keyFac = mergeQueryKeys(courseKeyFac);
