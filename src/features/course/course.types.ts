import { BaseQueryCriteria } from "../../api-client/api.types";
import { EnrollmentSectionVm as EnrollmentSectionVm, SectionVm } from "../section/section.types";

// course.type.ts
export enum CourseStatus {
  Draft = "Draft",
  Published = "Published",
  Pending = "Pending",
  Archived = "Archived",
  Rejected = "Rejected",
}

export enum CourseLevel {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
  All = "All",
}

export interface CourseVm {
  id: string;
  title: string;
  status: CourseStatus;
  summary: string;
  imageUrl: string | null;
  promoVideoUrl: string | null;
  price: number;

  discountPercentage: number;
  discountedPrice: number;
  language: string | null;
  level: CourseLevel;
  learningOutcomes: string[] | null;
  prerequisites: string[] | null;
  lectureCount: number;
  sectionCount: number;
  durationInSeconds: number;
  categoryName: string;

  enrollmentCount: number;
  reviewCount: number;
  averageRating: number;

  instructorId: string;
  instructorName: string;
  instructorAvatarUrl: string | null;
  instructorProfessionalTitle: string | null;
  rejectionCount: number;
  submittedAt: string | null;
  lastRejectedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CourseDetailVm {
  id: string;

  title: string;
  description: string;
  summary: string;

  sectionCount: number;
  lectureCount: number;

  sections: SectionVm[];

  imageUrl: string;
  promoVideoUrl: string;

  price: number;
  discountPercentage: number;
  discountedPrice: number;

  durationInSeconds: number;

  status: string;

  level: CourseLevel;

  learningOutcomes: string[];
  prerequisites: string[];

  categoryName: string;

  enrollmentCount: number;
  reviewCount: number;
  averageRating: number;

  instructorId: string;
  instructorName: string;
  instructorAvatarUrl: string | null;
  instructorProfessionalTitle: string | null;
  instructorAbout: string | null;
  instructorAverageRating: number;
  instructorReviewCount: number;
  instructorCourseCount: number;
  instructorStudentCount: number;
  retryCount: number;
  approvalHistories: CourseApprovalHistoryVm[];

  ratingDistribution: CourseRatingDistributionVm;

  createdAt: string;
  updatedAt: string;
  submittedAt: string | null;
  lastRejectedAt: string | null;
}

export interface EnrollmentDetailSelfVm {
  id: string;

  title: string;
  description: string;

  sectionCount: number;
  lectureCount: number;

  sections: EnrollmentSectionVm[] | null;

  imageUrl: string;
  promoVideoUrl: string;

  durationInSeconds: number;

  status: string;

  level: CourseLevel;

  learningOutcomes: string[];
  prerequisites: string[];

  categoryName: string;
  instructorName: string;
  instructorId: string;

  createdAt: string;
  updatedAt: string;

  progressPercentage: number;
}

export interface ModerateCourseCommand {
  id: string;
  isApproved: boolean;
  note: string;
}

export interface CourseApprovalHistoryVm {
  id: string;
  courseId: string;
  isApproved: boolean;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseCommand {
  categoryId: string;
  title: string;
  summary: string;
  image: File;
  promoVideo: File;
  price: number;
  discountedPrice: number;
  level: CourseLevel;
}

export interface UpdateCourseCommand {
  id: string;
  title?: string;
  summary?: string;
  description?: string;
  sectionCount?: number;
  image?: File;
  promoVideo?: File;
  price?: number;
  discountPercentage?: number;
  discountedPrice?: number;
  durationInSeconds?: number;
  learningOutcomes?: string[];
  prerequisites?: string[];
  language?: string;
  level?: string;
  categoryId?: string;
}

export enum CoursePriceMode {
  Free = "free",
  Paid = "paid",
}

export interface CourseQueryCriteria extends BaseQueryCriteria<CourseOrderableFields> {
  search?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  categoryId?: string | null;
  levels?: CourseLevel[] | null;
  minDurationInSeconds?: number | null;
  maxDurationInSeconds?: number | null;
  status?: CourseStatus | null;
  priceModes?: CoursePriceMode[] | null;
  instructorId?: string | null;
}

export type CourseOrderableFields =
  | "createdAt"
  | "updatedAt"
  | "averageRating"
  | "title"
  | "price"
  | "discountedPrice"
  | "discountedPrice"
  | "durationInSeconds"
  | "enrollmentCount"
  | "lectureCount";

export interface CourseRatingDistributionVm {
  star1: number;
  star2: number;
  star3: number;
  star4: number;
  star5: number;
}

export interface Experience {
  organizationName: string;
  title: string;
  startDate: string;
  endDate?: string; // Optional if currently employed
}
