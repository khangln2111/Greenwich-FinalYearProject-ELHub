using BLL.DTOs.CartDTOs;
using BLL.Models;

namespace BLL.BusinessServices.Abstract;

public interface ICartService
{
    Task<CartVm> GetCartMe();

    Task<Success> AddCartItem(AddCartItemCommand command);

    Task<Success> UpdateCartItem(UpdateCartItemCommand command);

    Task<Success> DeleteCartItem(Guid cartItemId);
}