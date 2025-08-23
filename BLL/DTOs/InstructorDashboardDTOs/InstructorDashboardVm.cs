namespace BLL.DTOs.InstructorDashboardDTOs;

// --- Stats ---
public class InstructorDashboardStatsVm
{
    public required int TotalPublishedCourses { get; set; }
    public required double PublishedCoursesGrowth { get; set; }

    public required decimal TotalRevenue { get; set; }
    public required double RevenueGrowth { get; set; }

    public required int TotalCoursesSold { get; set; }
    public required double CoursesSoldGrowth { get; set; }

    public required double AverageRating { get; set; }
    public required double AverageRatingGrowth { get; set; }

    public required int TotalEnrollments { get; set; }
    public required double EnrollmentsGrowth { get; set; }

    public required decimal CurrentBalance { get; set; }
}

public class InstructorDashboardTrendPointVm
{
    public DateTime Date { get; set; }
    public decimal Value { get; set; }
}

public class InstructorDashboardTrendsVm
{
    public required List<InstructorDashboardTrendPointVm> RevenueTrend { get; set; }
    public required List<InstructorDashboardTrendPointVm> EnrollmentTrend { get; set; }
    public required List<InstructorDashboardTrendPointVm> RatingTrend { get; set; }
}

public class InstructorDashboardRevenueSalesVm
{
    public DateTime Date { get; set; }
    public decimal Revenue { get; set; }
    public int CoursesSold { get; set; }
}

// --- Top Courses Table ---
public class InstructorDashboardTopCourseVm
{
    public Guid CourseId { get; set; }
    public required string CourseTitle { get; set; }
    public int SoldCount { get; set; }
    public double Revenue { get; set; }
}

// --- Rating Distribution (DonutChart) ---
public class InstructorDashboardRatingDistributionVm
{
    public int Star { get; set; } // 1-5
    public int Count { get; set; }
}

public class InstructorDashboardCourseStatusDistributionVm
{
    public int Published { get; set; }
    public int Pending { get; set; }
    public int Rejected { get; set; }
}

// --- Full Dashboard ViewModel ---
public class InstructorDashboardVm
{
    public required InstructorDashboardStatsVm Stats { get; set; }
    public required List<InstructorDashboardTopCourseVm> TopCourses { get; set; }
    public required List<InstructorDashboardRatingDistributionVm> RatingDistribution { get; set; }
    public required InstructorDashboardCourseStatusDistributionVm DashboardCourseStatusDistribution { get; set; }
}