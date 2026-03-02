using Application.Common.Contracts.AppContracts;
using Application.DTOs.CartDTOs;
using Application.Gridify.CustomModels;
using Gridify;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CartController(ICartService cartService) : ControllerBase
{
    // GET: api/cart/self
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

    // GET: api/cart/self/cart-items
    [HttpGet("self/cart-items")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<Paged<CartItemVm>>> GetCartItemsSelf([FromQuery] GridifyQuery query)
    {
        var result = await cartService.GetCartItemsSelf(query);
        return Ok(result);
    }

    // GET: api/cart/self/cart-item-count
    [HttpGet("self/cart-item-count")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<int>> GetCartItemCountSelf()
    {
        var result = await cartService.GetCartItemCountSelf();
        return Ok(result);
    }


    // POST: api/cart/add-cart-item
    [HttpPost("add-cart-item")]
    [Authorize]
    public async Task<ActionResult<string>> AddCartItem(AddCartItemCommand command)
    {
        var result = await cartService.AddCartItem(command);
        return Ok(result);
    }


    // PUT: api/cart/update-cart-item
    [HttpPut("update-cart-item")]
    [Authorize]
    public async Task<ActionResult<string>> UpdateCartItem(UpdateCartItemCommand command)
    {
        var result = await cartService.UpdateCartItem(command);
        return Ok(result);
    }

    // DELETE: api/cart/{cart-item-id}
    [HttpDelete("{cartItemId:guid}")]
    [Authorize]
    public async Task<ActionResult<string>> DeleteCartItem(Guid cartItemId)
    {
        var result = await cartService.DeleteCartItem(cartItemId);
        return Ok(result);
    }
}