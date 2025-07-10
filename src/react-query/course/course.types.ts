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

  createdAt: string | null;
  updatedAt: string | null;

  enrollmentCount: number;
  reviewCount: number;
  averageRating: number;

  instructorId: string;
  instructorName: string;
  instructorAvatarUrl: string | null;
  instructorProfessionalTitle: string | null;
}

export interface CourseDetailVm {
  id: string;

  title: string;
  description: string;

  sectionCount: number;
  lectureCount: number;

  sections: SectionVm[] | null;

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

  createdAt: string;
  updatedAt: string;

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

export interface CourseQueryCriteria {
  page?: number;
  pageSize?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
  level?: string;
  durationInSeconds?: number;
  language?: string;
  sectionCount?: number;
  orderBy?: {
    field:
      | "createdAt"
      | "updatedAt"
      | "averateRating"
      | "name"
      | "price"
      | "discountedPrice"
      | "durationInSeconds";
    direction: "asc" | "desc";
  };
}

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
