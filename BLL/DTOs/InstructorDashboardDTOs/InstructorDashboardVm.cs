namespace BLL.DTOs.InstructorDashboardDTOs;

// --- Stats ---
public class InstructorDashboardStatsVm
{
    public required int TotalPublishedCourses { get; set; }
    public required double TotalPublishedCoursesGrowth { get; set; }

    public required decimal TotalRevenue { get; set; }
    public required double TotalRevenueGrowth { get; set; }

    public required int TotalCoursesSold { get; set; }
    public required double TotalCoursesSoldGrowth { get; set; }

    public required double AverageRating { get; set; }
    public required int RatingCount { get; set; }
    public required double AverageRatingGrowth { get; set; }

    public required int TotalEnrollments { get; set; }
    public required double TotalEnrollmentsGrowth { get; set; }

    public required decimal CurrentBalance { get; set; }
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

public class InstructorDashboardCourseDistributionByStatusVm
{
    public int Published { get; set; }
    public int Pending { get; set; }
    public int Rejected { get; set; }
    public int Draft { get; set; }
    public int Archived { get; set; }
}

public class InstructorDashboardCoursesInfoByCategoryVm
{
    public required string CategoryName { get; set; }
    public int CoursesCount { get; set; }
    public int CoursesSoldCount { get; set; }
    public decimal Revenue { get; set; }
}

// --- Full Dashboard ViewModel --- 
public class InstructorDashboardVm
{
    public required InstructorDashboardStatsVm Stats { get; set; }
    public required List<InstructorDashboardTopCourseVm> TopCourses { get; set; }
    public required List<InstructorDashboardRatingDistributionVm> RatingDistribution { get; set; }
    public required InstructorDashboardCourseDistributionByStatusVm CourseStatusDistribution { get; set; }
    public required List<InstructorDashboardCoursesInfoByCategoryVm> CoursesInfoByCategory { get; set; }
}