using AutoMapper;
using AutoMapper.QueryableExtensions;
using BLL.BusinessServices.Abstract;
using BLL.DTOs.InventoryDTOs;
using BLL.Exceptions;
using BLL.Gridify;
using BLL.Gridify.CustomModels;
using BLL.Validations;
using DAL.Data;
using DAL.Data.Entities;
using DAL.Utilities.CurrentUserUtility;
using Gridify;
using Gridify.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace BLL.BusinessServices.Concrete;

public class InventoryService(
    ICurrentUserUtility currentUserUtility,
    IMapper mapper,
    IGridifyMapper<InventoryItem> gridifyMapper,
    IValidationService validationService,
    ApplicationDbContext context
) : IInventoryService
{
    public async Task<Paged<InventoryItemVm>> GetInventoryItemsSelf(GridifyQuery query)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        var result = await context.InventoryItems
            .AsNoTracking()
            .Where(i => i.Inventory.UserId == currentUser.Id)
            .GridifyProjectionAsync(query, gridifyMapper, q =>
                q.Select(i => new InventoryItemVm
                {
                    Id = i.Id,
                    CourseId = i.CourseId,
                    CourseTitle = i.Course.Title,
                    CourseDescription = i.Course.Description,
                    CourseImageUrl = i.Course.Image != null ? i.Course.Image.Url : null,
                    Quantity = i.Quantity,
                    Enrolled = context.Enrollments.Any(e => e.UserId == currentUser.Id && e.CourseId == i.CourseId)
                }));

        return result;
    }
}