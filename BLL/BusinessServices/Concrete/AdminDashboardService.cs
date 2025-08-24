using BLL.BusinessServices.Abstract;
using BLL.DTOs.AdminDashboardDTOs;
using DAL.Constants;
using DAL.Data;
using DAL.Data.Enums;
using Microsoft.EntityFrameworkCore;

namespace BLL.BusinessServices.Concrete;

public class AdminDashboardService(ApplicationDbContext context)
    : IAdminDashboardService
{
    public async Task<AdminDashboardVm> GetDashboard()
    {
        return new AdminDashboardVm
        {
            Stats = await GetStats(),
            TopCourses = await GetTopCoursesByCourseSold(),
            TopInstructors = await GetTopInstructorByRevenue(),
            CourseDistributionByStatus = await GetCourseStatusDistribution(),
            InstructorVerification = await GetInstructorVerification(),
            CourseVerification = await GetCourseVerification(),
            CoursesInfoByCategory = await GetCoursesInfoByCategory(),
            RatingDistribution = await GetRatingDistribution()
        };
    }


    private async Task<AdminDashboardStatsVm> GetStats()
    {
        var now = DateTime.Now;
        var thisWeekStart = now.AddDays(-7);
        var lastWeekStart = now.AddDays(-14);
        var lastWeekEnd = now.AddDays(-7);

        var totalCategories = await context.Categories.CountAsync();

        var publishedCoursesThisWeek =
            await context.Courses.CountAsync(c => c.Status == CourseStatus.Published && c.CreatedAt >= thisWeekStart);

        var publishedCoursesLastWeek =
            await context.Courses.CountAsync(c =>
                c.Status == CourseStatus.Published && c.CreatedAt >= lastWeekStart && c.CreatedAt < lastWeekEnd);

        var totalPublishedCourses = await context.Courses.CountAsync(c => c.Status == CourseStatus.Published);

        var pendingInstructorAppsThisWeek =
            await context.InstructorApplications.CountAsync(a =>
                a.Status == InstructorApplicationStatus.Pending && a.CreatedAt >= thisWeekStart);

        var pendingInstructorAppsLastWeek =
            await context.InstructorApplications.CountAsync(a =>
                a.Status == InstructorApplicationStatus.Pending &&
                a.CreatedAt >= lastWeekStart && a.CreatedAt < lastWeekEnd);

        var pendingInstructorApps = await context.InstructorApplications
            .CountAsync(a => a.Status == InstructorApplicationStatus.Pending);

        var usersThisWeek = await context.Users.CountAsync(u => u.CreatedAt >= thisWeekStart);
        var usersLastWeek = await context.Users.CountAsync(u =>
            u.CreatedAt >= lastWeekStart && u.CreatedAt < lastWeekEnd);

        var totalUsers = await context.Users.CountAsync();

        var coursesSoldThisWeek = await context.OrderItems
            .Where(oi => oi.Order.Status == OrderStatus.Completed
                         && oi.Order.CreatedAt >= thisWeekStart && oi.Order.CreatedAt <= now)
            .SumAsync(oi => oi.Quantity);

        var coursesSoldLastWeek = await context.OrderItems
            .Where(oi => oi.Order.Status == OrderStatus.Completed
                         && oi.Order.CreatedAt >= lastWeekStart && oi.Order.CreatedAt < lastWeekEnd)
            .SumAsync(oi => oi.Quantity);


        var totalCoursesSold = await context.OrderItems
            .Where(oi => oi.Order.Status == OrderStatus.Completed)
            .SumAsync(oi => oi.Quantity);

        var revenueThisWeek = await context.OrderItems
            .Where(oi => oi.Order.Status == OrderStatus.Completed && oi.Order.CreatedAt >= thisWeekStart)
            .SumAsync(oi => (decimal?)(oi.DiscountedPrice * oi.Quantity)) ?? 0;

        var revenueLastWeek = await context.OrderItems
            .Where(oi => oi.Order.Status == OrderStatus.Completed &&
                         oi.Order.CreatedAt >= lastWeekStart && oi.Order.CreatedAt < lastWeekEnd)
            .SumAsync(oi => (decimal?)(oi.DiscountedPrice * oi.Quantity)) ?? 0;

        var totalRevenue = await context.OrderItems
            .Where(oi => oi.Order.Status == OrderStatus.Completed)
            .SumAsync(oi => (decimal?)(oi.DiscountedPrice * oi.Quantity)) ?? 0;

        var totalInstructors =
            await context.Users.CountAsync(u =>
                u.Roles.Select(r => r.Name).Contains(AppConstants.RoleNames.Instructor));

        var instructorsThisWeek = await context.Users.CountAsync(u =>
            u.Roles.Select(r => r.Name).Contains(AppConstants.RoleNames.Instructor)
            && u.CreatedAt >= thisWeekStart);

        var instructorsLastWeek = await context.Users.CountAsync(u =>
            u.Roles.Select(r => r.Name).Contains(AppConstants.RoleNames.Instructor)
            && u.CreatedAt >= lastWeekStart && u.CreatedAt < lastWeekEnd);

        var totalPendingCourses = await context.Courses.CountAsync(c => c.Status == CourseStatus.Pending);

        var pendingCoursesThisWeek = await context.Courses.CountAsync(c =>
            c.Status == CourseStatus.Pending && c.CreatedAt >= thisWeekStart);

        var pendingCoursesLastWeek = await context.Courses.CountAsync(c =>
            c.Status == CourseStatus.Pending && c.CreatedAt >= lastWeekStart && c.CreatedAt < lastWeekEnd);

        var averageCourseRating = await context.Reviews.Select(r => (double?)r.Rating).AverageAsync() ?? 0;

        var ratingCount = await context.Reviews.CountAsync();

        var averageRatingThisWeek = await context.Reviews
            .Where(r => r.CreatedAt >= thisWeekStart)
            .Select(r => (double?)r.Rating)
            .AverageAsync() ?? 0;

        var averageRatingLastWeek = await context.Reviews
            .Where(r => r.CreatedAt >= lastWeekStart && r.CreatedAt < lastWeekEnd)
            .Select(r => (double?)r.Rating)
            .AverageAsync() ?? 0;

        return new AdminDashboardStatsVm
        {
            TotalPublishedCourses = totalPublishedCourses,
            PendingInstructorApplications = pendingInstructorApps,
            TotalUsers = totalUsers,
            TotalCoursesSold = totalCoursesSold,
            TotalRevenue = totalRevenue,

            PublishedCoursesGrowth = CalcGrowth(publishedCoursesLastWeek,
                publishedCoursesThisWeek),
            PendingInstructorApplicationsGrowth =
                CalcGrowth(pendingInstructorAppsLastWeek,
                    pendingInstructorAppsThisWeek),
            UsersGrowth = CalcGrowth(usersLastWeek,
                usersThisWeek),
            CoursesSoldGrowth = CalcGrowth(coursesSoldLastWeek,
                coursesSoldThisWeek),
            RevenueGrowth = CalcGrowth(revenueLastWeek,
                revenueThisWeek),
            TotalCategories = totalCategories,
            TotalInstructors = totalInstructors,
            InstructorsGrowth = CalcGrowth(instructorsLastWeek,
                instructorsThisWeek),
            TotalPendingCourses = totalPendingCourses,
            PendingCoursesGrowth = CalcGrowth(pendingCoursesLastWeek,
                pendingCoursesThisWeek),
            AverageCourseRating = averageCourseRating,
            RatingCount = ratingCount,
            AverageCourseRatingGrowth = CalcGrowth((decimal)averageRatingLastWeek,
                (decimal)averageRatingThisWeek)
        };
    }

    // ================= CHARTS =================

    private async Task<List<AdminDashboardCoursesInfoByCategoryVm>> GetCoursesInfoByCategory()
    {
        var result = await context.Courses
            .GroupBy(c => c.Category.Name)
            .Select(g => new AdminDashboardCoursesInfoByCategoryVm
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

    private async Task<List<AdminDashboardBestSellerCourseVm>> GetTopCoursesByCourseSold()
    {
        return await context.OrderItems
            .Where(oi => oi.Order.Status == OrderStatus.Completed)
            .GroupBy(oi => oi.Course)
            .Select(g => new AdminDashboardBestSellerCourseVm
            {
                CourseId = g.Key.Id,
                Title = g.Key.Title,
                InstructorName = g.Key.Instructor.FirstName + " " + g.Key.Instructor.LastName,
                SoldCount = g.Count(),
                Revenue = g.Sum(x => x.DiscountedPrice * x.Quantity)
            })
            .OrderByDescending(c => c.SoldCount)
            .Take(5)
            .ToListAsync();
    }

    private async Task<List<AdminDashboardRatingDistributionVm>> GetRatingDistribution()
    {
        var query = await context.Reviews
            .GroupBy(r => r.Rating)
            .Select(g => new
            {
                Star = g.Key,
                Count = g.Count()
            })
            .ToListAsync();

        var distribution = Enumerable.Range(1, 5)
            .Select(s => new AdminDashboardRatingDistributionVm
            {
                Star = s,
                Count = query.FirstOrDefault(x => x.Star == s)?.Count ?? 0
            })
            .ToList();

        return distribution;
    }

    private async Task<List<AdminDashboardBestSellerInstructorVm>> GetTopInstructorByRevenue()
    {
        return await context.OrderItems
            .Where(oi => oi.Order.Status == OrderStatus.Completed)
            .GroupBy(oi => oi.Course.Instructor)
            .Select(g => new AdminDashboardBestSellerInstructorVm
            {
                InstructorId = g.Key.Id,
                InstructorName = g.Key.FirstName + " " + g.Key.LastName,
                TotalCoursesSold = g.Count(),
                TotalRevenue = g.Sum(x => x.DiscountedPrice * x.Quantity)
            })
            .OrderByDescending(i => i.TotalRevenue)
            .Take(5)
            .ToListAsync();
    }

    private async Task<AdminDashboardCourseDistributionByStatusVm> GetCourseStatusDistribution()
    {
        var dict = await context.Courses
            .GroupBy(c => c.Status)
            .Select(g => new { Status = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.Status, x => x.Count);

        return new AdminDashboardCourseDistributionByStatusVm
        {
            Published = dict.GetValueOrDefault(CourseStatus.Published),
            Pending = dict.GetValueOrDefault(CourseStatus.Pending),
            Rejected = dict.GetValueOrDefault(CourseStatus.Rejected)
        };
    }


    private async Task<List<AdminDashboardRevenueByCategoryVm>> GetRevenueByCategory()
    {
        return await context.OrderItems
            .Where(oi => oi.Order.Status == OrderStatus.Completed)
            .GroupBy(oi => oi.Course.Category.Name)
            .Select(g => new AdminDashboardRevenueByCategoryVm
            {
                CategoryName = g.Key,
                Revenue = g.Sum(x => x.DiscountedPrice * x.Quantity)
            })
            .ToListAsync();
    }


    // ================= VERIFICATION =================

    private async Task<AdminDashboardVerificationProgressVm> GetInstructorVerification()
    {
        return new AdminDashboardVerificationProgressVm
        {
            Approved = await context.InstructorApplications.CountAsync(a =>
                a.Status == InstructorApplicationStatus.Approved),
            Pending = await context.InstructorApplications.CountAsync(a =>
                a.Status == InstructorApplicationStatus.Pending)
        };
    }

    private async Task<AdminDashboardVerificationProgressVm> GetCourseVerification()
    {
        return new AdminDashboardVerificationProgressVm
        {
            Approved = await context.Courses.CountAsync(c => c.Status == CourseStatus.Published),
            Pending = await context.Courses.CountAsync(c => c.Status == CourseStatus.Pending)
        };
    }

    // ================= HELPERS =================

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