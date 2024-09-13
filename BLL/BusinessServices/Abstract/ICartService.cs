using BLL.DTOs.CartDTOs;

namespace BLL.BusinessServices.Abstract;

public interface ICartService
{
    Task<CartVm> GetCart();

    Task<string> AddCartItem(AddCartItemCommand command);

    Task<string> UpdateCartItem(UpdateCartItemCommand command);

    Task<string> DeleteCartItem(DeleteCartItemCommand command);
}