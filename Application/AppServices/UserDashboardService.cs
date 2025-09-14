using Application.Common.Contracts;
using Application.Common.Contracts.AppContracts;
using Application.Common.Contracts.GeneralContracts;
using Application.Common.Contracts.InfraContracts;
using Application.DTOs.UserDashboardDTOs;
using Application.Exceptions;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Application.AppServices;

public class UserDashboardService(
    IApplicationDbContext context,
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
            InfoByCategory = await GetInfoByCategory(userId),
            CourseConversion = await GetCourseConversion(userId),
            ReviewDistribution = await GetReviewDistribution(userId),
            CoursesByLevel = await GetCoursesByLevel(userId)
        };
    }

    private async Task<UserDashboardStatsVm> GetStats(Guid userId)
    {
        var now = DateTime.Now;
        var thisWeekStart = now.AddDays(-7);
        var lastWeekStart = now.AddDays(-14);
        var lastWeekEnd = now.AddDays(-7);

        var totalEnrolledCourses = await context.Enrollments.AsNoTracking()
            .Where(uc => uc.UserId == userId)
            .CountAsync();

        var thisWeekEnrolledCourses = await context.Enrollments.AsNoTracking()
            .Where(uc => uc.UserId == userId && uc.CreatedAt >= thisWeekStart)
            .CountAsync();

        var lastWeekEnrolledCourses = await context.Enrollments.AsNoTracking()
            .Where(uc => uc.UserId == userId && uc.CreatedAt >= lastWeekStart && uc.CreatedAt < lastWeekEnd)
            .CountAsync();

        var totalSentGifts = await context.Gifts.AsNoTracking()
            .Where(g => g.GiverId == userId)
            .CountAsync();

        var thisWeekSentGifts = await context.Gifts.AsNoTracking()
            .Where(g => g.GiverId == userId && g.CreatedAt >= thisWeekStart)
            .CountAsync();

        var lastWeekSentGifts = await context.Gifts.AsNoTracking()
            .Where(g => g.GiverId == userId && g.CreatedAt >= lastWeekStart && g.CreatedAt < lastWeekEnd)
            .CountAsync();

        var totalOrders = await context.Orders.AsNoTracking()
            .Where(o => o.UserId == userId && o.Status == OrderStatus.Completed)
            .CountAsync();

        var thisWeekOrders = await context.Orders.AsNoTracking()
            .Where(o => o.UserId == userId && o.Status == OrderStatus.Completed && o.CreatedAt >= thisWeekStart)
            .CountAsync();

        var lastWeekOrders = await context.Orders.AsNoTracking()
            .Where(o => o.UserId == userId && o.Status == OrderStatus.Completed && o.CreatedAt >= lastWeekStart &&
                        o.CreatedAt < lastWeekEnd)
            .CountAsync();

        var totalSpent = await context.Orders.AsNoTracking()
            .Include(o => o.OrderItems)
            .Where(o => o.UserId == userId && o.Status == OrderStatus.Completed)
            .SumAsync(o => o.OrderItems.Sum(oi => oi.DiscountedPrice * oi.Quantity));

        var thisWeekSpent = await context.Orders.AsNoTracking()
            .Include(o => o.OrderItems)
            .Where(o => o.UserId == userId && o.Status == OrderStatus.Completed && o.CreatedAt >= thisWeekStart)
            .SumAsync(o => o.OrderItems.Sum(oi => oi.DiscountedPrice * oi.Quantity));

        var lastWeekSpent = await context.Orders.AsNoTracking()
            .Include(o => o.OrderItems)
            .Where(o => o.UserId == userId && o.Status == OrderStatus.Completed && o.CreatedAt >= lastWeekStart &&
                        o.CreatedAt < lastWeekEnd)
            .SumAsync(o => o.OrderItems.Sum(oi => oi.DiscountedPrice * oi.Quantity));

        var totalInventoryItems = await context.InventoryItems.AsNoTracking()
            .Where(ii => ii.Inventory.UserId == userId)
            .CountAsync();

        var thisWeekInventoryItems = await context.InventoryItems.AsNoTracking()
            .Where(ii => ii.Inventory.UserId == userId && ii.CreatedAt >= thisWeekStart)
            .CountAsync();

        var lastWeekInventoryItems = await context.InventoryItems.AsNoTracking()
            .Where(ii => ii.Inventory.UserId == userId && ii.CreatedAt >= lastWeekStart && ii.CreatedAt < lastWeekEnd)
            .CountAsync();

        var totalLearningSeconds = await context.LectureProgresses.AsNoTracking()
            .Where(lp => lp.Enrollment.UserId == userId && lp.Completed && lp.Lecture.Video != null)
            .Select(lp => lp.Lecture.Video!.DurationInSeconds).SumAsync();

        var thisWeekLearningSeconds = await context.LectureProgresses.AsNoTracking()
            .Where(lp => lp.Enrollment.UserId == userId && lp.Completed && lp.Lecture.Video != null &&
                         lp.UpdatedAt >= thisWeekStart)
            .Select(lp => lp.Lecture.Video!.DurationInSeconds).SumAsync();

        var lastWeekLearningSeconds = await context.LectureProgresses.AsNoTracking()
            .Where(lp => lp.Enrollment.UserId == userId && lp.Completed && lp.Lecture.Video != null &&
                         lp.UpdatedAt >= lastWeekStart && lp.UpdatedAt < lastWeekEnd)
            .Select(lp => lp.Lecture.Video!.DurationInSeconds).SumAsync();

        var totalCompletedLecture = await context.LectureProgresses.AsNoTracking()
            .Where(lp => lp.Enrollment.UserId == userId && lp.Completed)
            .CountAsync();

        var thisWeekCompletedLecture = await context.LectureProgresses.AsNoTracking()
            .Where(lp => lp.Enrollment.UserId == userId && lp.Completed && lp.UpdatedAt >= thisWeekStart)
            .CountAsync();

        var lastWeekCompletedLecture = await context.LectureProgresses.AsNoTracking()
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
        var enrollments = await context.Enrollments.AsNoTracking()
            .Where(e => e.UserId == userId)
            .Select(e => e.ProgressPercentage)
            .ToListAsync();

        if (!enrollments.Any()) return 0;

        return Math.Round(enrollments.Average(), 2);
    }


    private async Task<List<UserDashboardInfoByCategoryVm>> GetInfoByCategory(Guid userId)
    {
        var result = await context.Enrollments.AsNoTracking()
            .Where(e => e.UserId == userId)
            .GroupBy(e => e.Course.Category)
            .Select(g => new UserDashboardInfoByCategoryVm
            {
                CategoryName = g.Key.Name,
                EnrolledCoursesCount = g.Select(e => e.CourseId).Distinct().Count(),
                CompletedCoursesCount = g.Count(e => e.ProgressPercentage == 100),
                PurchasedCoursesQuantityCount = g
                    .SelectMany(e => e.User.Orders)
                    .Where(o => o.Status == OrderStatus.Completed)
                    .SelectMany(o => o.OrderItems)
                    .Where(oi => oi.Course.CategoryId == g.Key.Id)
                    .Sum(oi => oi.Quantity),
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
        var purchasedCoursesQuantity = await context.Orders.AsNoTracking()
            .Where(o => o.UserId == userId && o.Status == OrderStatus.Completed)
            .SelectMany(o => o.OrderItems)
            .SumAsync(oi => oi.Quantity);

        var purchasedCourses = await context.Orders.AsNoTracking()
            .Where(o => o.UserId == userId && o.Status == OrderStatus.Completed)
            .SelectMany(o => o.OrderItems)
            .Select(oi => oi.CourseId)
            .Distinct()
            .CountAsync();

        var enrolledCourses = await context.Enrollments.AsNoTracking()
            .Where(e => e.UserId == userId)
            .Select(e => e.CourseId)
            .Distinct()
            .CountAsync();

        var completedCourses = await context.Enrollments.AsNoTracking()
            .Where(e => e.UserId == userId)
            .Where(e => e.LectureProgresses.Count(lp => lp.Completed) == e.Course.LectureCount &&
                        e.Course.LectureCount > 0)
            .Select(e => e.CourseId)
            .Distinct()
            .CountAsync();

        return new UserDashboardCourseConversionVm
        {
            PurchasedCoursesUnique = purchasedCourses,
            PurchasedCoursesQuantity = purchasedCoursesQuantity,
            EnrolledCourses = enrolledCourses,
            CompletedCourses = completedCourses
        };
    }

    private async Task<List<UserDashboardReviewDistributionVm>> GetReviewDistribution(Guid userId)
    {
        var reviews = await context.Reviews.AsNoTracking()
            .Where(r => r.Enrollment.UserId == userId)
            .GroupBy(r => r.Rating)
            .Select(g => new UserDashboardReviewDistributionVm
            {
                Star = g.Key,
                Count = g.Count()
            })
            .ToListAsync();

        var distribution = Enumerable.Range(1, 5)
            .Select(star => new UserDashboardReviewDistributionVm
            {
                Star = star,
                Count = reviews.FirstOrDefault(r => r.Star == star)?.Count ?? 0
            })
            .ToList();

        return distribution;
    }


    private async Task<List<UserDashboardCoursesByLevelVm>> GetCoursesByLevel(Guid userId)
    {
        var levels = await context.Enrollments.AsNoTracking()
            .Where(e => e.UserId == userId && e.Course.Level.HasValue)
            .GroupBy(e => e.Course.Level!.Value)
            .Select(g => new UserDashboardCoursesByLevelVm
            {
                Level = g.Key,
                Count = g.Count()
            })
            .ToListAsync();

        var allLevels = Enum.GetValues<CourseLevel>()
            .Select(l => new UserDashboardCoursesByLevelVm
            {
                Level = l,
                Count = levels.FirstOrDefault(x => x.Level == l)?.Count ?? 0
            })
            .ToList();

        return allLevels;
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