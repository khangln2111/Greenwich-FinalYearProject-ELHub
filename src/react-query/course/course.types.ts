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
  studentEnrollmentCount: number;
  lectureCount: number;
  sectionCount: number;
  durationInSeconds: number;
  categoryName: string;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface UpdateCourseRequest {
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
