using BLL.BusinessServices.Abstract;
using BLL.DTOs.AdminDashboardDTOs;
using DAL.Data;
using DAL.Data.Enums;
using Microsoft.EntityFrameworkCore;

namespace BLL.BusinessServices.Concrete;

public class AdminDashboardService(ApplicationDbContext context)
    : IAdminDashboardService
{
    public async Task<AdminDashboardVm> GetDashboardAsync()
    {
        var now = DateTime.Now;
        var lastWeek = now.AddDays(-7);

        return new AdminDashboardVm
        {
            Stats = await GetStatsAsync(lastWeek),
            TopCourses = await GetTopCoursesAsync(),
            TopInstructors = await GetTopInstructorsAsync(),
            CourseStatusDistribution = await GetCourseStatusDistributionAsync(),
            RevenueByCategory = await GetRevenueByCategoryAsync(),
            RevenueByMonth = await GetRevenueByMonthAsync(),
            InstructorVerification = await GetInstructorVerificationAsync(),
            CourseVerification = await GetCourseVerificationAsync()
        };
    }

    // ================= STATS =================

    private async Task<AdminStatsVm> GetStatsAsync(DateTime lastWeek)
    {
        var totalPublishedCourses = await context.Courses.CountAsync(c => c.Status == CourseStatus.Published);
        var publishedCoursesLastWeek =
            await context.Courses.CountAsync(c => c.Status == CourseStatus.Published && c.CreatedAt >= lastWeek);

        var pendingInstructorApps =
            await context.InstructorApplications.CountAsync(a => a.Status == InstructorApplicationStatus.Pending);
        var pendingInstructorAppsLastWeek =
            await context.InstructorApplications.CountAsync(a => a.CreatedAt >= lastWeek);

        var totalCategories = await context.Categories.CountAsync();

        var totalUsers = await context.Users.CountAsync();
        var usersLastWeek = await context.Users.CountAsync(u => u.CreatedAt >= lastWeek);

        var totalCoursesSold = await context.OrderItems.CountAsync(oi => oi.Order.Status == OrderStatus.Completed);
        var coursesSoldLastWeek = await context.OrderItems.CountAsync(oi =>
            oi.Order.Status == OrderStatus.Completed && oi.Order.CreatedAt >= lastWeek);

        var totalRevenue = await context.OrderItems
            .Where(oi => oi.Order.Status == OrderStatus.Completed)
            .SumAsync(oi => (decimal?)(oi.Price * oi.Quantity)) ?? 0;

        var revenueLastWeek = await context.OrderItems
            .Where(oi => oi.Order.Status == OrderStatus.Completed && oi.Order.CreatedAt >= lastWeek)
            .SumAsync(oi => (decimal?)(oi.Price * oi.Quantity)) ?? 0;

        return new AdminStatsVm
        {
            TotalPublishedCourses = totalPublishedCourses,
            PublishedCoursesGrowth = CalcGrowth(publishedCoursesLastWeek, totalPublishedCourses),

            PendingInstructorApplications = pendingInstructorApps,
            PendingInstructorApplicationsGrowth = CalcGrowth(pendingInstructorAppsLastWeek, pendingInstructorApps),

            TotalCategories = totalCategories,

            TotalUsers = totalUsers,
            UsersGrowth = CalcGrowth(usersLastWeek, totalUsers),

            TotalCoursesSold = totalCoursesSold,
            CoursesSoldGrowth = CalcGrowth(coursesSoldLastWeek, totalCoursesSold),

            TotalRevenue = totalRevenue,
            RevenueGrowth = CalcGrowthDecimal(revenueLastWeek, totalRevenue)
        };
    }

    // ================= CHARTS =================

    private async Task<List<BestSellerCourseVm>> GetTopCoursesAsync()
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
                Revenue = g.Sum(x => x.Price * x.Quantity)
            })
            .OrderByDescending(c => c.SoldCount)
            .Take(5)
            .ToListAsync();
    }

    private async Task<List<BestSellerInstructorVm>> GetTopInstructorsAsync()
    {
        return await context.OrderItems
            .Where(oi => oi.Order.Status == OrderStatus.Completed)
            .GroupBy(oi => oi.Course.Instructor)
            .Select(g => new BestSellerInstructorVm
            {
                InstructorId = g.Key.Id,
                InstructorName = g.Key.FirstName + " " + g.Key.LastName,
                TotalCoursesSold = g.Count(),
                TotalRevenue = g.Sum(x => x.Price * x.Quantity)
            })
            .OrderByDescending(i => i.TotalRevenue)
            .Take(5)
            .ToListAsync();
    }

    private async Task<CourseStatusDistributionVm> GetCourseStatusDistributionAsync()
    {
        return new CourseStatusDistributionVm
        {
            Published = await context.Courses.CountAsync(c => c.Status == CourseStatus.Published),
            Pending = await context.Courses.CountAsync(c => c.Status == CourseStatus.Pending),
            Rejected = await context.Courses.CountAsync(c => c.Status == CourseStatus.Rejected)
        };
    }

    private async Task<List<RevenueByCategoryVm>> GetRevenueByCategoryAsync()
    {
        return await context.OrderItems
            .Where(oi => oi.Order.Status == OrderStatus.Completed)
            .GroupBy(oi => oi.Course.Category.Name)
            .Select(g => new RevenueByCategoryVm
            {
                CategoryName = g.Key,
                Revenue = g.Sum(x => x.Price * x.Quantity)
            })
            .ToListAsync();
    }

    private async Task<List<RevenueByMonthVm>> GetRevenueByMonthAsync()
    {
        return await context.OrderItems
            .Where(oi => oi.Order.Status == OrderStatus.Completed)
            .GroupBy(oi => new { oi.Order.CreatedAt.Year, oi.Order.CreatedAt.Month })
            .Select(g => new RevenueByMonthVm
            {
                Year = g.Key.Year,
                Month = g.Key.Month,
                Revenue = g.Sum(x => x.Price * x.Quantity)
            })
            .OrderBy(r => r.Year).ThenBy(r => r.Month)
            .ToListAsync();
    }

    // ================= VERIFICATION =================

    private async Task<VerificationProgressVm> GetInstructorVerificationAsync()
    {
        return new VerificationProgressVm
        {
            Approved = await context.InstructorApplications.CountAsync(a =>
                a.Status == InstructorApplicationStatus.Approved),
            Pending = await context.InstructorApplications.CountAsync(a =>
                a.Status == InstructorApplicationStatus.Pending)
        };
    }

    private async Task<VerificationProgressVm> GetCourseVerificationAsync()
    {
        return new VerificationProgressVm
        {
            Approved = await context.Courses.CountAsync(c => c.Status == CourseStatus.Published),
            Pending = await context.Courses.CountAsync(c => c.Status == CourseStatus.Pending)
        };
    }

    // ================= HELPERS =================

    private double CalcGrowth(int lastWeek, int current)
    {
        if (lastWeek == 0) return current > 0 ? 100 : 0;
        return Math.Round((double)(current - lastWeek) / lastWeek * 100, 2);
    }

    private double CalcGrowthDecimal(decimal lastWeek, decimal current)
    {
        if (lastWeek == 0) return current > 0 ? 100 : 0;
        return Math.Round((double)(current - lastWeek) / (double)lastWeek * 100, 2);
    }
}