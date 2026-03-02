namespace Application.DTOs.AdminDashboardDTOs;

public class AdminDashboardStatsVm
{
    public required int TotalPublishedCourses { get; set; }
    public required double TotalPublishedCoursesGrowth { get; set; } // Growth percentage compared to the previous week

    public required int PendingInstructorApplications { get; set; }
    public required double PendingInstructorApplicationsGrowth { get; set; }

    public required int TotalInstructors { get; set; }
    public required double TotalInstructorsGrowth { get; set; }

    public required int TotalPendingCourses { get; set; }
    public required double TotalPendingCoursesGrowth { get; set; }

    public required double AverageCourseRating { get; set; }
    public required int RatingCount { get; set; }
    public required double AverageCourseRatingGrowth { get; set; }

    public required int TotalCategories { get; set; }

    public required int TotalUsers { get; set; }
    public required double TotalUsersGrowth { get; set; }

    public required int TotalCoursesSold { get; set; }
    public required double TotalCoursesSoldGrowth { get; set; }

    public required decimal TotalRevenue { get; set; }
    public required double TotalRevenueGrowth { get; set; }
}

// --- CHARTS ---

public class AdminDashboardCoursesInfoByCategoryVm
{
    public required string CategoryName { get; set; }
    public int CoursesCount { get; set; }
    public int CoursesSoldCount { get; set; }
    public decimal Revenue { get; set; }
}

public class AdminDashboardBestSellerCourseVm
{
    public Guid CourseId { get; set; }
    public required string Title { get; set; }
    public required string InstructorName { get; set; }
    public int SoldCount { get; set; }
    public decimal Revenue { get; set; }
}

public class AdminDashboardBestSellerInstructorVm
{
    public Guid InstructorId { get; set; }
    public required string InstructorName { get; set; }
    public int TotalCoursesSold { get; set; }
    public decimal TotalRevenue { get; set; }
}

public class AdminDashboardCourseDistributionByStatusVm
{
    public int Published { get; set; }
    public int Pending { get; set; }
    public int Rejected { get; set; }
    public int Draft { get; set; }
    public int Banned { get; set; }
}

public class AdminDashboardRatingDistributionVm
{
    public int Star { get; set; } // 1-5
    public int Count { get; set; }
}

public class AdminDashboardRevenueByCategoryVm
{
    public required string CategoryName { get; set; }
    public decimal Revenue { get; set; }
}

public class AdminDashboardVerificationProgressVm
{
    public int Approved { get; set; }
    public int Pending { get; set; }

    public double PercentageApproved =>
        Approved + Pending == 0 ? 0 : Math.Round((double)Approved / (Approved + Pending) * 100, 2);
}

// --- MAIN VIEW MODEL ---
public class AdminDashboardVm
{
    public required AdminDashboardStatsVm Stats { get; set; }
    public required List<AdminDashboardBestSellerCourseVm> TopCourses { get; set; }
    public required List<AdminDashboardBestSellerInstructorVm> TopInstructors { get; set; }
    public required AdminDashboardCourseDistributionByStatusVm CourseDistributionByStatus { get; set; }
    public required List<AdminDashboardRatingDistributionVm> RatingDistribution { get; set; }
    public required List<AdminDashboardCoursesInfoByCategoryVm> CoursesInfoByCategory { get; set; }
    public required AdminDashboardVerificationProgressVm InstructorVerification { get; set; }
    public required AdminDashboardVerificationProgressVm CourseVerification { get; set; }
}