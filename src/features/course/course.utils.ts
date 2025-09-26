import { CourseStatus } from "./course.types";

export const getCourseStatusBadgeMap: Record<CourseStatus, string> = {
  [CourseStatus.Draft]: "bg-slate-200 text-slate-900 dark:bg-slate-200 dark:text-slate-900",
  [CourseStatus.Published]: "bg-green-200 text-green-900 dark:bg-green-200 dark:text-green-900",
  [CourseStatus.Pending]: "bg-yellow-200 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900",
  [CourseStatus.Banned]: "bg-black text-white",
  [CourseStatus.Rejected]: "bg-red-200 text-red-800 dark:bg-red-200 dark:text-red-900",
};
