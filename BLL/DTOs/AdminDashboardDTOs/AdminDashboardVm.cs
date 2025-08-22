namespace BLL.DTOs.AdminDashboardDTOs;

public class AdminStatsVm
{
    public required int TotalPublishedCourses { get; set; }
    public required double PublishedCoursesGrowth { get; set; } // Growth percentage compared to the previous week

    public required int PendingInstructorApplications { get; set; }
    public required double PendingInstructorApplicationsGrowth { get; set; }

    public required int TotalCategories { get; set; }

    public required int TotalUsers { get; set; }
    public required double UsersGrowth { get; set; }

    public required int TotalCoursesSold { get; set; }
    public required double CoursesSoldGrowth { get; set; }

    public required decimal TotalRevenue { get; set; }
    public required double RevenueGrowth { get; set; }
}

// --- CHARTS ---
public class BestSellerCourseVm
{
    public Guid CourseId { get; set; }
    public required string Title { get; set; }
    public required string InstructorName { get; set; }
    public int SoldCount { get; set; }
    public decimal Revenue { get; set; }
}

public class BestSellerInstructorVm
{
    public Guid InstructorId { get; set; }
    public required string InstructorName { get; set; }
    public int TotalCoursesSold { get; set; }
    public decimal TotalRevenue { get; set; }
}

public class CourseStatusDistributionVm
{
    public int Published { get; set; }
    public int Pending { get; set; }
    public int Rejected { get; set; }
}

public class RevenueByCategoryVm
{
    public required string CategoryName { get; set; }
    public decimal Revenue { get; set; }
}

public class RevenueByMonthVm
{
    public int Year { get; set; }
    public int Month { get; set; }
    public decimal Revenue { get; set; }
}

public class VerificationProgressVm
{
    public int Approved { get; set; }
    public int Pending { get; set; }

    public double PercentageApproved =>
        Approved + Pending == 0 ? 0 : Math.Round((double)Approved / (Approved + Pending) * 100, 2);
}

// --- MAIN VIEW MODEL ---
public class AdminDashboardVm
{
    public required AdminStatsVm Stats { get; set; }
    public required List<BestSellerCourseVm> TopCourses { get; set; }
    public required List<BestSellerInstructorVm> TopInstructors { get; set; }
    public required CourseStatusDistributionVm CourseStatusDistribution { get; set; }
    public required List<RevenueByCategoryVm> RevenueByCategory { get; set; }
    public required List<RevenueByMonthVm> RevenueByMonth { get; set; }
    public required VerificationProgressVm InstructorVerification { get; set; }
    public required VerificationProgressVm CourseVerification { get; set; }
}