import { BaseQueryCriteria } from "../../api-client/api.types";
import { ReviewVm } from "../review/review.types";
import { EnrollmentSectionVm } from "../section/section.types";

export interface EnrollmentSelfVm {
  id: string;
  courseId: string;
  courseTitle: string;
  courseSummary: string;
  courseImageUrl?: string;
  instructorName: string;
  instructorAvatarUrl?: string;
  progressPercentage: number;
  review: ReviewVm | null;
}

export interface EnrollmentDetailSelfVm {
  id: string;
  courseTitle: string;
  courseSummary: string;
  sectionCount: number;
  lectureCount: number;
  sections: EnrollmentSectionVm[];
  imageUrl: string;
  promoVideoUrl: string;
  durationInSeconds: number;
  status: string;
  level: string;
  categoryName: string;
  instructorName: string;
  instructorId: string;
  progressPercentage: number;
  createdAt: string;
  updatedAt: string;
}

type EnrollmentOrderableFields = "createdAt" | "updatedAt";

export interface EnrollmentQueryCriteria extends BaseQueryCriteria<EnrollmentOrderableFields> {
  search?: string | null;
}

export interface EnrollFromInventoryCommand {
  inventoryItemId: string;
}
