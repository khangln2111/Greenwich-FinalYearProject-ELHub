import { SectionVm } from "../section/section.types";

// course.type.ts
export enum CourseStatus {
  Draft = "Draft",
  Published = "Published",
  Pending = "Pending",
  Archived = "Archived",
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
  rating: number;
  ratingCount: number;
  discountPercentage: number;
  discountedPrice: number;
  language: string | null;
  level: CourseLevel;
  learningOutcomes: string[] | null;
  prerequisites: string[] | null;
  studentEnrollmentCount: number;
  lectureCount: number;
  sectionCount: number;
  durationInSeconds: number;
  categoryName: string;
  createdAt: string | null;
  updatedAt: string | null;
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
  instructorName: string;
  instructorId: string;

  createdAt: string; // or Date, depending on how you parse it
  updatedAt: string; // or Date
}

export interface CreateCourseCommand {
  categoryId: string; // Guid tương ứng với string trong TS
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
}
