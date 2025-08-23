// --- Stats ---
export interface InstructorDashboardStatsVm {
  totalPublishedCourses: number;
  publishedCoursesGrowth: number;

  totalRevenue: number;
  revenueGrowth: number;

  totalCoursesSold: number;
  coursesSoldGrowth: number;

  averageRating: number;
  averageRatingGrowth: number;

  totalEnrollments: number;
  enrollmentsGrowth: number;

  currentBalance: number;
}

// --- Trend Point ---
export interface InstructorDashboardTrendPointVm {
  date: string; // ISO string
  value: number | null;
}

// --- Trends (Line Charts) ---
export interface InstructorDashboardTrendsVm {
  revenueTrend: InstructorDashboardTrendPointVm[];
  enrollmentTrend: InstructorDashboardTrendPointVm[];
  ratingTrend: InstructorDashboardTrendPointVm[];
}

// --- Composite Trend (Revenue + CoursesSold) ---
export interface InstructorDashboardRevenueSalesVm {
  date: string; // ISO string
  revenue: number;
  coursesSold: number;
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
export interface InstructorDashboardCourseStatusDistributionVm {
  published: number;
  pending: number;
  rejected: number;
  draft: number;
  archived: number;
}

// --- Full Dashboard ViewModel ---
export interface InstructorDashboardVm {
  stats: InstructorDashboardStatsVm;
  topCourses: InstructorDashboardTopCourseVm[];
  ratingDistribution: InstructorDashboardRatingDistributionVm[];
  courseStatusDistribution: InstructorDashboardCourseStatusDistributionVm;
}
