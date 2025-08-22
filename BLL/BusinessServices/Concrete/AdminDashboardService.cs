using BLL.BusinessServices.Abstract;
using BLL.DTOs.AdminDashboardDTOs;
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
            CourseStatusDistribution = await GetCourseStatusDistribution(),
            RevenueByCategory = await GetRevenueByCategory(),
            RevenueByMonth = await GetRevenueByMonth(),
            InstructorVerification = await GetInstructorVerification(),
            CourseVerification = await GetCourseVerification()
        };
    }


    private async Task<AdminStatsVm> GetStats()
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

        return new AdminStatsVm
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
            TotalCategories = totalCategories
        };
    }

    // ================= CHARTS =================

    private async Task<List<BestSellerCourseVm>> GetTopCoursesByCourseSold()
    {
        return await context.OrderItems
            .Where(oi => oi.Order.Status == OrderStatus.Completed)
            .GroupBy(oi => oi.Course)
            .Select(g => new BestSellerCourseVm
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

    private async Task<List<BestSellerInstructorVm>> GetTopInstructorByRevenue()
    {
        return await context.OrderItems
            .Where(oi => oi.Order.Status == OrderStatus.Completed)
            .GroupBy(oi => oi.Course.Instructor)
            .Select(g => new BestSellerInstructorVm
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

    private async Task<CourseStatusDistributionVm> GetCourseStatusDistribution()
    {
        return new CourseStatusDistributionVm
        {
            Published = await context.Courses.CountAsync(c => c.Status == CourseStatus.Published),
            Pending = await context.Courses.CountAsync(c => c.Status == CourseStatus.Pending),
            Rejected = await context.Courses.CountAsync(c => c.Status == CourseStatus.Rejected)
        };
    }

    private async Task<List<RevenueByCategoryVm>> GetRevenueByCategory()
    {
        return await context.OrderItems
            .Where(oi => oi.Order.Status == OrderStatus.Completed)
            .GroupBy(oi => oi.Course.Category.Name)
            .Select(g => new RevenueByCategoryVm
            {
                CategoryName = g.Key,
                Revenue = g.Sum(x => x.DiscountedPrice * x.Quantity)
            })
            .ToListAsync();
    }

    private async Task<List<RevenueByMonthVm>> GetRevenueByMonth()
    {
        return await context.OrderItems
            .Where(oi => oi.Order.Status == OrderStatus.Completed)
            .GroupBy(oi => new { oi.Order.CreatedAt.Year, oi.Order.CreatedAt.Month })
            .Select(g => new RevenueByMonthVm
            {
                Year = g.Key.Year,
                Month = g.Key.Month,
                Revenue = g.Sum(x => x.DiscountedPrice * x.Quantity)
            })
            .OrderBy(r => r.Year).ThenBy(r => r.Month)
            .ToListAsync();
    }

    // ================= VERIFICATION =================

    private async Task<VerificationProgressVm> GetInstructorVerification()
    {
        return new VerificationProgressVm
        {
            Approved = await context.InstructorApplications.CountAsync(a =>
                a.Status == InstructorApplicationStatus.Approved),
            Pending = await context.InstructorApplications.CountAsync(a =>
                a.Status == InstructorApplicationStatus.Pending)
        };
    }

    private async Task<VerificationProgressVm> GetCourseVerification()
    {
        return new VerificationProgressVm
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