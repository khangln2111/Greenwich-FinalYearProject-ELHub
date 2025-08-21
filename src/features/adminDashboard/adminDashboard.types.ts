// ================== Main type ==================
export interface AdminDashboardVm {
  stats: AdminStatsVm;
  topCourses: BestSellerCourseVm[];
  topInstructors: BestSellerInstructorVm[];
  courseStatusDistribution: CourseStatusDistributionVm;
  revenueByCategory: RevenueByCategoryVm[];
  revenueByMonth: RevenueByMonthVm[];
  instructorVerification: VerificationProgressVm;
  courseVerification: VerificationProgressVm;
}

// ================== Admin Stats ==================
export interface AdminStatsVm {
  totalPublishedCourses: number;
  publishedCoursesGrowth: number; // %

  pendingInstructorApplications: number;
  pendingInstructorApplicationsGrowth: number; // %

  totalCategories: number;

  totalUsers: number;
  usersGrowth: number; // %

  totalCoursesSold: number;
  coursesSoldGrowth: number; // %

  totalRevenue: number; // decimal -> number
  revenueGrowth: number; // %
}

// ================== Charts ==================
export interface BestSellerCourseVm {
  courseId: string;
  title: string;
  instructorName: string;
  soldCount: number;
  revenue: number;
}

export interface BestSellerInstructorVm {
  instructorId: string;
  instructorName: string;
  totalCoursesSold: number;
  totalRevenue: number;
}

export interface CourseStatusDistributionVm {
  published: number;
  pending: number;
  rejected: number;
}

export interface RevenueByCategoryVm {
  categoryName: string;
  revenue: number;
}

export interface RevenueByMonthVm {
  year: number;
  month: number;
  revenue: number;
}

export interface VerificationProgressVm {
  approved: number;
  pending: number;
  percentageApproved: number; // computed ở backend => number
}
