using BLL.BusinessServices.Abstract;
using BLL.DTOs.CartDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CartController(ICartService cartService) : ControllerBase
{
    [HttpGet("self")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CartVm>> GetCartSelf()
    {
        var result = await cartService.GetCartSelf();
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

    [HttpDelete("{CartItemId:guid}")]
    [Authorize]
    public async Task<ActionResult<string>> DeleteCartItem(Guid cartItemId)
    {
        var result = await cartService.DeleteCartItem(cartItemId);
        return Ok(result);
    }
}