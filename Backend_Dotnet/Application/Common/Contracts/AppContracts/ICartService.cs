using Application.Common.Contracts.GeneralContracts;
using Application.Common.Models;
using Application.DTOs.CartDTOs;
using Application.Gridify.CustomModels;
using Gridify;

namespace Application.Common.Contracts.AppContracts;

public interface ICartService : IAppService
{
    Task<CartVm> GetCartSelf();

    Task<int> GetCartItemCountSelf();

    Task<Paged<CartItemVm>> GetCartItemsSelf(GridifyQuery query);

    Task<Success> AddCartItem(AddCartItemCommand command);

    Task<Success> UpdateCartItem(UpdateCartItemCommand command);

    Task<Success> DeleteCartItem(Guid cartItemId);
}