using AutoMapper;
using BLL.BusinessServices.Abstract;
using BLL.DTOs.EnrollmentDTOs;
using BLL.Exceptions;
using BLL.Gridify;
using BLL.Gridify.CustomModels;
using BLL.Models;
using BLL.Validations;
using DAL.Data;
using DAL.Data.Entities;
using DAL.Utilities.CurrentUserUtility;
using DAL.Utilities.MediaUtility.Abstract;
using Gridify;
using Microsoft.EntityFrameworkCore;

namespace BLL.BusinessServices.Concrete;

public class EnrollmentService(
    ApplicationDbContext context,
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
            throw new BadRequestException("No remaining quantity for this item", ErrorCode.InvalidOperation);

        //validate if the user is already enrolled in the course
        var alreadyEnrolled = await context.Enrollments
            .AnyAsync(e => e.UserId == currentUser.Id && e.CourseId == inventoryItem.CourseId);
        if (alreadyEnrolled)
            throw new BadRequestException("User is already enrolled in this course", ErrorCode.InvalidOperation);

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

    public async Task<Paged<EnrollmentVm>> GetListSelf(GridifyQuery query)
    {
        return await context.Enrollments
            .AsNoTracking()
            .GridifyToAsync<Enrollment, EnrollmentVm>(query, mapper, gridifyMapper);
    }
}