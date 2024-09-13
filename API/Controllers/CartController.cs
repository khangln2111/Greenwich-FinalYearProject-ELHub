using BLL.BusinessServices.Abstract;
using BLL.DTOs.CartDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CartController(ICartService cartService) : ControllerBase
{
    [HttpGet("GetCartSelf")]
    [Authorize]
    public async Task<ActionResult<CartVm>> GetCart()
    {
        var result = await cartService.GetCart();
        return Ok(result);
    }

    [HttpPost("AddCartItem")]
    [Authorize]
    public async Task<ActionResult<string>> AddCartItem(AddCartItemCommand command)
    {
        var result = await cartService.AddCartItem(command);
        return Ok(result);
    }

    [HttpPut("UpdateCartItem")]
    [Authorize]
    public async Task<ActionResult<string>> UpdateCartItem(UpdateCartItemCommand command)
    {
        var result = await cartService.UpdateCartItem(command);
        return Ok(result);
    }

    [HttpDelete("DeleteCartItem")]
    [Authorize]
    public async Task<ActionResult<string>> DeleteCartItem(DeleteCartItemCommand command)
    {
        var result = await cartService.DeleteCartItem(command);
        return Ok(result);
    }
}