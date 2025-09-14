using Application.Common.Contracts.GeneralContracts;
using Application.Common.Models;
using Application.DTOs.CartDTOs;

namespace Application.Common.Contracts.AppContracts;

public interface ICartService : IAppService
{
    Task<CartVm> GetCartSelf();

    Task<Success> AddCartItem(AddCartItemCommand command);

    Task<Success> UpdateCartItem(UpdateCartItemCommand command);

    Task<Success> DeleteCartItem(Guid cartItemId);
}