using Application.Common.Interfaces;
using Application.Common.Interfaces.AppInterfaces;
using Application.Common.Interfaces.InfrastructureInterfaces;
using Application.Common.Models;
using Application.DTOs.CourseDTOs;
using Application.DTOs.InstructorDTO;
using Application.Exceptions;
using Application.Gridify;
using Application.Gridify.CustomModels;
using Application.Validations;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Constants;
using Domain.Entities;
using Domain.Entities.MediaEntities;
using Domain.Enums;
using Domain.Events.CourseEvents;
using Gridify;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.AppServices;

public class CourseService(
    IApplicationDbContext context,
    IMapper mapper,
    IGridifyMapper<Course> gridifyMapper,
    IValidationService validationService,
    IMediaManager mediaManager,
    ICurrentUserUtility currentUserUtility,
    IHtmlSanitizerUtility htmlSanitizerUtility,
    IMediator mediator)
    : ICourseService
{
    private const int MaxRetryCount = AppConstants.Course.MaxRetryCount;
    private const int RetryCooldownDays = AppConstants.Course.RetryCooldownDays;


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
        var image = await mediaManager.SaveFile(command.Image, MediaType.Image);
        var promoVideo = await mediaManager.SaveFile(command.PromoVideo, MediaType.Video);
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
            await mediaManager.UpdateFile(course.Image, command.Image);

        if (command.PromoVideo != null && course.PromoVideo != null)
            await mediaManager.UpdateFile(course.PromoVideo, command.PromoVideo);

        mapper.Map(command, course);

        // Sanitize the Description field to prevent XSS attacks
        if (!string.IsNullOrWhiteSpace(course.Description))
            course.Description = htmlSanitizerUtility.Sanitize(course.Description);

        await context.SaveChangesAsync();

        await mediator.Publish(new CourseUpdatedEvent(course));
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


        // Store history
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

        await mediator.Publish(new CourseModeratedEvent(course, command.IsApproved));

        return new Success("Moderated course successfully", new { id = course.Id });
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

        await mediator.Publish(new CourseSubmittedEvent(course));

        return new Success("Submitted course for review successfully", new { id = course.Id });
    }

    public async Task<Success> ResubmitCourse(Guid id)
    {
        var currentUser = currentUserUtility.GetCurrentUser();

        if (currentUser == null) throw new UnauthorizedException();

        var course = await context.Courses
            .FirstOrDefaultAsync(c => c.Id == id && c.InstructorId == currentUser.Id);

        if (course == null) throw new NotFoundException(nameof(Course), id);

        if (course.Status != CourseStatus.Rejected)
            throw new BadRequestException("Course must be in Rejected status to resubmit for review",
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

        await mediator.Publish(new CourseSubmittedEvent(course));


        return new Success("Resubmitted course successfully", new { id = course.Id });
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

    public async Task<CourseEnrollmentStatusVm> GetCurrentUserEnrollmentStatus(Guid courseId)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        var enrollment = await context.Enrollments
            .AsNoTracking()
            .Where(e => e.CourseId == courseId && e.UserId == currentUser.Id)
            .Select(e => new { e.Id })
            .FirstOrDefaultAsync();

        return enrollment == null
            ? new CourseEnrollmentStatusVm { IsEnrolled = false }
            : new CourseEnrollmentStatusVm { IsEnrolled = true, EnrollmentId = enrollment.Id };
    }

    //Check if the related Category with the Course exists
    private async Task EnsuredRelatedCategoryExistsAsync(Guid categoryId)
    {
        var exists = await context.Categories.AsNoTracking().AnyAsync(c => c.Id == categoryId);
        if (!exists) throw new NotFoundException(nameof(Category), categoryId);
    }
}