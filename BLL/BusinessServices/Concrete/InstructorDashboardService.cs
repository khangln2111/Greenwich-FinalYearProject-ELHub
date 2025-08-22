using BLL.BusinessServices.Abstract;
using BLL.DTOs.InstructorDashboardDTOs;
using BLL.Exceptions;
using DAL.Data;
using DAL.Data.Enums;
using DAL.Utilities.CurrentUserUtility;
using Microsoft.EntityFrameworkCore;

namespace BLL.BusinessServices.Concrete;

public class InstructorDashboardService(
    ApplicationDbContext context,
    ICurrentUserUtility currentUserUtility) : IInstructorDashboardService
{
    // ---------------- PUBLIC ----------------

    public async Task<InstructorDashboardVm> GetDashboard()
    {
        var currentUser = currentUserUtility.GetCurrentUser();

        if (currentUser == null)
            throw new UnauthorizedException("User is not authenticated.");


        return new InstructorDashboardVm
        {
            Stats = await GetStats(currentUser.Id),
            TopCourses = await GetTopCourses(currentUser.Id),
            RatingDistribution = await GetRatingDistribution(currentUser.Id),
            CourseStatusDistribution = await GetCourseStatusDistribution(currentUser.Id),
            RevenueVsSoldComparison = null
        };
    }

    public async Task<List<InstructorCourseSalesTrendVm>> GetSalesTrendByDateRange(DateTime startDate, DateTime endDate)
    {
        var currentUser = currentUserUtility.GetCurrentUser();

        if (currentUser == null)
            throw new UnauthorizedException("User is not authenticated.");

        var topCourseIds = await context.Courses
            .Where(c => c.InstructorId == currentUser.Id)
            .OrderByDescending(c => c.EnrollmentCount * c.DiscountedPrice)
            .Take(5)
            .Select(c => c.Id)
            .ToListAsync();

        return await context.Enrollments
            .Include(e => e.Course)
            .Where(e => topCourseIds.Contains(e.CourseId)
                        && e.CreatedAt >= startDate && e.CreatedAt <= endDate)
            .GroupBy(e => new { e.CourseId, e.CreatedAt.Date })
            .Select(g => new InstructorCourseSalesTrendVm
            {
                CourseId = g.Key.CourseId,
                CourseTitle = g.First().Course.Title,
                Date = g.Key.Date,
                SoldCount = g.Count()
            })
            .ToListAsync();
    }

    // ---------------- PRIVATE ----------------

    private async Task<InstructorDashboardStatsVm> GetStats(Guid instructorId)
    {
        var now = DateTime.Now;
        var thisWeekStart = now.AddDays(-7);
        var lastWeekStart = now.AddDays(-14);
        var lastWeekEnd = now.AddDays(-7);

        var totalCourses = await context.Courses
            .CountAsync(c => c.InstructorId == instructorId);

        var coursesThisWeek = await context.Courses
            .CountAsync(c => c.InstructorId == instructorId && c.CreatedAt >= thisWeekStart);

        var coursesLastWeek = await context.Courses
            .CountAsync(c => c.InstructorId == instructorId &&
                             c.CreatedAt >= lastWeekStart && c.CreatedAt < lastWeekEnd);

        var totalEnrollments = await context.Enrollments
            .Include(e => e.Course)
            .CountAsync(e => e.Course.InstructorId == instructorId);

        var enrollmentsThisWeek = await context.Enrollments
            .Include(e => e.Course)
            .CountAsync(e => e.Course.InstructorId == instructorId && e.CreatedAt >= thisWeekStart);

        var enrollmentsLastWeek = await context.Enrollments
            .Include(e => e.Course)
            .CountAsync(e => e.Course.InstructorId == instructorId &&
                             e.CreatedAt >= lastWeekStart && e.CreatedAt < lastWeekEnd);

        var totalCoursesSold = await context.OrderItems
            .Include(oi => oi.Order)
            .Include(oi => oi.Course)
            .Where(oi => oi.Order.Status == OrderStatus.Completed &&
                         oi.Course.InstructorId == instructorId)
            .SumAsync(oi => (int?)oi.Quantity) ?? 0;

        var coursesSoldThisWeek = await context.OrderItems
            .Include(oi => oi.Order)
            .Include(oi => oi.Course)
            .Where(oi => oi.Order.Status == OrderStatus.Completed &&
                         oi.Course.InstructorId == instructorId &&
                         oi.Order.CreatedAt >= thisWeekStart)
            .SumAsync(oi => (int?)oi.Quantity) ?? 0;

        var coursesSoldLastWeek = await context.OrderItems
            .Include(oi => oi.Order)
            .Include(oi => oi.Course)
            .Where(oi => oi.Order.Status == OrderStatus.Completed &&
                         oi.Course.InstructorId == instructorId &&
                         oi.Order.CreatedAt >= lastWeekStart && oi.Order.CreatedAt < lastWeekEnd)
            .SumAsync(oi => (int?)oi.Quantity) ?? 0;

        var totalRevenue = await context.OrderItems
            .Include(oi => oi.Order)
            .Include(oi => oi.Course)
            .Where(oi => oi.Order.Status == OrderStatus.Completed &&
                         oi.Course.InstructorId == instructorId)
            .SumAsync(oi => (decimal?)oi.Price * oi.Quantity) ?? 0;

        var revenueThisWeek = await context.OrderItems
            .Include(oi => oi.Order)
            .Include(oi => oi.Course)
            .Where(oi => oi.Order.Status == OrderStatus.Completed &&
                         oi.Course.InstructorId == instructorId &&
                         oi.Order.CreatedAt >= thisWeekStart)
            .SumAsync(oi => (decimal?)oi.Price * oi.Quantity) ?? 0;

        var revenueLastWeek = await context.OrderItems
            .Include(oi => oi.Order)
            .Include(oi => oi.Course)
            .Where(oi => oi.Order.Status == OrderStatus.Completed &&
                         oi.Course.InstructorId == instructorId &&
                         oi.Order.CreatedAt >= lastWeekStart && oi.Order.CreatedAt < lastWeekEnd)
            .SumAsync(oi => (decimal?)oi.Price * oi.Quantity) ?? 0;

        var totalAverageRating = await context.Enrollments
            .Include(e => e.Course)
            .Where(e => e.Course.InstructorId == instructorId && e.Review != null)
            .Select(e => (double?)e.Review!.Rating)
            .AverageAsync() ?? 0;

        var thisWeekAvgRating = await context.Enrollments
            .Include(e => e.Course)
            .Where(e => e.Course.InstructorId == instructorId && e.Review != null &&
                        e.Review.CreatedAt >= thisWeekStart)
            .Select(e => (double?)e.Review!.Rating)
            .AverageAsync() ?? 0;

        var lastWeekAvgRating = await context.Enrollments
            .Include(e => e.Course)
            .Where(e => e.Course.InstructorId == instructorId && e.Review != null &&
                        e.Review.CreatedAt >= lastWeekStart && e.Review.CreatedAt < lastWeekEnd)
            .Select(e => (double?)e.Review!.Rating)
            .AverageAsync() ?? 0;

        var balance = await context.Users
            .Where(u => u.Id == instructorId)
            .Select(u => (decimal?)u.Balance)
            .FirstOrDefaultAsync() ?? 0m;

        return new InstructorDashboardStatsVm
        {
            TotalPublishedCourses = totalCourses,
            TotalEnrollments = totalEnrollments,
            TotalCoursesSold = totalCoursesSold,
            TotalRevenue = totalRevenue,
            AverageRating = totalAverageRating,

            PublishedCoursesGrowth = CalcGrowth(coursesLastWeek,
                coursesThisWeek),
            EnrollmentsGrowth = CalcGrowth(enrollmentsLastWeek,
                enrollmentsThisWeek),
            CoursesSoldGrowth = CalcGrowth(coursesSoldLastWeek,
                coursesSoldThisWeek),
            RevenueGrowth = CalcGrowth(revenueLastWeek,
                revenueThisWeek),
            AverageRatingGrowth = CalcGrowth((decimal)lastWeekAvgRating,
                (decimal)thisWeekAvgRating),
            CurrentBalance = balance
        };
    }

    private async Task<List<InstructorTopCourseVm>> GetTopCourses(Guid instructorId)
    {
        return await context.Courses
            .Where(c => c.InstructorId == instructorId)
            .OrderByDescending(c => c.EnrollmentCount * c.DiscountedPrice)
            .Take(5)
            .Select(c => new InstructorTopCourseVm
            {
                CourseId = c.Id,
                CourseTitle = c.Title,
                SoldCount = c.EnrollmentCount,
                Revenue = (double)(c.EnrollmentCount * c.DiscountedPrice)
            }).ToListAsync();
    }

    private async Task<List<InstructorRatingDistributionVm>> GetRatingDistribution(Guid instructorId)
    {
        var reviews = await context.Courses
            .Where(c => c.InstructorId == instructorId)
            .SelectMany(c => context.Reviews.Where(r => r.Enrollment.CourseId == c.Id))
            .ToListAsync();

        // Generate distribution for 1 to 5 stars
        var stars = Enumerable.Range(1, 5);

        // Create distribution based on reviews
        var distribution = stars
            .Select(s => new InstructorRatingDistributionVm
            {
                Star = s,
                Count = reviews.Count(r => r.Rating == s)
            })
            .ToList();

        return distribution;
    }

    private async Task<InstructorCourseStatusDistributionVm> GetCourseStatusDistribution(Guid instructorId)
    {
        var courseStatuses = await context.Courses
            .Where(c => c.InstructorId == instructorId)
            .GroupBy(c => c.Status)
            .Select(g => new
            {
                Status = g.Key,
                Count = g.Count()
            })
            .ToListAsync();

        return new InstructorCourseStatusDistributionVm
        {
            Published = courseStatuses.FirstOrDefault(s => s.Status == CourseStatus.Published)?.Count ?? 0,
            Pending = courseStatuses.FirstOrDefault(s => s.Status == CourseStatus.Pending)?.Count ?? 0,
            Rejected = courseStatuses.FirstOrDefault(s => s.Status == CourseStatus.Rejected)?.Count ?? 0
        };
    }

    private async Task<List<InstructorCourseSalesTrendVm>> GetSalesTrend(Guid instructorId, List<Guid> courseIds)
    {
        var startDate = DateTime.Now.AddMonths(-1);
        var endDate = DateTime.Now;

        return await context.Enrollments
            .Include(e => e.Course)
            .Where(e => courseIds.Contains(e.CourseId)
                        && e.Course.InstructorId == instructorId
                        && e.CreatedAt >= startDate && e.CreatedAt <= endDate)
            .GroupBy(e => new { e.CourseId, e.CreatedAt.Date })
            .Select(g => new InstructorCourseSalesTrendVm
            {
                CourseId = g.Key.CourseId,
                CourseTitle = g.First().Course.Title,
                Date = g.Key.Date,
                SoldCount = g.Count()
            })
            .ToListAsync();
    }

    private async Task<List<InstructorRevenueByMonthVm>> GetRevenueByMonth(Guid instructorId)
    {
        return await context.OrderItems
            .Include(oi => oi.Course)
            .Include(oi => oi.Order)
            .Where(oi => oi.Course.InstructorId == instructorId && oi.Order.Status == OrderStatus.Completed)
            .GroupBy(oi => new { oi.Order.CreatedAt.Year, oi.Order.CreatedAt.Month })
            .Select(g => new InstructorRevenueByMonthVm
            {
                Year = g.Key.Year,
                Month = g.Key.Month,
                Revenue = g.Sum(oi => oi.DiscountedPrice * oi.Quantity)
            })
            .OrderBy(x => x.Year).ThenBy(x => x.Month)
            .ToListAsync();
    }


    private double CalcGrowth(int lastWeekValue, int currentValue)
    {
        if (lastWeekValue == 0) return currentValue > 0 ? 100 : 0;
        return Math.Round((double)(currentValue - lastWeekValue) / lastWeekValue * 100, 2);
    }

    private double CalcGrowth(decimal lastWeekValue, decimal currentValue)
    {
        if (lastWeekValue == 0) return currentValue > 0 ? 100 : 0;
        return Math.Round((double)(currentValue - lastWeekValue) / (double)lastWeekValue * 100, 2);
    }
}