import { BaseQueryCriteria } from "../../api-client/api.types";
import { ReviewVm } from "../review/review.types";

export interface EnrollmentSelfVm {
  id: string;
  courseId: string;
  courseTitle: string;
  courseSummary: string;
  courseImageUrl?: string;
  instructorName: string;
  progressPercentage: number;
  review: ReviewVm | null;
}
type EnrollmentOrderableFields = "createdAt" | "updatedAt";

export interface EnrollmentQueryCriteria extends BaseQueryCriteria<EnrollmentOrderableFields> {
  search?: string | null;
}

export interface EnrollFromInventoryCommand {
  inventoryItemId: string;
}
