using Application.Common.Interfaces;
using Application.Common.Interfaces.AppInterfaces;
using Application.Common.Interfaces.InfrastructureInterfaces;
using Application.Common.Models;
using Application.DTOs.UserDTOs;
using Application.Exceptions;
using Application.Gridify;
using Application.Gridify.CustomModels;
using Application.Validations;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Gridify;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.AppServices;

public class UserService(
    IApplicationDbContext context,
    UserManager<ApplicationUser> userManager,
    IMapper mapper,
    IGridifyMapper<ApplicationUser> gridifyMapper,
    IValidationService validationService,
    IMediaManager mediaManager) : IUserService
{
    public async Task<Paged<UserVm>> GetList(GridifyQuery query)
    {
        return await context.Users
            .AsNoTracking()
            .Include(u => u.Roles)
            .Include(u => u.Avatar)
            .GridifyToAsync<ApplicationUser, UserVm>(query, mapper, gridifyMapper);
    }

    public async Task<UserDetailVm> GetById(Guid id)
    {
        var user = await context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id);

        if (user == null) throw new NotFoundException(nameof(ApplicationUser), id);

        return mapper.Map<UserDetailVm>(user);
    }

    public async Task<Success> AssignRolesToUser(AssignRolesToUserCommand command)
    {
        await validationService.ValidateAsync(command);
        var user = await userManager.FindByIdAsync(command.UserId);
        if (user == null) throw new NotFoundException(nameof(ApplicationUser), command.UserId);

        var currentRoles = await userManager.GetRolesAsync(user);

        var removeResult = await userManager.RemoveFromRolesAsync(user, currentRoles);
        if (!removeResult.Succeeded) throw new BadRequestException(removeResult.Errors);

        var upperRoleNames = command.Roles.Select(r => r.ToUpper()).ToList();

        var addResult = await userManager.AddToRolesAsync(user, upperRoleNames);
        if (!addResult.Succeeded) throw new BadRequestException(addResult.Errors);
        await userManager.UpdateAsync(user);

        return new Success("Roles assigned successfully.");
    }

    public async Task<Success> SetUserActivation(SetUserActivationCommand command)
    {
        await validationService.ValidateAsync(command);
        var user = await userManager.FindByIdAsync(command.UserId);
        if (user == null) throw new NotFoundException(nameof(ApplicationUser), command.UserId);
        if (user.IsActivated == command.IsActive)
            return new Success("No changes made, user is already in the desired state.");
        user.IsActivated = command.IsActive;
        await userManager.UpdateAsync(user);
        return new Success($"User activation status set to {command.IsActive}.");
    }

    public async Task<Success> UpdateUser(UpdateUserCommand command)
    {
        await validationService.ValidateAsync(command);
        var user = await context.Users
            .Include(u => u.Avatar)
            .FirstOrDefaultAsync(u => u.Id == command.Id);
        if (user == null) throw new NotFoundException(nameof(ApplicationUser), command.Id);

        if (command.Avatar != null && user.Avatar == null)
        {
            var avatar = await mediaManager.SaveFile(command.Avatar, MediaType.Image);
            await context.Media.AddAsync(avatar);
            user.Avatar = avatar;
        }

        if (command.Avatar != null && user.Avatar != null)
            await mediaManager.UpdateFile(user.Avatar, command.Avatar);
        mapper.Map(command, user);
        await userManager.UpdateAsync(user);
        await context.SaveChangesAsync();
        return new Success("User profile updated successfully.");
    }
}