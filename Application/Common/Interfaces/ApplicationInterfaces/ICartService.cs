using Application.Common.Models;
using Application.DTOs.CartDTOs;

namespace Application.Common.Interfaces.ApplicationInterfaces;

public interface ICartService
{
    Task<CartVm> GetCartSelf();

    Task<Success> AddCartItem(AddCartItemCommand command);

    Task<Success> UpdateCartItem(UpdateCartItemCommand command);

    Task<Success> DeleteCartItem(Guid cartItemId);
}