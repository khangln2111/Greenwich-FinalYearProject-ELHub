using AutoMapper;
using AutoMapper.QueryableExtensions;
using BLL.BusinessServices.Abstract;
using BLL.DTOs.InstructorApplicationDTOs;
using BLL.Exceptions;
using BLL.Gridify;
using BLL.Gridify.CustomModels;
using BLL.Models;
using BLL.Validations;
using BLL.Validations.InstructorApplicationValidators;
using DAL.Constants;
using DAL.Data;
using DAL.Data.Entities;
using DAL.Data.Enums;
using DAL.Utilities.CurrentUserUtility;
using DAL.Utilities.MediaUtility.Abstract;
using Gridify;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BLL.BusinessServices.Concrete;

public class InstructorApplicationService(
    ApplicationDbContext context,
    IGridifyMapper<InstructorApplication> gridifyMapper,
    IMapper mapper,
    IValidationService validationService,
    IMediaManager mediaManager,
    ICurrentUserUtility currentUserUtility,
    UserManager<ApplicationUser> userManager) : IInstructorApplicationService
{
    private const int MaxRetryCount = 2;
    private const int RetryCooldownDays = 7;

    public async Task<Success> Create(CreateInstructorApplicationCommand command)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        var hasActiveOrApproved = await context.InstructorApplications
            .AnyAsync(x =>
                x.UserId == currentUser.Id &&
                (x.Status == InstructorApplicationStatus.Pending || x.Status == InstructorApplicationStatus.Approved));

        if (hasActiveOrApproved)
            throw new BadRequestException(
                "You already have an instructor application in progress or approved.",
                ErrorCode.InvalidOperation);

        var anyRejected = await context.InstructorApplications
            .AnyAsync(x => x.UserId == currentUser.Id && x.Status == InstructorApplicationStatus.Rejected);

        if (anyRejected)
            throw new BadRequestException(
                "You already submitted an application and it was rejected. Please retry instead.",
                ErrorCode.InvalidOperation);

        await validationService.ValidateAsync(command);

        var media = await mediaManager.SaveFileAsync(command.WorkAvatar, MediaType.Image);
        await context.Media.AddAsync(media);

        var application = mapper.Map<InstructorApplication>(command);
        application.UserId = currentUser.Id;
        application.WorkAvatar = media;

        await context.InstructorApplications.AddAsync(application);
        await context.SaveChangesAsync();

        return new Success("Instructor application created successfully.");
    }

    public async Task<Success> Retry(RetryInstructorApplicationCommand command)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        var application = await context.InstructorApplications
            .Where(a => a.UserId == currentUser.Id)
            .Include(a => a.WorkAvatar)
            .OrderByDescending(a => a.CreatedAt)
            .FirstOrDefaultAsync();

        if (application == null || application.Status != InstructorApplicationStatus.Rejected)
            throw new NotFoundException("No rejected instructor application found for the current user.");

        if (application.RetryCount >= MaxRetryCount)
            throw new BadRequestException("You have reached the maximum number of retry attempts.",
                ErrorCode.RetryLimitExceeded);

        if (application.LastRejectedAt.HasValue)
        {
            var cooldownEnd = application.LastRejectedAt.Value.AddDays(RetryCooldownDays);
            if (DateTime.UtcNow < cooldownEnd)
                throw new BadRequestException(
                    $"Please retry after {cooldownEnd.ToLocalTime():g}.",
                    ErrorCode.RetryCooldown);
        }

        await validationService.ValidateAsync(command);

        if (command.WorkAvatar != null && application.WorkAvatar != null)
            await mediaManager.UpdateFileAsync(application.WorkAvatar, command.WorkAvatar);

        mapper.Map(command, application);
        application.Status = InstructorApplicationStatus.Pending;
        application.RetryCount += 1;
        await context.SaveChangesAsync();
        return new Success("Instructor application retried successfully.");
    }

    public async Task<bool> CanRetrySelf()
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        var latestRejected = await context.InstructorApplications
            .Where(a => a.UserId == currentUser.Id && a.Status == InstructorApplicationStatus.Rejected)
            .OrderByDescending(a => a.CreatedAt)
            .FirstOrDefaultAsync();

        if (latestRejected == null)
            return false;

        if (latestRejected.RetryCount >= MaxRetryCount)
            return false;

        if (latestRejected.LastRejectedAt.HasValue &&
            (DateTime.UtcNow - latestRejected.LastRejectedAt.Value).TotalDays < RetryCooldownDays)
            return false;

        return true;
    }

    public async Task<Success> Review(ReviewInstructorApplicationCommand command)
    {
        await validationService.ValidateAsync(command);

        var application = await context.InstructorApplications
            .Include(x => x.User)
            .Include(x => x.WorkAvatar)
            .FirstOrDefaultAsync(x => x.Id == command.Id);

        if (application == null)
            throw new NotFoundException("Instructor application not found.");

        if (application.Status != InstructorApplicationStatus.Pending)
            throw new BadRequestException("This application has already been reviewed.", ErrorCode.InvalidOperation);

        application.Note = command.Note;
        application.ReviewedAt = DateTime.UtcNow;

        if (command.IsApproved)
        {
            application.Status = InstructorApplicationStatus.Approved;

            var user = application.User;
            user.DisplayName = application.DisplayName;
            user.ProfessionalTitle = application.ProfessionalTitle;
            user.About = application.About;
            user.WorkAvatar = application.WorkAvatar;

            if (!await userManager.IsInRoleAsync(user, AppConstants.RoleNames.Instructor))
            {
                var result = await userManager.AddToRoleAsync(user, AppConstants.RoleNames.Instructor);
                if (!result.Succeeded)
                    throw new BadRequestException("Failed to assign instructor role.", ErrorCode.CannotAssignRole);
            }
        }
        else
        {
            application.Status = InstructorApplicationStatus.Rejected;
            application.LastRejectedAt = DateTime.UtcNow;
        }

        await context.SaveChangesAsync();
        return new Success("Instructor application reviewed successfully.");
    }

    public async Task<Paged<InstructorApplicationVm>> GetList(GridifyQuery query)
    {
        return await context.InstructorApplications
            .AsNoTracking()
            .Include(a => a.WorkAvatar)
            .Include(a => a.User)
            .GridifyToAsync<InstructorApplication, InstructorApplicationVm>(query, mapper, gridifyMapper);
    }

    public async Task<InstructorApplicationVm> GetSelf()
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();
        var application = await context.InstructorApplications
            .AsNoTracking()
            .Where(a => a.UserId == currentUser.Id)
            .Include(x => x.WorkAvatar)
            .ProjectTo<InstructorApplicationVm>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();

        if (application == null)
            throw new NotFoundException("Instructor application not found for the current user.");

        return application;
    }
}