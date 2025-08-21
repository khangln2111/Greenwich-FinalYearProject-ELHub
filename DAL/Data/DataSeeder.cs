using DAL.Data.Entities;
using DAL.Data.Entities.MediaEntities;
using DAL.Data.Enums;
using DAL.Utilities.MediaUtility.Abstract;
using LLL.AutoCompute.EFCore;
using LLL.AutoCompute.EFCore.Metadata.Internal;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DAL.Data;

public class DataSeeder(
    ApplicationDbContext context,
    RoleManager<ApplicationRole> roleManager,
    IMediaManager mediaManager)
{
    public async Task SeedAsync()
    {
        await SeedRoles();
        await SeedCategories();
        // await SyncData();
        // await mediaManager.CleanOrphanMediaFiles(context);
        await FixConsistencyAsync();
        await context.SaveChangesAsync();
    }


    private async Task FixConsistencyAsync()
    {
        // Loops through all auto-computed members defined in EFCore
        foreach (var computedMember in context.Model.GetAllComputedMembers())
        {
            // Query inconsistent entities in database, this is done by running your computed expression in the database, so it needs to be compatible with EFCore Linq to SQL translation, they usually are
            var inconsistentEntities = await computedMember.QueryInconsistentEntities(context, DateTime.MinValue)
                .OfType<object>()
                .ToListAsync();

            // Fix each inconsistent entity
            foreach (var entity in inconsistentEntities) await computedMember.FixAsync(entity, context);
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


    private async Task SeedCategories()
    {
        if (!await context.Categories.AnyAsync())
        {
            var categories = new List<Category>
            {
                new()
                {
                    Name = "Technology",
                    Image = new Media
                    {
                        Type = MediaType.Image,
                        Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279169/Technology_ctbhfi.jpg",
                        LocalFilePath = "",
                        Extension = ".jpg",
                        FileSizeInBytes = 0
                    }
                },
                new()
                {
                    Name = "Business",
                    Image = new Media
                    {
                        Type = MediaType.Image,
                        Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751281313/Business_eicgkh.jpg",
                        LocalFilePath = "",
                        Extension = ".jpg",
                        FileSizeInBytes = 0
                    }
                },
                new()
                {
                    Name = "Design",
                    Image = new Media
                    {
                        Type = MediaType.Image,
                        Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279170/Design_csnlua.jpg",
                        LocalFilePath = "",
                        Extension = ".jpg",
                        FileSizeInBytes = 0
                    }
                },
                new()
                {
                    Name = "Marketing",
                    Image = new Media
                    {
                        Type = MediaType.Image,
                        Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279169/Marketing_v7q6cg.png",
                        LocalFilePath = "",
                        Extension = ".jpg",
                        FileSizeInBytes = 0
                    }
                },
                new()
                {
                    Name = "Software Development",
                    Image = new Media
                    {
                        Type = MediaType.Image,
                        Url =
                            "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279168/SoftwareDevelpoment_cxocj6.jpg",
                        LocalFilePath = "",
                        Extension = ".jpg",
                        FileSizeInBytes = 0
                    }
                },
                new()
                {
                    Name = "AI & Data Science",
                    Image = new Media
                    {
                        Type = MediaType.Image,
                        Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279169/AI_DataScience_giguue.jpg",
                        LocalFilePath = "",
                        Extension = ".jpg",
                        FileSizeInBytes = 0
                    }
                },
                new()
                {
                    Name = "Health & Fitness",
                    Image = new Media
                    {
                        Type = MediaType.Image,
                        Url =
                            "https://res.cloudinary.com/dr0hvau94/image/upload/v1751280801/Health_Fitness2_shruxx.jpg",
                        LocalFilePath = "",
                        Extension = ".jpg",
                        FileSizeInBytes = 0
                    }
                },
                new()
                {
                    Name = "Music & Audio",
                    Image = new Media
                    {
                        Type = MediaType.Image,
                        Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279170/Music_Audio_gjnyg1.jpg",
                        LocalFilePath = "",
                        Extension = ".jpg",
                        FileSizeInBytes = 0
                    }
                },
                new()
                {
                    Name = "Photography",
                    Image = new Media
                    {
                        Type = MediaType.Image,
                        Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279170/Photography2_nrpzmb.jpg",
                        LocalFilePath = "",
                        Extension = ".jpg",
                        FileSizeInBytes = 0
                    }
                },
                new()
                {
                    Name = "Finance & Accounting",
                    Image = new Media
                    {
                        Type = MediaType.Image,
                        Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279169/Finance_lkx783.jpg",
                        LocalFilePath = "",
                        Extension = ".jpg",
                        FileSizeInBytes = 0
                    }
                }
            };
            await context.Categories.AddRangeAsync(categories);
        }
    }

    private async Task SeedRoles()
    {
        string[] roleNames = ["Admin", "Instructor"];

        foreach (var roleName in roleNames)
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                var role = new ApplicationRole { Name = roleName };
                await roleManager.CreateAsync(role);
            }
    }
}