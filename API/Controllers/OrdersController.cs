using BLL.BusinessServices.Abstract;
using BLL.DTOs.OrderDTOs;
using Gridify;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OrdersController(IOrderService orderService) : ControllerBase
{
    [HttpGet]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetList([FromQuery] GridifyQuery query)
    {
        var result = await orderService.GetList(query);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await orderService.GetById(id);
        return Ok(result);
    }

    [HttpGet("self")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetListSelf([FromQuery] GridifyQuery query)
    {
        var result = await orderService.GetListSelf(query);
        return Ok(result);
    }

    [HttpGet("self/{id:guid}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetByIdSelf(Guid id)
    {
        var result = await orderService.GetByIdSelf(id);
        return Ok(result);
    }


    [HttpPost("CreatePaymentIntent")]
    [Authorize]
    public async Task<IActionResult> CreatePaymentIntent([FromBody] CreatePaymentIntentCommand command)
    {
        var result = await orderService.CreatePaymentIntent(command);
        return Ok(result);
    }

    [HttpGet("ConfirmPaymentIntent/{paymentIntentId}")]
    [Authorize]
    public async Task<IActionResult> ConfirmPaymentIntent(string paymentIntentId)
    {
        if (string.IsNullOrEmpty(paymentIntentId))
            return BadRequest("paymentIntentId is required.");
        var result = await orderService.ConfirmPaymentIntent(paymentIntentId);
        return Ok(result);
    }
}