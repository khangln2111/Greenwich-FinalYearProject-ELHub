// --- Stats ---
export interface InstructorDashboardStatsVm {
  totalPublishedCourses: number;
  totalPublishedCoursesGrowth: number;

  totalRevenue: number;
  totalRevenueGrowth: number;

  totalCoursesSold: number;
  totalCoursesSoldGrowth: number;

  averageRating: number;
  ratingCount: number;
  averageRatingGrowth: number;

  totalEnrollments: number;
  totalEnrollmentsGrowth: number;

  currentBalance: number;
}

// --- Top Courses Table ---
export interface InstructorDashboardTopCourseVm {
  courseId: string; // Guid
  courseTitle: string;
  soldCount: number;
  revenue: number;
}

// --- Rating Distribution (DonutChart) ---
export interface InstructorDashboardRatingDistributionVm {
  star: number; // 1-5
  count: number;
}

// --- Course Status Distribution ---
export interface InstructorDashboardCourseDistributionByStatusVm {
  published: number;
  pending: number;
  rejected: number;
  draft: number;
  archived: number;
}

export interface InstructorDashboardCoursesInfoByCategoryVm {
  categoryName: string;
  coursesCount: number;
  coursesSoldCount: number;
  revenue: number;
}

// --- Full Dashboard ViewModel ---
export interface InstructorDashboardVm {
  stats: InstructorDashboardStatsVm;
  topCourses: InstructorDashboardTopCourseVm[];
  ratingDistribution: InstructorDashboardRatingDistributionVm[];
  courseStatusDistribution: InstructorDashboardCourseDistributionByStatusVm;
  coursesInfoByCategory: InstructorDashboardCoursesInfoByCategoryVm[];
}
