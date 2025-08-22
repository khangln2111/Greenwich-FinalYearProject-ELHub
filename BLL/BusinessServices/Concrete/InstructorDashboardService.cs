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

        var stats = await GetStats(currentUser.Id);
        var topCourses = await GetTopCourses(currentUser.Id);
        var ratingDistribution = await GetRatingDistribution(currentUser.Id);

        var revenueVsSold = topCourses
            .OrderByDescending(c => c.SoldCount)
            .Take(5)
            .Select(c => new InstructorRevenueVsSoldVm
            {
                CourseTitle = c.CourseTitle,
                Revenue = c.Revenue,
                SoldCount = c.SoldCount
            }).ToList();

        stats.CurrentAccountBalance = await GetAccountBalance(currentUser.Id);

        var courseStatusDistribution = await GetCourseStatusDistribution(currentUser.Id);
        return new InstructorDashboardVm
        {
            Stats = stats,
            TopCourses = topCourses,
            RatingDistribution = ratingDistribution,
            RevenueVsSoldComparison = revenueVsSold,
            CourseStatusDistribution = courseStatusDistribution
        };
    }

    public async Task<List<InstructorCourseSalesTrendVm>> GetSalesTrendByDateRange(DateTime startDate, DateTime endDate)
    {
        var currentUser = currentUserUtility.GetCurrentUser();

        if (currentUser == null)
            throw new UnauthorizedException("User is not authenticated.");

        var topCourseIds = await context.Courses
            .Where(c => c.InstructorId == currentUser.Id)
            .OrderByDescending(c => c.EnrollmentCount * c.Price)
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
        var courses = await context.Courses.Where(c => c.InstructorId == instructorId).ToListAsync();
        var enrollments = await context.Enrollments
            .Include(e => e.Course)
            .Where(e => e.Course.InstructorId == instructorId)
            .ToListAsync();

        var totalRevenue = await context.OrderItems
            .Include(oi => oi.Course)
            .Include(oi => oi.Order)
            .Where(oi => oi.Course.InstructorId == instructorId && oi.Order.Status == OrderStatus.Completed)
            .SumAsync(oi => oi.Price * oi.Quantity);

        var totalCoursesSold = enrollments.Count;
        var totalPublishedCourses = courses.Count(c => c.Status == CourseStatus.Published);
        var avgRating = courses.Any() ? courses.Average(c => c.AverageRating) : 0;
        var totalEnrollments = enrollments.Count;

        return new InstructorDashboardStatsVm
        {
            TotalPublishedCourses = totalPublishedCourses,
            TotalRevenue = totalRevenue,
            CoursesSold = totalCoursesSold,
            AverageRating = avgRating,
            TotalEnrollments = totalEnrollments,
            PublishedCoursesGrowth = 0,
            RevenueGrowth = 0,
            CoursesSoldGrowth = 0,
            AverageRatingGrowth = 0,
            TotalEnrollmentsGrowth = 0
        };
    }

    private async Task<List<InstructorTopCourseVm>> GetTopCourses(Guid instructorId)
    {
        return await context.Courses
            .Where(c => c.InstructorId == instructorId)
            .OrderByDescending(c => c.EnrollmentCount * c.Price)
            .Take(5)
            .Select(c => new InstructorTopCourseVm
            {
                CourseId = c.Id,
                CourseTitle = c.Title,
                SoldCount = c.EnrollmentCount,
                Revenue = (double)(c.EnrollmentCount * c.Price)
            }).ToListAsync();
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
                Revenue = g.Sum(oi => oi.Price * oi.Quantity)
            })
            .OrderBy(x => x.Year).ThenBy(x => x.Month)
            .ToListAsync();
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

    private async Task<decimal> GetAccountBalance(Guid userId)
    {
        var user = await context.Users.FindAsync(userId);
        return user?.Balance ?? 0;
    }
}