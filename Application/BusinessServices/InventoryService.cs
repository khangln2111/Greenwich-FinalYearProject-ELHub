using Application.Common.Interfaces;
using Application.Common.Interfaces.ApplicationInterfaces;
using Application.Common.Interfaces.InfrastructureInterfaces;
using Application.DTOs.InventoryDTOs;
using Application.Exceptions;
using Application.Gridify;
using Application.Gridify.CustomModels;
using AutoMapper;
using Domain.Entities;
using Gridify;
using Microsoft.EntityFrameworkCore;

namespace Application.BusinessServices;

public class InventoryService(
    ICurrentUserUtility currentUserUtility,
    IMapper mapper,
    IGridifyMapper<InventoryItem> gridifyMapper,
    IApplicationDbContext context
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
                    CourseSummary = i.Course.Summary,
                    CourseImageUrl = i.Course.Image != null ? i.Course.Image.Url : null,
                    Quantity = i.Quantity,
                    Enrolled = context.Enrollments.Any(e => e.UserId == currentUser.Id && e.CourseId == i.CourseId)
                }));

        return result;
    }
}