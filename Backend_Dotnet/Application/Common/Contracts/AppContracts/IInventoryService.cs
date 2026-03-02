using Application.Common.Contracts.GeneralContracts;
using Application.DTOs.InventoryDTOs;
using Application.Gridify.CustomModels;
using Gridify;

namespace Application.Common.Contracts.AppContracts;

public interface IInventoryService : IAppService
{
    Task<Paged<InventoryItemVm>> GetInventoryItemsSelf(GridifyQuery query);
}