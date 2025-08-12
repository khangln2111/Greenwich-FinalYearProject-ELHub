import { BaseQueryCriteria } from "../../api-client/api.types";
import { ReviewVm } from "../review/review.types";

export interface EnrollmentVm {
  id: string;
  courseId: string;
  courseTitle: string;
  courseDescription: string;
  courseImageUrl?: string;
  progressPercentage: number;
  review: ReviewVm | null;
}
type EnrollmentOrderableFields = "createdAt" | "updatedAt";

export interface EnrollmentQueryCriteria extends BaseQueryCriteria<EnrollmentOrderableFields> {}

export interface EnrollFromInventoryCommand {
  inventoryItemId: string;
}
