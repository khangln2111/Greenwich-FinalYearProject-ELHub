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
            CourseStatusDistribution = await GetCourseDistributionByStatus(currentUser.Id),
            CoursesInfoByCategory = await GetCoursesInfoByCategory(currentUser.Id)
        };
    }


    private async Task<List<InstructorDashboardCoursesInfoByCategoryVm>> GetCoursesInfoByCategory(Guid instructorId)
    {
        var courses = await context.Courses
            .Where(c => c.InstructorId == instructorId)
            .Include(c => c.Category)
            .Include(c => c.Enrollments)
            .Include(c => c.OrderItems)
            .ThenInclude(oi => oi.Order)
            .ToListAsync();

        var grouped = courses
            .GroupBy(c => c.Category.Name)
            .Select(g => new InstructorDashboardCoursesInfoByCategoryVm
            {
                CategoryName = g.Key,
                CoursesCount = g.Count(),
                CoursesSoldCount = g.Sum(c => c.OrderItems.Count),
                Revenue = g.Sum(c => g.Sum(c => c.OrderItems
                    .Where(oi => oi.Order.Status == OrderStatus.Completed)
                    .Sum(oi => (decimal?)oi.DiscountedPrice * oi.Quantity) ?? 0))
            })
            .OrderByDescending(c => c.Revenue)
            .ToList();

        return grouped;
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

        var ratingCount = await context.Reviews
            .Include(r => r.Enrollment)
            .ThenInclude(e => e.Course)
            .Where(r => r.Enrollment.Course.InstructorId == instructorId)
            .CountAsync();

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
            RatingCount = ratingCount,

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

    private async Task<InstructorDashboardCourseDistributionByStatusVm> GetCourseDistributionByStatus(Guid instructorId)
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

        return new InstructorDashboardCourseDistributionByStatusVm
        {
            Published = courseStatuses.FirstOrDefault(s => s.Status == CourseStatus.Published)?.Count ?? 0,
            Pending = courseStatuses.FirstOrDefault(s => s.Status == CourseStatus.Pending)?.Count ?? 0,
            Rejected = courseStatuses.FirstOrDefault(s => s.Status == CourseStatus.Rejected)?.Count ?? 0,
            Draft = courseStatuses.FirstOrDefault(s => s.Status == CourseStatus.Draft)?.Count ?? 0,
            Archived = courseStatuses.FirstOrDefault(s => s.Status == CourseStatus.Archived)?.Count ?? 0
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