using Application.Common.Contracts;
using Application.Common.Contracts.AppContracts;
using Application.Common.Contracts.GeneralContracts;
using Application.Common.Contracts.InfraContracts;
using Application.Common.Models;
using Application.DTOs.EnrollmentDTOs;
using Application.Exceptions;
using Application.Gridify;
using Application.Gridify.CustomModels;
using Application.Validations;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Domain.Enums;
using Gridify;
using Microsoft.EntityFrameworkCore;

namespace Application.AppServices;

public class EnrollmentService(
    IApplicationDbContext context,
    IMapper mapper,
    IGridifyMapper<Enrollment> gridifyMapper,
    IValidationService validationService,
    ICurrentUserUtility currentUserUtility
) : IEnrollmentService
{
    public async Task<Success> EnrollFromInventory(EnrollFromInventoryCommand command)
    {
        var currentUser = currentUserUtility.GetCurrentUser();

        if (currentUser == null) throw new UnauthorizedException();

        await validationService.ValidateAsync(command);

        var inventoryItem = await context.InventoryItems
            .Include(ii => ii.Inventory)
            .FirstOrDefaultAsync(ii => ii.Id == command.InventoryItemId && ii.Inventory.UserId == currentUser.Id);

        if (inventoryItem == null)
            throw new NotFoundException("Inventory item not found or does not belong to the current user");

        if (inventoryItem.Quantity <= 0)
            throw new BadRequestException("No remaining quantity for this item", ErrorCode.NoInventoryLeft);

        //validate if the user is already enrolled in the course
        var alreadyEnrolled = await context.Enrollments
            .AnyAsync(e => e.UserId == currentUser.Id && e.CourseId == inventoryItem.CourseId);
        if (alreadyEnrolled)
            throw new BadRequestException("User is already enrolled in this course", ErrorCode.CourseAlreadyEnrolled);

        // Create a new enrollment
        var enrollment = new Enrollment
        {
            UserId = currentUser.Id,
            CourseId = inventoryItem.CourseId
        };

        await context.Enrollments.AddAsync(enrollment);

        inventoryItem.Quantity--;
        await context.SaveChangesAsync();

        return new Success("Enrolled successful");
    }

    public async Task<Paged<EnrollmentSelfVm>> GetListSelf(GridifyQuery query)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();


        var enrollments = await context.Enrollments
            .AsNoTracking()
            .Where(e => e.UserId == currentUser.Id)
            .GridifyToAsync<Enrollment, EnrollmentSelfVm>(query, mapper, gridifyMapper);

        return enrollments;
    }

    public async Task<EnrollmentDetailSelfVm> GetByIdSelf(Guid id)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null)
            throw new UnauthorizedException();

        var enrollmentVm = await context.Enrollments
            .AsNoTracking()
            .Where(e => e.Id == id && e.UserId == currentUser.Id)
            .ProjectTo<EnrollmentDetailSelfVm>(mapper.ConfigurationProvider, new
            {
                enrollmentId = id
            })
            .FirstOrDefaultAsync();

        if (enrollmentVm == null)
            throw new NotFoundException(nameof(Enrollment), id);

        return enrollmentVm;
    }
}