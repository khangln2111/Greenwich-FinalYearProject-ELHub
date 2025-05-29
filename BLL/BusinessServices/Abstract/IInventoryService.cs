using BLL.DTOs.InventoryDTOs;
using BLL.Gridify.CustomModels;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface IInventoryService
{
    Task<Paged<InventoryItemVm>> GetInventoryItemsSelf(GridifyQuery query);
}