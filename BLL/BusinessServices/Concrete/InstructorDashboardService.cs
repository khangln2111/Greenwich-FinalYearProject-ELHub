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
            DashboardCourseStatusDistribution = await GetCourseStatusDistribution(currentUser.Id)
        };
    }

    public async Task<InstructorDashboardTrendsVm> GetInstructorDashboardTrends(
        DateTime startDate, DateTime endDate)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null)
            throw new UnauthorizedException("User is not authenticated.");

        var instructorId = currentUser.Id;

        // --------- Enrollment & Rating trends (1 query) ----------
        var enrollments = await context.Enrollments
            .Include(e => e.Review)
            .Include(e => e.Course)
            .Where(e => e.Course.InstructorId == instructorId
                        && e.CreatedAt.Date >= startDate.Date && e.CreatedAt.Date <= endDate.Date)
            .ToListAsync();

        var enrollmentTrend = enrollments
            .GroupBy(e => e.CreatedAt.Date)
            .Select(g => new InstructorDashboardTrendPointVm
            {
                Date = g.Key,
                Value = g.Count()
            })
            .OrderBy(x => x.Date)
            .ToList();

        var ratingTrend = enrollments
            .Where(e => e.Review != null)
            .GroupBy(e => e.CreatedAt.Date)
            .Select(g => new InstructorDashboardTrendPointVm
            {
                Date = g.Key,
                Value = (decimal)g.Average(e => e.Review!.Rating)
            })
            .OrderBy(x => x.Date)
            .ToList();

        // --------- Revenue & CoursesSold trends (from completed orders) ----------
        var orderItems = await context.OrderItems
            .Include(oi => oi.Order)
            .Include(oi => oi.Course)
            .Where(oi => oi.Course.InstructorId == instructorId
                         && oi.Order.Status == OrderStatus.Completed
                         && oi.Order.CreatedAt.Date >= startDate.Date
                         && oi.Order.CreatedAt.Date <= endDate.Date)
            .ToListAsync();

        var revenueTrend = orderItems
            .GroupBy(oi => oi.Order.CreatedAt.Date)
            .Select(g => new InstructorDashboardTrendPointVm
            {
                Date = g.Key,
                Value = g.Sum(oi => oi.DiscountedPrice * oi.Quantity)
            })
            .OrderBy(x => x.Date)
            .ToList();


        return new InstructorDashboardTrendsVm
        {
            RevenueTrend = revenueTrend,
            EnrollmentTrend = enrollmentTrend,
            RatingTrend = ratingTrend
        };
    }


    public async Task<List<InstructorDashboardRevenueSalesVm>> GetInstructorRevenueSales(
        DateTime startDate, DateTime endDate)
    {
        var currentUser = currentUserUtility.GetCurrentUser();

        if (currentUser == null)
            throw new UnauthorizedException("User is not authenticated.");

        var trend = await context.OrderItems
            .Include(oi => oi.Order)
            .Include(oi => oi.Course)
            .Where(oi => oi.Course.InstructorId == currentUser.Id
                         && oi.Order.Status == OrderStatus.Completed
                         && oi.Order.CreatedAt >= startDate && oi.Order.CreatedAt <= endDate)
            .GroupBy(oi => oi.Order.CreatedAt.Date)
            .Select(g => new InstructorDashboardRevenueSalesVm
            {
                Date = g.Key,
                Revenue = g.Sum(x => x.DiscountedPrice),
                CoursesSold = g.Count()
            })
            .OrderBy(x => x.Date)
            .ToListAsync();

        return trend;
    }


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
            .SumAsync(oi => (decimal?)oi.DiscountedPrice * oi.Quantity) ?? 0;

        var revenueThisWeek = await context.OrderItems
            .Include(oi => oi.Order)
            .Include(oi => oi.Course)
            .Where(oi => oi.Order.Status == OrderStatus.Completed &&
                         oi.Course.InstructorId == instructorId &&
                         oi.Order.CreatedAt >= thisWeekStart)
            .SumAsync(oi => (decimal?)oi.DiscountedPrice * oi.Quantity) ?? 0;

        var revenueLastWeek = await context.OrderItems
            .Include(oi => oi.Order)
            .Include(oi => oi.Course)
            .Where(oi => oi.Order.Status == OrderStatus.Completed &&
                         oi.Course.InstructorId == instructorId &&
                         oi.Order.CreatedAt >= lastWeekStart && oi.Order.CreatedAt < lastWeekEnd)
            .SumAsync(oi => (decimal?)oi.DiscountedPrice * oi.Quantity) ?? 0;

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

    private async Task<List<InstructorDashboardTopCourseVm>> GetTopCourses(Guid instructorId)
    {
        return await context.Courses
            .Where(c => c.InstructorId == instructorId)
            .OrderByDescending(c => c.EnrollmentCount)
            .Take(5)
            .Select(c => new InstructorDashboardTopCourseVm
            {
                CourseId = c.Id,
                CourseTitle = c.Title,
                SoldCount = c.EnrollmentCount,
                Revenue = (double)(c.EnrollmentCount * c.DiscountedPrice)
            }).ToListAsync();
    }

    private async Task<List<InstructorDashboardRatingDistributionVm>> GetRatingDistribution(Guid instructorId)
    {
        var reviews = await context.Courses
            .Where(c => c.InstructorId == instructorId)
            .SelectMany(c => context.Reviews.Where(r => r.Enrollment.CourseId == c.Id))
            .ToListAsync();

        // Generate distribution for 1 to 5 stars
        var stars = Enumerable.Range(1, 5);

        // Create distribution based on reviews
        var distribution = stars
            .Select(s => new InstructorDashboardRatingDistributionVm
            {
                Star = s,
                Count = reviews.Count(r => r.Rating == s)
            })
            .ToList();

        return distribution;
    }

    private async Task<InstructorDashboardCourseStatusDistributionVm> GetCourseStatusDistribution(Guid instructorId)
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

        return new InstructorDashboardCourseStatusDistributionVm
        {
            Published = courseStatuses.FirstOrDefault(s => s.Status == CourseStatus.Published)?.Count ?? 0,
            Pending = courseStatuses.FirstOrDefault(s => s.Status == CourseStatus.Pending)?.Count ?? 0,
            Rejected = courseStatuses.FirstOrDefault(s => s.Status == CourseStatus.Rejected)?.Count ?? 0
        };
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