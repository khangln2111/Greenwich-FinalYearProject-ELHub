import { BaseQueryCriteria } from "../../http-client/api.types";
import { LearningSectionVm, SectionVm } from "../section/section.types";

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
  description: string;
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

  createdAt: string;
  updatedAt: string;
  submittedAt: string | null;
  lastRejectedAt: string | null;
}

export interface LearningCourseVm {
  id: string;

  title: string;
  description: string;

  sectionCount: number;
  lectureCount: number;

  sections: LearningSectionVm[] | null;

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
  instructorName: string;
  instructorId: string;

  createdAt: string;
  updatedAt: string;

  progressPercentage: number;
}

export interface ReviewCourseCommand {
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
  description: string;
  image: File; // Tương ứng với IFormFile trong frontend là File
  promoVideo: File; // Tương ứng với IFormFile
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

export interface CourseQueryCriteria extends BaseQueryCriteria<CourseOrderableFields> {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
  level?: string;
  durationInSeconds?: number;
  language?: string;
  sectionCount?: number;
  status?: CourseStatus;
}

export type CourseOrderableFields =
  | "createdAt"
  | "updatedAt"
  | "averateRating"
  | "title"
  | "price"
  | "discountedPrice"
  | "durationInSeconds";

export interface Experience {
  organizationName: string;
  title: string;
  startDate: string;
  endDate?: string; // Optional if currently employed
}

export interface InstructorVm {
  id: string;
  name: string;
  avatarUrl: string | null;
  professionalTitle: string | null;
  about: string | null;
  averageRating: number;
  reviewCount: number;
  courseCount: number;
  studentCount: number;
}
