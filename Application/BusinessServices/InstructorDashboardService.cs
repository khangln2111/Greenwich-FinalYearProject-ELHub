using Application.Common.Interfaces;
using Application.Common.Interfaces.ApplicationInterfaces;
using Application.Common.Interfaces.InfrastructureInterfaces;
using Application.DTOs.InstructorDashboardDTOs;
using Application.Exceptions;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Application.BusinessServices;

public class InstructorDashboardService(
    IApplicationDbContext context,
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
        var result = await context.Courses.AsNoTracking()
            .Where(c => c.InstructorId == instructorId)
            .GroupBy(c => c.Category.Name)
            .Select(g => new InstructorDashboardCoursesInfoByCategoryVm
            {
                CategoryName = g.Key,
                CoursesCount = g.Count(),
                CoursesSoldCount = g.Sum(c => c.OrderItems.Count),
                Revenue = g.Sum(c => c.OrderItems
                    .Where(oi => oi.Order.Status == OrderStatus.Completed)
                    .Sum(oi => (decimal?)oi.DiscountedPrice * oi.Quantity) ?? 0)
            })
            .OrderByDescending(c => c.Revenue)
            .Take(6)
            .ToListAsync();

        return result;
    }

    private async Task<InstructorDashboardStatsVm> GetStats(Guid instructorId)
    {
        var now = DateTime.Now;
        var thisWeekStart = now.AddDays(-7);
        var lastWeekStart = now.AddDays(-14);
        var lastWeekEnd = now.AddDays(-7);

        var totalCourses = await context.Courses.AsNoTracking()
            .CountAsync(c => c.InstructorId == instructorId);

        var coursesThisWeek = await context.Courses.AsNoTracking()
            .CountAsync(c => c.InstructorId == instructorId && c.CreatedAt >= thisWeekStart);

        var coursesLastWeek = await context.Courses.AsNoTracking()
            .CountAsync(c => c.InstructorId == instructorId &&
                             c.CreatedAt >= lastWeekStart && c.CreatedAt < lastWeekEnd);

        var totalEnrollments = await context.Enrollments.AsNoTracking()
            .Include(e => e.Course)
            .CountAsync(e => e.Course.InstructorId == instructorId);

        var enrollmentsThisWeek = await context.Enrollments.AsNoTracking()
            .Include(e => e.Course)
            .CountAsync(e => e.Course.InstructorId == instructorId && e.CreatedAt >= thisWeekStart);

        var enrollmentsLastWeek = await context.Enrollments.AsNoTracking()
            .Include(e => e.Course)
            .CountAsync(e => e.Course.InstructorId == instructorId &&
                             e.CreatedAt >= lastWeekStart && e.CreatedAt < lastWeekEnd);

        var totalCoursesSold = await context.OrderItems.AsNoTracking()
            .Include(oi => oi.Order)
            .Include(oi => oi.Course)
            .Where(oi => oi.Order.Status == OrderStatus.Completed &&
                         oi.Course.InstructorId == instructorId)
            .SumAsync(oi => (int?)oi.Quantity) ?? 0;

        var coursesSoldThisWeek = await context.OrderItems.AsNoTracking()
            .Include(oi => oi.Order)
            .Include(oi => oi.Course)
            .Where(oi => oi.Order.Status == OrderStatus.Completed &&
                         oi.Course.InstructorId == instructorId &&
                         oi.Order.CreatedAt >= thisWeekStart)
            .SumAsync(oi => (int?)oi.Quantity) ?? 0;

        var coursesSoldLastWeek = await context.OrderItems.AsNoTracking()
            .Include(oi => oi.Order)
            .Include(oi => oi.Course)
            .Where(oi => oi.Order.Status == OrderStatus.Completed &&
                         oi.Course.InstructorId == instructorId &&
                         oi.Order.CreatedAt >= lastWeekStart && oi.Order.CreatedAt < lastWeekEnd)
            .SumAsync(oi => (int?)oi.Quantity) ?? 0;

        var totalRevenue = await context.OrderItems.AsNoTracking()
            .Include(oi => oi.Order)
            .Include(oi => oi.Course)
            .Where(oi => oi.Order.Status == OrderStatus.Completed &&
                         oi.Course.InstructorId == instructorId)
            .SumAsync(oi => (decimal?)oi.DiscountedPrice * oi.Quantity) ?? 0;

        var revenueThisWeek = await context.OrderItems.AsNoTracking()
            .Include(oi => oi.Order)
            .Include(oi => oi.Course)
            .Where(oi => oi.Order.Status == OrderStatus.Completed &&
                         oi.Course.InstructorId == instructorId &&
                         oi.Order.CreatedAt >= thisWeekStart)
            .SumAsync(oi => (decimal?)oi.DiscountedPrice * oi.Quantity) ?? 0;

        var revenueLastWeek = await context.OrderItems.AsNoTracking()
            .Include(oi => oi.Order)
            .Include(oi => oi.Course)
            .Where(oi => oi.Order.Status == OrderStatus.Completed &&
                         oi.Course.InstructorId == instructorId &&
                         oi.Order.CreatedAt >= lastWeekStart && oi.Order.CreatedAt < lastWeekEnd)
            .SumAsync(oi => (decimal?)oi.DiscountedPrice * oi.Quantity) ?? 0;


        var totalAverageRating = await context.Reviews.AsNoTracking()
            .Include(r => r.Enrollment)
            .ThenInclude(e => e.Course)
            .Where(r => r.Enrollment.Course.InstructorId == instructorId)
            .Select(r => (double?)r.Rating)
            .AverageAsync() ?? 0;

        var ratingCount = await context.Reviews.AsNoTracking()
            .Include(r => r.Enrollment)
            .ThenInclude(e => e.Course)
            .Where(r => r.Enrollment.Course.InstructorId == instructorId)
            .CountAsync();

        var thisWeekAvgRating = await context.Reviews.AsNoTracking()
            .Include(r => r.Enrollment)
            .ThenInclude(e => e.Course)
            .Where(r => r.Enrollment.Course.InstructorId == instructorId &&
                        r.CreatedAt >= thisWeekStart)
            .Select(r => (double?)r.Rating)
            .AverageAsync() ?? 0;

        var lastWeekAvgRating = await context.Reviews.AsNoTracking()
            .Include(r => r.Enrollment)
            .ThenInclude(e => e.Course)
            .Where(r => r.Enrollment.Course.InstructorId == instructorId &&
                        r.CreatedAt >= lastWeekStart && r.CreatedAt < lastWeekEnd)
            .Select(r => (double?)r.Rating)
            .AverageAsync() ?? 0;

        var balance = await context.Users.AsNoTracking()
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

            TotalPublishedCoursesGrowth = CalcGrowth(coursesLastWeek,
                coursesThisWeek),
            TotalEnrollmentsGrowth = CalcGrowth(enrollmentsLastWeek,
                enrollmentsThisWeek),
            TotalCoursesSoldGrowth = CalcGrowth(coursesSoldLastWeek,
                coursesSoldThisWeek),
            TotalRevenueGrowth = CalcGrowth(revenueLastWeek,
                revenueThisWeek),
            AverageRatingGrowth = CalcGrowth((decimal)lastWeekAvgRating,
                (decimal)thisWeekAvgRating),
            CurrentBalance = balance
        };
    }

    private async Task<List<InstructorDashboardTopCourseVm>> GetTopCourses(Guid instructorId)
    {
        return await context.Courses.AsNoTracking()
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
        var query = await context.Reviews.AsNoTracking()
            .Where(r => r.Enrollment.Course.InstructorId == instructorId)
            .GroupBy(r => r.Rating)
            .Select(g => new
            {
                Star = g.Key,
                Count = g.Count()
            })
            .ToListAsync();

        var distribution = Enumerable.Range(1, 5)
            .Select(s => new InstructorDashboardRatingDistributionVm
            {
                Star = s,
                Count = query.FirstOrDefault(x => x.Star == s)?.Count ?? 0
            })
            .ToList();

        return distribution;
    }

    private async Task<InstructorDashboardCourseDistributionByStatusVm> GetCourseDistributionByStatus(Guid instructorId)
    {
        return await context.Courses.AsNoTracking()
            .Where(c => c.InstructorId == instructorId)
            .GroupBy(c => 1)
            .Select(g => new InstructorDashboardCourseDistributionByStatusVm
            {
                Published = g.Count(c => c.Status == CourseStatus.Published),
                Pending = g.Count(c => c.Status == CourseStatus.Pending),
                Rejected = g.Count(c => c.Status == CourseStatus.Rejected),
                Draft = g.Count(c => c.Status == CourseStatus.Draft),
                Archived = g.Count(c => c.Status == CourseStatus.Archived)
            })
            .FirstOrDefaultAsync() ?? new InstructorDashboardCourseDistributionByStatusVm();
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