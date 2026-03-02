using Application.Common.Contracts.AppContracts;
using Application.DTOs.GiftDTOs;
using Application.Gridify.CustomModels;
using Gridify;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GiftsController(IGiftService giftService) : ControllerBase
{
    // POST: api/gifts
    [HttpPost]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreateGiftCommand command)
    {
        var result = await giftService.Create(command);
        return Ok(result);
    }

    // POST: api/gifts/{giftId}/redeem
    [HttpPost("{giftId:guid}/redeem")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RedeemGift(Guid giftId)
    {
        var result = await giftService.RedeemGift(giftId);
        return Ok(result);
    }

    // POST: api/gifts/{giftId}/revoke
    [HttpPost("{giftId:guid}/revoke")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RevokeGift(Guid giftId)
    {
        var result = await giftService.RevokeGift(giftId);
        return Ok(result);
    }

    // PUT: api/gifts/change-receiver
    [HttpPut("change-receiver")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ChangeGiftReceiver([FromBody] ChangeGiftReceiverCommand command)
    {
        var result = await giftService.ChangeGiftReceiver(command);
        return Ok(result);
    }

    // GET: api/gifts/sent
    [HttpGet("sent")]
    [Authorize]
    [ProducesResponseType<Paged<GiftVm>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetSentGiftsSelf([FromQuery] GridifyQuery query)
    {
        var gifts = await giftService.GetSentGiftsSelf(query);
        return Ok(gifts);
    }

    // GET: api/gifts/received
    [HttpGet("received")]
    [Authorize]
    [ProducesResponseType<Paged<GiftVm>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetReceivedGiftsSelf([FromQuery] GridifyQuery query)
    {
        var gifts = await giftService.GetReceivedGiftsSelf(query);
        return Ok(gifts);
    }
}