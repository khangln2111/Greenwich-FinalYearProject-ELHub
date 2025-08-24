namespace BLL.DTOs.UserDashboardDTOs;

public class UserDashboardStatsVm
{
    public int TotalEnrolledCourses { get; set; }
    public double TotalEnrolledCoursesGrowth { get; set; }

    public int TotalSentGifts { get; set; }
    public double TotalSentGiftsGrowth { get; set; }

    public int TotalOrders { get; set; }
    public double TotalOrdersGrowth { get; set; }

    public decimal TotalSpent { get; set; }
    public double TotalSpentGrowth { get; set; }

    public int TotalInventoryItems { get; set; }
    public double TotalInventoryItemsGrowth { get; set; }

    public double TotalLearningSeconds { get; set; }
    public double TotalLearningSecondsGrowth { get; set; }

    public int TotalCompletedLectures { get; set; }
    public double TotalCompletedLecturesGrowth { get; set; }
}

public class UserDashboardRecentCourseProgressVm
{
    public Guid CourseId { get; set; }
    public required string CourseTitle { get; set; }
    public double CompletionPercent { get; set; }
    public int CompletedLectures { get; set; }
    public int TotalLectures { get; set; }
}

public class UserDashboardInfoByCategoryVm
{
    public required string CategoryName { get; set; }
    public int EnrolledCourses { get; set; }
    public double AverageCompletionPercent { get; set; }
    public decimal TotalSpent { get; set; }
}

public class UserDashboardCourseConversionVm
{
    public int PurchasedCourses { get; set; }
    public int EnrolledCourses { get; set; }
    public int CompletedCourses { get; set; }
}

public class UserDashboardReviewDistributionVm
{
    public int Stars { get; set; }
    public int Count { get; set; }
}

public class UserDashboardCoursesByLevelVm
{
    public required string Level { get; set; }
    public int Count { get; set; }
}

public class UserDashboardVm
{
    public required UserDashboardStatsVm Stats { get; set; }
    public required double OverallCompletionPercent { get; set; }
    public required List<UserDashboardRecentCourseProgressVm> RecentCoursesProgress { get; set; }
    public required List<UserDashboardInfoByCategoryVm> InfoByCategory { get; set; }
    public required UserDashboardCourseConversionVm CourseConversion { get; set; }
    public required List<UserDashboardRecentCourseProgressVm> TopCoursesByProgress { get; set; }
    public required List<UserDashboardReviewDistributionVm> ReviewDistribution { get; set; }
    public required List<UserDashboardCoursesByLevelVm> CoursesByLevel { get; set; }
}