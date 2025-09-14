using Application.Common.Contracts.InfraContracts;
using Domain.Entities;
using Domain.Enums;
using LLL.AutoCompute.EFCore.Metadata.Internal;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.DataSeeding;

public class DataSeeder(
    ApplicationDbContext context,
    RoleManager<ApplicationRole> roleManager,
    UserManager<ApplicationUser> userManager,
    IMediaManager mediaManager)
{
    public async Task SeedAsync()
    {
        await SeedRoles();
        await SeedCategories();
        await SeedUsers();
        // await SyncData();
        // await mediaManager.CleanOrphanMediaFiles(context);
    }

    private async Task SeedCategories()
    {
        if (!await context.Categories.AnyAsync())
        {
            await context.Categories.AddRangeAsync(DataToSeed.GetSeedCategories);
            await context.SaveChangesAsync();
        }
    }

    private async Task SeedRoles()
    {
        if (!await context.Roles.AnyAsync())
            foreach (var role in Enum.GetValues<RoleName>())
            {
                var roleValue = role.ToString();

                if (!await roleManager.RoleExistsAsync(roleValue))
                    await roleManager.CreateAsync(new ApplicationRole { Name = roleValue });
                await context.SaveChangesAsync();
            }
    }

    private async Task SeedUsers()
    {
        if (!await context.Users.AnyAsync())
        {
            var usersToSeed = DataToSeed.GetSeedUsers();
            foreach (var (user, password, role) in usersToSeed)
                if (user.Email != null && await userManager.FindByEmailAsync(user.Email) is null)
                {
                    await userManager.CreateAsync(user, password);
                    await userManager.AddToRoleAsync(user, role);
                }

            await context.SaveChangesAsync();
        }
    }

    private async Task SyncData()
    {
        // Sync Course data
        var courses = await context.Courses
            .Include(c => c.Sections)
            .ThenInclude(s => s.Lectures)
            .ThenInclude(l => l.Video)
            .Include(c => c.Enrollments)
            .ThenInclude(e => e.Review)
            .ToListAsync();

        foreach (var course in courses)
        {
            course.DurationInSeconds = course.Sections
                .SelectMany(s => s.Lectures)
                .Where(l => l.Video != null)
                .Sum(l => l.Video!.DurationInSeconds);
            course.SectionCount = course.Sections.Count;
            course.LectureCount = course.Sections
                .SelectMany(s => s.Lectures)
                .Count();
            course.EnrollmentCount = course.Enrollments.Count;
            course.ReviewCount = course.Enrollments
                .Count(e => e.Review != null);
            course.AverageRating = course.Enrollments
                .Where(e => e.Review != null)
                .Select(e => (double?)e.Review!.Rating)
                .Average() ?? 0.0;
        }

        // Sync Section data
        var sections = await context.Sections
            .Include(s => s.Lectures)
            .ThenInclude(l => l.Video)
            .ToListAsync();

        foreach (var section in sections)
        {
            section.LectureCount = section.Lectures.Count;
            section.DurationInSeconds = section.Lectures
                .Where(l => l.Video != null)
                .Sum(l => l.Video!.DurationInSeconds);
        }

        // Sync Enrollment data
        var enrollments = await context.Enrollments
            .Include(e => e.Course)
            .ThenInclude(c => c.Sections)
            .ThenInclude(s => s.Lectures)
            .Include(e => e.LectureProgresses)
            .ToListAsync();

        foreach (var enrollment in enrollments)
        {
            var totalLectures = enrollment.Course.Sections
                .SelectMany(s => s.Lectures)
                .Count();

            enrollment.ProgressPercentage = totalLectures > 0
                ? (int)((double)enrollment.LectureProgresses.Count(lp => lp.Completed) / totalLectures * 100)
                : 0;
        }

        await context.SaveChangesAsync();
    }

    private async Task FixConsistencyAsync()
    {
        // Loops through all auto-computed members defined in EFCore
        foreach (var computedMember in context.Model.GetAllComputedMembers())
        {
            // Query inconsistent entities in database, this is done by running your computed expression in the database, so it needs to be compatible with EFCore Linq to SQL translation, they usually are
            var inconsistentEntities = await computedMember
                .QueryInconsistentEntities(context, DateTime.MinValue)
                .OfType<object>()
                .ToListAsync();

            // Fix each inconsistent entity
            foreach (var entity in inconsistentEntities) await computedMember.FixAsync(entity, context);
            await context.SaveChangesAsync();
        }
    }
}