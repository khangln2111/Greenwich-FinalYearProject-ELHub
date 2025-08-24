using BLL.BusinessServices.Abstract;
using BLL.DTOs.UserDashboardDTOs;
using BLL.Exceptions;
using DAL.Data;
using DAL.Data.Enums;
using DAL.Utilities.CurrentUserUtility;
using Microsoft.EntityFrameworkCore;

namespace BLL.BusinessServices.Concrete;

public class UserDashboardService(
    ApplicationDbContext context,
    ICurrentUserUtility currentUserUtility) : IUserDashboardService
{
    public async Task<UserDashboardVm> GetDashboard()
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null)
            throw new UnauthorizedException("User is not authenticated.");

        var userId = currentUser.Id;

        return new UserDashboardVm
        {
            Stats = await GetStats(userId),
            OverallCompletionPercent = await GetOverallCompletionPercent(userId),
            RecentCoursesProgress = await GetRecentCoursesProgress(userId),
            InfoByCategory = await GetInfoByCategory(userId),
            CourseConversion = await GetCourseConversion(userId),
            ReviewDistribution = await GetReviewDistribution(userId),
            CoursesByLevel = await GetCoursesByLevel(userId),
            TopCoursesByProgress = await GetTopCoursesByProgress(userId)
        };
    }

    private async Task<UserDashboardStatsVm> GetStats(Guid userId)
    {
        var now = DateTime.Now;
        var thisWeekStart = now.AddDays(-7);
        var lastWeekStart = now.AddDays(-14);
        var lastWeekEnd = now.AddDays(-7);

        var totalEnrolledCourses = await context.Enrollments
            .Where(uc => uc.UserId == userId)
            .CountAsync();

        var thisWeekEnrolledCourses = await context.Enrollments
            .Where(uc => uc.UserId == userId && uc.CreatedAt >= thisWeekStart)
            .CountAsync();

        var lastWeekEnrolledCourses = await context.Enrollments
            .Where(uc => uc.UserId == userId && uc.CreatedAt >= lastWeekStart && uc.CreatedAt < lastWeekEnd)
            .CountAsync();

        var totalSentGifts = await context.Gifts
            .Where(g => g.GiverId == userId)
            .CountAsync();

        var thisWeekSentGifts = await context.Gifts
            .Where(g => g.GiverId == userId && g.CreatedAt >= thisWeekStart)
            .CountAsync();

        var lastWeekSentGifts = await context.Gifts
            .Where(g => g.GiverId == userId && g.CreatedAt >= lastWeekStart && g.CreatedAt < lastWeekEnd)
            .CountAsync();

        var totalOrders = await context.Orders
            .Where(o => o.UserId == userId && o.Status == OrderStatus.Completed)
            .CountAsync();

        var thisWeekOrders = await context.Orders
            .Where(o => o.UserId == userId && o.Status == OrderStatus.Completed && o.CreatedAt >= thisWeekStart)
            .CountAsync();

        var lastWeekOrders = await context.Orders
            .Where(o => o.UserId == userId && o.Status == OrderStatus.Completed && o.CreatedAt >= lastWeekStart &&
                        o.CreatedAt < lastWeekEnd)
            .CountAsync();

        var totalSpent = await context.Orders
            .Include(o => o.OrderItems)
            .Where(o => o.UserId == userId && o.Status == OrderStatus.Completed)
            .SumAsync(o => o.OrderItems.Sum(oi => oi.DiscountedPrice * oi.Quantity));

        var thisWeekSpent = await context.Orders
            .Include(o => o.OrderItems)
            .Where(o => o.UserId == userId && o.Status == OrderStatus.Completed && o.CreatedAt >= thisWeekStart)
            .SumAsync(o => o.OrderItems.Sum(oi => oi.DiscountedPrice * oi.Quantity));

        var lastWeekSpent = await context.Orders
            .Include(o => o.OrderItems)
            .Where(o => o.UserId == userId && o.Status == OrderStatus.Completed && o.CreatedAt >= lastWeekStart &&
                        o.CreatedAt < lastWeekEnd)
            .SumAsync(o => o.OrderItems.Sum(oi => oi.DiscountedPrice * oi.Quantity));

        var totalInventoryItems = await context.InventoryItems
            .Where(ii => ii.Inventory.UserId == userId)
            .CountAsync();

        var thisWeekInventoryItems = await context.InventoryItems
            .Where(ii => ii.Inventory.UserId == userId && ii.CreatedAt >= thisWeekStart)
            .CountAsync();

        var lastWeekInventoryItems = await context.InventoryItems
            .Where(ii => ii.Inventory.UserId == userId && ii.CreatedAt >= lastWeekStart && ii.CreatedAt < lastWeekEnd)
            .CountAsync();

        var totalLearningSeconds = await context.LectureProgresses
            .Where(lp => lp.Enrollment.UserId == userId && lp.Completed && lp.Lecture.Video != null)
            .Select(lp => lp.Lecture.Video!.DurationInSeconds).SumAsync();

        var thisWeekLearningSeconds = await context.LectureProgresses
            .Where(lp => lp.Enrollment.UserId == userId && lp.Completed && lp.Lecture.Video != null &&
                         lp.UpdatedAt >= thisWeekStart)
            .Select(lp => lp.Lecture.Video!.DurationInSeconds).SumAsync();

        var lastWeekLearningSeconds = await context.LectureProgresses
            .Where(lp => lp.Enrollment.UserId == userId && lp.Completed && lp.Lecture.Video != null &&
                         lp.UpdatedAt >= lastWeekStart && lp.UpdatedAt < lastWeekEnd)
            .Select(lp => lp.Lecture.Video!.DurationInSeconds).SumAsync();

        var totalCompletedLecture = await context.LectureProgresses
            .Where(lp => lp.Enrollment.UserId == userId && lp.Completed)
            .CountAsync();

        var thisWeekCompletedLecture = await context.LectureProgresses
            .Where(lp => lp.Enrollment.UserId == userId && lp.Completed && lp.UpdatedAt >= thisWeekStart)
            .CountAsync();

        var lastWeekCompletedLecture = await context.LectureProgresses
            .Where(lp => lp.Enrollment.UserId == userId && lp.Completed && lp.UpdatedAt >= lastWeekStart &&
                         lp.UpdatedAt < lastWeekEnd)
            .CountAsync();

        return new UserDashboardStatsVm
        {
            TotalEnrolledCourses = totalEnrolledCourses,
            TotalEnrolledCoursesGrowth = CalcGrowth(lastWeekEnrolledCourses, thisWeekEnrolledCourses),

            TotalSentGifts = totalSentGifts,
            TotalSentGiftsGrowth = CalcGrowth(lastWeekSentGifts, thisWeekSentGifts),

            TotalOrders = totalOrders,
            TotalOrdersGrowth = CalcGrowth(lastWeekOrders, thisWeekOrders),

            TotalSpent = totalSpent,
            TotalSpentGrowth = CalcGrowth(lastWeekSpent, thisWeekSpent),

            TotalInventoryItems = totalInventoryItems,
            TotalInventoryItemsGrowth = CalcGrowth(lastWeekInventoryItems, thisWeekInventoryItems),

            TotalLearningSeconds = totalLearningSeconds,
            TotalLearningSecondsGrowth = CalcGrowth(lastWeekLearningSeconds, thisWeekLearningSeconds),

            TotalCompletedLectures = totalCompletedLecture,
            TotalCompletedLecturesGrowth = CalcGrowth(lastWeekCompletedLecture, thisWeekCompletedLecture)
        };
    }

    private async Task<double> GetOverallCompletionPercent(Guid userId)
    {
        var enrollments = await context.Enrollments
            .Where(e => e.UserId == userId)
            .Select(e => e.ProgressPercentage)
            .ToListAsync();

        if (!enrollments.Any()) return 0;

        return Math.Round(enrollments.Average(), 2);
    }

    private async Task<List<UserDashboardRecentCourseProgressVm>> GetRecentCoursesProgress(Guid userId)
    {
        var courseProgresses = await context.Enrollments
            .Where(e => e.UserId == userId)
            .OrderByDescending(e => e.CreatedAt)
            .Take(5)
            .Select(e => new UserDashboardRecentCourseProgressVm
            {
                CourseId = e.CourseId,
                CourseTitle = e.Course.Title,
                TotalLectures = e.Course.LectureCount,
                CompletedLectures = e.LectureProgresses.Count(lp => lp.Completed),
                CompletionPercent = e.ProgressPercentage
            })
            .ToListAsync();

        return courseProgresses;
    }

    private async Task<List<UserDashboardRecentCourseProgressVm>> GetTopCoursesByProgress(Guid userId)
    {
        var courseProgresses = await context.Enrollments
            .Where(e => e.UserId == userId)
            .OrderByDescending(e => e.ProgressPercentage)
            .Take(5)
            .Select(e => new UserDashboardRecentCourseProgressVm
            {
                CourseId = e.CourseId,
                CourseTitle = e.Course.Title,
                TotalLectures = e.Course.LectureCount,
                CompletedLectures = e.LectureProgresses.Count(lp => lp.Completed),
                CompletionPercent = e.ProgressPercentage
            })
            .ToListAsync();

        return courseProgresses;
    }

    private async Task<List<UserDashboardInfoByCategoryVm>> GetInfoByCategory(Guid userId)
    {
        var result = await context.Enrollments
            .Where(e => e.UserId == userId)
            .GroupBy(e => e.Course.Category)
            .Select(g => new UserDashboardInfoByCategoryVm
            {
                CategoryName = g.Key.Name,
                EnrolledCourses = g.Select(e => e.CourseId).Distinct().Count(),
                AverageCompletionPercent = g.Any()
                    ? Math.Round(g.Average(e => e.ProgressPercentage), 2)
                    : 0,
                TotalSpent = g.SelectMany(e => e.User.Orders)
                    .Where(o => o.Status == OrderStatus.Completed)
                    .SelectMany(o => o.OrderItems)
                    .Where(oi => oi.Course.CategoryId == g.Key.Id)
                    .Sum(oi => oi.DiscountedPrice * oi.Quantity)
            })
            .ToListAsync();

        return result;
    }

    private async Task<UserDashboardCourseConversionVm> GetCourseConversion(Guid userId)
    {
        var purchasedCourses = await context.Orders
            .Where(o => o.UserId == userId && o.Status == OrderStatus.Completed)
            .SelectMany(o => o.OrderItems)
            .Select(oi => oi.CourseId)
            .Distinct()
            .CountAsync();

        var enrolledCourses = await context.Enrollments
            .Where(e => e.UserId == userId)
            .Select(e => e.CourseId)
            .Distinct()
            .CountAsync();

        var completedCourses = await context.Enrollments
            .Where(e => e.UserId == userId)
            .Where(e => e.LectureProgresses.Count(lp => lp.Completed) == e.Course.LectureCount &&
                        e.Course.LectureCount > 0)
            .Select(e => e.CourseId)
            .Distinct()
            .CountAsync();

        return new UserDashboardCourseConversionVm
        {
            PurchasedCourses = purchasedCourses,
            EnrolledCourses = enrolledCourses,
            CompletedCourses = completedCourses
        };
    }

    private async Task<List<UserDashboardReviewDistributionVm>> GetReviewDistribution(Guid userId)
    {
        var reviews = await context.Reviews
            .Where(r => r.Enrollment.UserId == userId)
            .GroupBy(r => r.Rating)
            .Select(g => new UserDashboardReviewDistributionVm
            {
                Stars = g.Key,
                Count = g.Count()
            })
            .ToListAsync();

        var distribution = Enumerable.Range(1, 5)
            .Select(star => new UserDashboardReviewDistributionVm
            {
                Stars = star,
                Count = reviews.FirstOrDefault(r => r.Stars == star)?.Count ?? 0
            })
            .ToList();

        return distribution;
    }

    private async Task<List<UserDashboardCoursesByLevelVm>> GetCoursesByLevel(Guid userId)
    {
        var levels = await context.Enrollments
            .Where(e => e.UserId == userId)
            .GroupBy(e => e.Course.Level)
            .Select(g => new UserDashboardCoursesByLevelVm
            {
                Level = g.Key.HasValue ? g.Key.Value.ToString() : "Unspecified",
                Count = g.Count()
            })
            .ToListAsync();

        return levels;
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