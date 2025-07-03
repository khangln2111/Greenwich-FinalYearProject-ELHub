using AutoMapper;
using AutoMapper.QueryableExtensions;
using BLL.BusinessServices.Abstract;
using BLL.DTOs.CourseDTOs;
using BLL.DTOs.LectureDTOs;
using BLL.DTOs.SectionDTOs;
using BLL.Exceptions;
using BLL.Gridify;
using BLL.Gridify.CustomModels;
using BLL.Models;
using BLL.Validations;
using DAL.Data;
using DAL.Data.Entities;
using DAL.Data.Entities.MediaEntities;
using DAL.Data.Enums;
using DAL.Utilities.CurrentUserUtility;
using DAL.Utilities.MediaUtility.Abstract;
using Gridify;
using Microsoft.EntityFrameworkCore;

namespace BLL.BusinessServices.Concrete;

public class CourseService(
    ApplicationDbContext context,
    IMapper mapper,
    IGridifyMapper<Course> gridifyMapper,
    IValidationService validationService,
    IMediaManager mediaManager,
    ICurrentUserUtility currentUserUtility)
    : ICourseService
{
    public async Task<LearningCourseVm> GetCourseLearning(Guid id)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null)
            throw new UnauthorizedException();

        // get enrollment for the current user in the course
        var enrollment = await context.Enrollments
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.CourseId == id && e.UserId == currentUser.Id);

        if (enrollment == null)
            throw new NotFoundException(nameof(Enrollment), id);

        // get completed lecture IDs for the current user in the course
        var completedLectureIdList = await context.LectureProgresses
            .AsNoTracking()
            .Where(lp => lp.EnrollmentId == enrollment.Id && lp.Completed)
            .Select(lp => lp.LectureId)
            .ToListAsync();

        var completedLectureIds = new HashSet<Guid>(completedLectureIdList);

        // Fetch the course with related entities
        var course = await context.Courses
            .AsNoTracking()
            .Where(c => c.Id == id)
            .Include(c => c.Category)
            .Include(c => c.Image)
            .Include(c => c.PromoVideo)
            .Include(c => c.Sections).ThenInclude(s => s.Lectures).ThenInclude(l => l.Video)
            .ProjectTo<LearningCourseVm>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();


        if (course == null)
            throw new NotFoundException(nameof(Course), id);


        // Get completion status for each lecture
        var allLectures = course.Sections.SelectMany(s => s.Lectures).ToList();
        foreach (var lecture in allLectures) lecture.Completed = completedLectureIds.Contains(lecture.Id);

        // get ProgressPercentage of the course
        var totalLectures = allLectures.Count;
        var completedCount = allLectures.Count(l => l.Completed);
        course.ProgressPercentage = totalLectures == 0
            ? 0
            : (int)Math.Round((double)completedCount / totalLectures * 100);

        return course;
    }

    public async Task<CourseDetailVm> GetById(Guid id)
    {
        // var currentUser = currentUserUtility.GetCurrentUser();
        // var currentUserId = currentUser?.Id;
        // var roles = currentUser?.Roles ?? [];
        //
        // var isAdmin = roles.Contains("Admin");
        //
        // var course = await context.Courses
        //     .AsNoTracking()
        //     .Where(c => c.Id == id)
        //     .Select(c => new CourseDetailVm
        //     {
        //         Id = c.Id,
        //         Title = c.Title,
        //         Description = c.Description,
        //         Price = c.Price,
        //         DiscountedPrice = c.DiscountedPrice,
        //         DiscountPercentage = c.Price == 0 ? 0 : (int)Math.Round((c.Price - c.DiscountedPrice) / c.Price * 100),
        //         Status = c.Status.ToString(),
        //         Level = c.Level.ToString()!,
        //         Prerequisites = c.Prerequisites,
        //         LearningOutcomes = c.LearningOutcomes,
        //         ImageUrl = c.Image != null ? c.Image.Url : "",
        //         PromoVideoUrl = c.PromoVideo != null ? c.PromoVideo.Url : "",
        //         CategoryName = c.Category.Name,
        //         SectionCount = c.Sections.Count,
        //         LectureCount = c.Sections.SelectMany(s => s.Lectures).Count(),
        //         DurationInSeconds = c.Sections
        //             .SelectMany(s => s.Lectures)
        //             .Select(l => (int?)l.Video!.DurationInSeconds)
        //             .Sum() ?? 0,
        //         Sections = c.Sections
        //             .OrderBy(s => s.Order)
        //             .Select(s => new SectionVm
        //             {
        //                 Id = s.Id,
        //                 Title = s.Title,
        //                 Description = s.Description ?? "",
        //                 CourseId = c.Id,
        //                 Order = s.Order,
        //                 LectureCount = s.Lectures.Count,
        //                 DurationInSeconds = s.Lectures
        //                     .Select(l => (int?)l.Video!.DurationInSeconds)
        //                     .Sum() ?? 0,
        //                 Lectures = s.Lectures
        //                     .OrderBy(l => l.Order)
        //                     .Select(l => new LectureVm
        //                     {
        //                         Id = l.Id,
        //                         Title = l.Title,
        //                         Description = l.Description ?? "",
        //                         VideoUrl = isAdmin || c.InstructorId == currentUserId || l.IsPreview
        //                             ? l.Video != null ? l.Video.Url : ""
        //                             : "",
        //                         DurationInSeconds = l.Video != null ? l.Video.DurationInSeconds : 0,
        //                         IsPreview = l.IsPreview,
        //                         SectionId = s.Id,
        //                         Order = l.Order
        //                     }).ToArray()
        //             }).ToArray(),
        //         InstructorId = c.Instructor.Id.ToString(),
        //         InstructorName = c.Instructor.DisplayName ?? "",
        //         InstructorAvatarUrl = c.Instructor.Avatar != null ? c.Instructor.Avatar.Url : "",
        //         InstructorProfessionalTitle = c.Instructor.ProfessionalTitle ?? "",
        //         InstructorAbout = c.Instructor.About ?? "",
        //         InstructorAverageRating = c.Instructor.Courses
        //             .SelectMany(ic => ic.Enrollments)
        //             .Select(e => e.Review)
        //             .Select(r => (double?)r.Rating)
        //             .Average() ?? 0,
        //         InstructorReviewCount = c.Instructor.Courses
        //             .SelectMany(ic => ic.Enrollments)
        //             .Select(e => e.Review)
        //             .Count(),
        //         InstructorCourseCount = c.Instructor.Courses.Count,
        //         InstructorStudentCount = c.Instructor.Courses
        //             .SelectMany(ic => ic.Enrollments)
        //             .Select(e => e.UserId)
        //             .Distinct()
        //             .Count(),
        //         EnrollmentCount = c.Enrollments.Count,
        //         ReviewCount = c.Enrollments
        //             .Select(e => e.Review)
        //             .Count(),
        //         AverageRating = c.Enrollments
        //             .Select(e => e.Review)
        //             .Select(r => (double?)r.Rating)
        //             .Average() ?? 0,
        //         CreatedAt = c.CreatedAt,
        //         UpdatedAt = c.UpdatedAt
        //     })
        //     .FirstOrDefaultAsync();


        var course = await context.Courses
            .AsNoTracking()
            .Where(c => c.Id == id)
            .Include(c => c.Category)
            .Include(c => c.Image)
            .Include(c => c.PromoVideo)
            .Include(c => c.Sections).ThenInclude(s => s.Lectures).ThenInclude(l => l.Video)
            .ProjectTo<CourseDetailVm>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();

        if (course == null) throw new NotFoundException(nameof(Course), id);

        return course;
    }

    public async Task<Paged<CourseVm>> GetList(GridifyQuery query)
    {
        return await context.Courses
            .AsNoTracking()
            .GridifyToAsync<Course, CourseVm>(query, mapper, gridifyMapper);
    }


    public async Task<Success> Create(CreateCourseCommand command)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();
        await validationService.ValidateAsync(command);
        await EnsuredRelatedCategoryExistsAsync(command.CategoryId);
        var course = mapper.Map<Course>(command);
        // Saving new related Image and PromoVideo
        var image = await mediaManager.SaveFileAsync(command.Image, MediaType.Image);
        var promoVideo = await mediaManager.SaveFileAsync(command.PromoVideo, MediaType.Video);
        // Add Image and PromoVideo to the context
        await context.Media.AddRangeAsync(image, promoVideo);
        // Set the relationship
        course.Image = image as Media;
        course.PromoVideo = promoVideo as DurationMedia;
        course.InstructorId = currentUser.Id;
        // Add the course to the context and save the changes
        await context.Courses.AddAsync(course);
        await context.SaveChangesAsync();
        return new Success("Created course successfully", new { id = course.Id });
    }

    public async Task<Success> Update(UpdateCourseCommand command)
    {
        await validationService.ValidateAsync(command);
        // Check if the course exists
        var course = await context.Courses
            .Include(c => c.Image)
            .Include(c => c.PromoVideo)
            .FirstOrDefaultAsync(c => c.Id == command.Id);
        if (course == null) throw new NotFoundException(nameof(Course), command.Id);
        if (command.CategoryId.HasValue) await EnsuredRelatedCategoryExistsAsync(command.CategoryId.Value);
        // Updating related Image and PromoVideo
        if (command.Image != null && course.Image != null)
            await mediaManager.UpdateFileAsync(course.Image, command.Image);

        if (command.PromoVideo != null && course.PromoVideo != null)
            await mediaManager.UpdateFileAsync(course.PromoVideo, command.PromoVideo);

        mapper.Map(command, course);
        await context.SaveChangesAsync();
        return new Success("Updated course successfully");
    }

    public async Task<string> Delete(Guid id)
    {
        var course = await context.Courses
            .Include(c => c.PromoVideo)
            .Include(c => c.Image)
            .Include(c => c.Sections).ThenInclude(s => s.Lectures).ThenInclude(l => l.Video)
            .FirstOrDefaultAsync(c => c.Id == id);
        if (course == null) throw new NotFoundException(nameof(Course), id);
        //Delete related Image
        if (course.Image != null)
        {
            mediaManager.DeleteFile(course.Image);
            context.Media.Remove(course.Image);
        }

        //Delete related PromoVideo
        if (course.PromoVideo != null)
        {
            mediaManager.DeleteFile(course.PromoVideo);
            context.Media.Remove(course.PromoVideo);
        }

        //Delete related video of lectures
        course.Sections
            .SelectMany(s => s.Lectures)
            .Where(l => l.Video != null)
            .Select(l => l.Video)
            .ToList()
            .ForEach(video =>
            {
                mediaManager.DeleteFile(video!);
                context.Media.Remove(video!);
            });


        context.Courses.Remove(course);
        await context.SaveChangesAsync();
        return "Deleted course successfully";
    }

    public async Task<InstructorVm> GetInstructorByCourseId(Guid courseId)
    {
        var course = await context.Courses
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == courseId);

        if (course == null) throw new NotFoundException(nameof(Course), courseId);

        var instructor = await context.Users
            .AsNoTracking()
            .Where(u => u.Id == course.InstructorId)
            .ProjectTo<InstructorVm>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();


        if (instructor == null) throw new NotFoundException(nameof(Course), courseId);

        return instructor;
    }

    //Check if the related Category with the Course exists
    private async Task EnsuredRelatedCategoryExistsAsync(Guid categoryId)
    {
        var exists = await context.Categories.AsNoTracking().AnyAsync(c => c.Id == categoryId);
        if (!exists) throw new NotFoundException(nameof(Category), categoryId);
    }
}