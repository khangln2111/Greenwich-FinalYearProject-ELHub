// --- STATS ---

export interface AdminDashboardStatsVm {
  totalPublishedCourses: number;
  publishedCoursesGrowth: number;

  pendingInstructorApplications: number;
  pendingInstructorApplicationsGrowth: number;

  totalInstructors: number;
  instructorsGrowth: number;

  totalPendingCourses: number;
  pendingCoursesGrowth: number;

  averageCourseRating: number;
  ratingCount: number;
  averageCourseRatingGrowth: number;

  totalCategories: number;

  totalUsers: number;
  usersGrowth: number;

  totalCoursesSold: number;
  coursesSoldGrowth: number;

  totalRevenue: number;
  revenueGrowth: number;
}

// --- CHARTS ---

export interface AdminDashboardCoursesInfoByCategoryVm {
  categoryName: string;
  coursesCount: number;
  coursesSoldCount: number;
  revenue: number;
}

export interface AdminDashboardBestSellerCourseVm {
  courseId: string; // Guid -> string
  title: string;
  instructorName: string;
  soldCount: number;
  revenue: number;
}

export interface AdminDashboardBestSellerInstructorVm {
  instructorId: string; // Guid -> string
  instructorName: string;
  totalCoursesSold: number;
  totalRevenue: number;
}

export interface AdminDashboardCourseDistributionByStatusVm {
  published: number;
  pending: number;
  rejected: number;
}

export interface AdminDashboardRevenueByCategoryVm {
  categoryName: string;
  revenue: number;
}

export interface AdminDashboardVerificationProgressVm {
  approved: number;
  pending: number;
  percentageApproved: number;
}

export interface AdminDashboardRatingDistributionVm {
  star: number;
  count: number;
}

// --- MAIN VIEW MODEL ---
export interface AdminDashboardVm {
  stats: AdminDashboardStatsVm;
  topCourses: AdminDashboardBestSellerCourseVm[];
  topInstructors: AdminDashboardBestSellerInstructorVm[];
  courseDistributionByStatus: AdminDashboardCourseDistributionByStatusVm;
  revenueByCategory: AdminDashboardRevenueByCategoryVm[];
  ratingDistribution: AdminDashboardRatingDistributionVm[];
  coursesInfoByCategory: AdminDashboardCoursesInfoByCategoryVm[];
  instructorVerification: AdminDashboardVerificationProgressVm;
  courseVerification: AdminDashboardVerificationProgressVm;
}
