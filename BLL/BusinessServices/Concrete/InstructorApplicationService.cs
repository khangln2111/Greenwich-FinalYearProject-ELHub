using AutoMapper;
using BLL.BusinessServices.Abstract;
using BLL.DTOs.InstructorApplicationDTOs;
using BLL.Exceptions;
using BLL.Models;
using BLL.Validations;
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
    public async Task<Success> Create(CreateInstructorApplicationCommand command)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        var existingApplication = await context.InstructorApplications
            .FirstOrDefaultAsync(x =>
                (x.UserId == currentUser.Id && x.Status == InstructorApplicationStatus.Pending) ||
                x.Status == InstructorApplicationStatus.Approved);

        if (existingApplication != null)
            throw new BadRequestException(
                "You already have an instructor application in progress or approved.", ErrorCode.InvalidOperation);

        await validationService.ValidateAsync(command);
        var application = mapper.Map<InstructorApplication>(command);
        application.UserId = currentUser.Id;
        var media = await mediaManager.SaveFileAsync(command.WorkAvatar, MediaType.Image);
        await context.Media.AddAsync(media);
        application.WorkAvatar = media;
        await context.InstructorApplications.AddAsync(application);
        await context.SaveChangesAsync();
        return new Success("Instructor application created successfully.");
    }

    public async Task<Success> Review(ReviewInstructorApplicationCommand command)
    {
        await validationService.ValidateAsync(command);
        var application = await context.InstructorApplications
            .Include(x => x.User)
            .Include(x => x.WorkAvatar)
            .FirstOrDefaultAsync(x => x.Id == command.Id);

        if (application == null) throw new NotFoundException("Instructor application not found.");

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

            //assign instructor role to user
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
        }

        await context.SaveChangesAsync();

        return new Success("Instructor application reviewed successfully.");
    }

    // get self instructor application
}