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

// --- Top Courses Table ---
public class InstructorTopCourseVm
{
    public Guid CourseId { get; set; }
    public required string CourseTitle { get; set; }
    public int SoldCount { get; set; }
    public double Revenue { get; set; }
}

// --- Sales Trend (AreaChart) ---
public class InstructorCourseSalesTrendVm
{
    public Guid CourseId { get; set; }
    public required string CourseTitle { get; set; }
    public DateTime Date { get; set; }
    public int SoldCount { get; set; }
}

// --- Revenue By Month (LineChart) ---
public class InstructorRevenueByMonthVm
{
    public int Year { get; set; }
    public int Month { get; set; }
    public decimal Revenue { get; set; }
}

// --- Rating Distribution (DonutChart) ---
public class InstructorRatingDistributionVm
{
    public int Star { get; set; } // 1-5
    public int Count { get; set; }
}

// --- Revenue vs SoldCount comparison ---
public class InstructorRevenueVsSoldVm
{
    public required string CourseTitle { get; set; }
    public double Revenue { get; set; }
    public int SoldCount { get; set; }
}

public class InstructorCourseStatusDistributionVm
{
    public int Published { get; set; }
    public int Pending { get; set; }
    public int Rejected { get; set; }
}

// --- Full Dashboard ViewModel ---
public class InstructorDashboardVm
{
    public required InstructorDashboardStatsVm Stats { get; set; }
    public required List<InstructorTopCourseVm> TopCourses { get; set; }
    public required List<InstructorRatingDistributionVm> RatingDistribution { get; set; }
    public required List<InstructorRevenueVsSoldVm> RevenueVsSoldComparison { get; set; }
    public required InstructorCourseStatusDistributionVm CourseStatusDistribution { get; set; }
}