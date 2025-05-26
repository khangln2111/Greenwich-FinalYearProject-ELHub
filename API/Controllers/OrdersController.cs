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
    public async Task<IActionResult> GetList([FromQuery] GridifyQuery query)
    {
        var result = await orderService.GetList(query);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    [Authorize]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await orderService.GetById(id);
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