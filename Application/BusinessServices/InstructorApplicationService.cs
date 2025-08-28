using Application.Common.Interfaces;
using Application.Common.Interfaces.ApplicationInterfaces;
using Application.Common.Interfaces.InfrastructureInterfaces;
using Application.Common.Models;
using Application.DTOs.InstructorApplicationDTOs;
using Application.Exceptions;
using Application.Gridify;
using Application.Gridify.CustomModels;
using Application.Validations;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Constants;
using Domain.Entities;
using Domain.Enums;
using Gridify;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.BusinessServices;

public class InstructorApplicationService(
    IApplicationDbContext context,
    IGridifyMapper<InstructorApplication> gridifyMapper,
    IMapper mapper,
    IValidationService validationService,
    IMediaManager mediaManager,
    ICurrentUserUtility currentUserUtility,
    UserManager<ApplicationUser> userManager) : IInstructorApplicationService
{
    private const int MaxRetryCount = AppConstants.InstructorApplication.MaxRetryCount;
    private const int RetryCooldownDays = AppConstants.InstructorApplication.RetryCooldownDays;

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

        var media = await mediaManager.SaveFileAsync(command.Avatar, MediaType.Image);
        await context.Media.AddAsync(media);

        var application = mapper.Map<InstructorApplication>(command);
        application.UserId = currentUser.Id;
        application.Avatar = media;

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
            .Include(a => a.Avatar)
            .OrderByDescending(a => a.CreatedAt)
            .FirstOrDefaultAsync();

        if (application == null || application.Status != InstructorApplicationStatus.Rejected)
            throw new NotFoundException("No rejected instructor application found for the current user.");

        if (application.RetryCount >= MaxRetryCount)
            throw new BadRequestException(
                $"You have reached the maximum retry limit of {MaxRetryCount} for your instructor application.",
                ErrorCode.RetryLimitExceeded);

        if (application.LastRejectedAt.HasValue)
        {
            var cooldownEnd = application.LastRejectedAt.Value.AddDays(RetryCooldownDays);
            if (DateTime.Now < cooldownEnd)
                throw new BadRequestException(
                    $"Please retry after {cooldownEnd:g}.",
                    ErrorCode.RetryCooldown);
        }

        await validationService.ValidateAsync(command);

        if (command.Avatar != null && application.Avatar != null)
            await mediaManager.UpdateFileAsync(application.Avatar, command.Avatar);

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
            (DateTime.Now - latestRejected.LastRejectedAt.Value).TotalDays < RetryCooldownDays)
            return false;

        return true;
    }

    public async Task<Success> Review(ReviewInstructorApplicationCommand command)
    {
        await validationService.ValidateAsync(command);

        var application = await context.InstructorApplications
            .Include(x => x.User)
            .Include(x => x.Avatar)
            .FirstOrDefaultAsync(x => x.Id == command.Id);

        if (application == null)
            throw new NotFoundException("Instructor application not found.");

        if (application.Status != InstructorApplicationStatus.Pending)
            throw new BadRequestException("This application has already been reviewed.", ErrorCode.InvalidOperation);

        application.Note = command.Note;
        application.ReviewedAt = DateTime.Now;

        if (command.IsApproved)
        {
            application.Status = InstructorApplicationStatus.Approved;

            var user = application.User;
            user.FirstName = application.FirstName;
            user.LastName = application.LastName;
            user.ProfessionalTitle = application.ProfessionalTitle;
            user.About = application.About;
            user.Avatar = application.Avatar;

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
            application.LastRejectedAt = DateTime.Now;
        }

        await context.SaveChangesAsync();
        return new Success("Instructor application reviewed successfully.");
    }

    public async Task<Paged<InstructorApplicationVm>> GetList(GridifyQuery query)
    {
        return await context.InstructorApplications
            .AsNoTracking()
            .Include(a => a.Avatar)
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
            .Include(x => x.Avatar)
            .ProjectTo<InstructorApplicationVm>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();

        if (application == null)
            throw new NotFoundException("Instructor application not found for the current user.");

        return application;
    }
}