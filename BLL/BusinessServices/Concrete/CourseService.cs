using AutoMapper;
using AutoMapper.QueryableExtensions;
using BLL.BusinessServices.Abstract;
using BLL.DTOs.CourseDTOs;
using BLL.DTOs.InstructorDTO;
using BLL.DTOs.LectureDTOs;
using BLL.DTOs.SectionDTOs;
using BLL.Exceptions;
using BLL.Gridify;
using BLL.Gridify.CustomModels;
using BLL.Models;
using BLL.Validations;
using DAL.Constants;
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
    private const int MaxRetryCount = AppConstants.Course.MaxRetryCount;
    private const int RetryCooldownDays = AppConstants.Course.RetryCooldownDays;

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
        var currentUser = currentUserUtility.GetCurrentUser();
        var userId = currentUser?.Id;
        var roles = currentUser?.Roles ?? [];
        var isAdmin = true;
        var isOwner = userId != null && context.Courses.Any(c => c.Id == id && c.InstructorId == userId);
        var course = await context.Courses
            .AsNoTracking()
            .Where(c => c.Id == id)
            .Include(c => c.Category)
            .Include(c => c.Image)
            .Include(c => c.PromoVideo)
            .Include(c => c.Sections).ThenInclude(s => s.Lectures).ThenInclude(l => l.Video)
            .ProjectTo<CourseDetailVm>(
                mapper.ConfigurationProvider,
                new { isAdmin, isOwner })
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

    public async Task<Success> ModerateCourse(ModerateCourseCommand command)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        await validationService.ValidateAsync(command);

        var course = await context.Courses
            .Include(c => c.ApprovalHistories)
            .FirstOrDefaultAsync(c => c.Id == command.Id);

        if (course == null) throw new NotFoundException(nameof(Course), command.Id);

        if (course.Status != CourseStatus.Pending)
            throw new BadRequestException("Course must be in Pending status to be reviewed",
                ErrorCode.InvalidOperation);


        // Lưu history
        var history = new CourseApprovalHistory
        {
            CourseId = course.Id,
            IsApproved = command.IsApproved,
            Note = command.Note
        };

        await context.CourseApprovalHistories.AddAsync(history);

        if (command.IsApproved)
        {
            course.Status = CourseStatus.Published;
            course.RetryCount = 0;
        }
        else
        {
            course.Status = CourseStatus.Rejected;
            course.LastRejectedAt = DateTime.Now;
            course.RetryCount++;
        }

        await context.SaveChangesAsync();

        return new Success("Reviewed course successfully", new { id = course.Id });
    }

    public async Task<Success> SubmitCourse(Guid id)
    {
        var currentUser = currentUserUtility.GetCurrentUser();

        if (currentUser == null) throw new UnauthorizedException();


        var course = await context.Courses
            .FirstOrDefaultAsync(c => c.Id == id && c.InstructorId == currentUser.Id);

        if (course == null) throw new NotFoundException(nameof(Course), id);

        if (course.Status != CourseStatus.Draft)
            throw new BadRequestException("Course must be in Draft status to submit for review",
                ErrorCode.InvalidOperation);

        course.Status = CourseStatus.Pending;
        course.SubmittedAt = DateTime.Now;
        await context.SaveChangesAsync();

        return new Success("Submitted course for review successfully", new { id = course.Id });
    }

    public async Task<Success> RetrySubmitCourse(Guid id)
    {
        var currentUser = currentUserUtility.GetCurrentUser();

        if (currentUser == null) throw new UnauthorizedException();

        var course = await context.Courses
            .FirstOrDefaultAsync(c => c.Id == id && c.InstructorId == currentUser.Id);

        if (course == null) throw new NotFoundException(nameof(Course), id);

        if (course.Status != CourseStatus.Rejected)
            throw new BadRequestException("Course must be in Rejected status to retry submission",
                ErrorCode.InvalidOperation);

        if (course.RetryCount >= MaxRetryCount)
            throw new BadRequestException(
                $"You have reached the maximum retry limit of {MaxRetryCount} times for this course.",
                ErrorCode.RetryLimitExceeded);

        if (course.LastRejectedAt.HasValue)
        {
            var cooldownEnd = course.LastRejectedAt.Value.AddDays(RetryCooldownDays);
            if (DateTime.Now < cooldownEnd)
                throw new BadRequestException(
                    $"Please retry after {cooldownEnd:dd-MM-yyyy HH:mm}",
                    ErrorCode.RetryCooldown);
        }

        course.Status = CourseStatus.Pending;
        await context.SaveChangesAsync();

        return new Success("Retried course submission successfully", new { id = course.Id });
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