using BLL.BusinessServices.Abstract;
using BLL.DTOs.GiftDTOs;
using BLL.Gridify.CustomModels;
using Gridify;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GiftsController(IGiftService giftService) : ControllerBase
{
    [HttpPost]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreateGiftCommand command)
    {
        var result = await giftService.Create(command);
        return Ok(result);
    }

    [HttpPost("{giftId:guid}/Redeem")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RedeemGift(Guid giftId)
    {
        var result = await giftService.RedeemGift(giftId);
        return Ok(result);
    }

    [HttpPost("{giftId:guid}/Revoke")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RevokeGift(Guid giftId)
    {
        var result = await giftService.RevokeGift(giftId);
        return Ok(result);
    }

    [HttpPut("ChangeReceiver")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ChangeGiftReceiver([FromBody] ChangeGiftReceiverCommand command)
    {
        var result = await giftService.ChangeGiftReceiver(command);
        return Ok(result);
    }

    [HttpGet("sent")]
    [Authorize]
    [ProducesResponseType<Paged<GiftVm>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetSentGiftsSelf([FromQuery] GridifyQuery query)
    {
        var gifts = await giftService.GetSentGiftsSelf(query);
        return Ok(gifts);
    }

    [HttpGet("received")]
    [Authorize]
    [ProducesResponseType<Paged<GiftVm>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetReceivedGiftsSelf([FromQuery] GridifyQuery query)
    {
        var gifts = await giftService.GetReceivedGiftsSelf(query);
        return Ok(gifts);
    }
}