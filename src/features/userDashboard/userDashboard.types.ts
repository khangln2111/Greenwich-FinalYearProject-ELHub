export interface UserDashboardStatsVm {
  totalEnrolledCourses: number;
  totalEnrolledCoursesGrowth: number;

  totalSentGifts: number;
  totalSentGiftsGrowth: number;

  totalOrders: number;
  totalOrdersGrowth: number;

  totalSpent: number;
  totalSpentGrowth: number;

  totalInventoryItems: number;
  totalInventoryItemsGrowth: number;

  totalLearningSeconds: number;
  totalLearningSecondsGrowth: number;

  totalCompletedLectures: number;
  totalCompletedLecturesGrowth: number;
}

export interface UserDashboardRecentCourseProgressVm {
  courseId: string; // Guid => string
  courseTitle: string;
  completionPercent: number;
  completedLectures: number;
  totalLectures: number;
}

export interface UserDashboardInfoByCategoryVm {
  categoryName: string;
  enrolledCoursesCount: number;
  completedCoursesCount: number;
  purchasedCoursesQuantityCount: number;
  totalSpent: number;
}

export interface UserDashboardCourseConversionVm {
  purchasedCoursesQuantity: number;
  purchasedCoursesUnique: number;
  enrolledCourses: number;
  completedCourses: number;
}

export interface UserDashboardReviewDistributionVm {
  star: number;
  count: number;
}

export interface UserDashboardCoursesByLevelVm {
  level: string;
  count: number;
}

export interface UserDashboardVm {
  stats: UserDashboardStatsVm;
  overallCompletionPercent: number;
  recentCoursesProgress: UserDashboardRecentCourseProgressVm[];
  infoByCategory: UserDashboardInfoByCategoryVm[];
  courseConversion: UserDashboardCourseConversionVm;
  topCoursesByProgress: UserDashboardRecentCourseProgressVm[];
  reviewDistribution: UserDashboardReviewDistributionVm[];
  coursesByLevel: UserDashboardCoursesByLevelVm[];
}
