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


    [HttpPost("CreateOrder")]
    [Authorize]
    public async Task<IActionResult> CreateOrder()
    {
        var result = await orderService.CreateOrder();
        return Ok(new { clientSecret = result });
    }

    [HttpPost("ConfirmOrder")]
    [Authorize]
    public async Task<IActionResult> ConfirmOrder([FromBody] ConfirmOrderCommand command)
    {
        var result = await orderService.ConfirmOrder(command);
        return Ok(result);
    }
}