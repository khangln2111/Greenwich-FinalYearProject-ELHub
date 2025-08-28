using Application.DTOs.InventoryDTOs;
using Application.Gridify.CustomModels;
using Gridify;

namespace Application.Common.Interfaces.ApplicationInterfaces;

public interface IInventoryService
{
    Task<Paged<InventoryItemVm>> GetInventoryItemsSelf(GridifyQuery query);
}