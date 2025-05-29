using BLL.BusinessServices.Abstract;
using Gridify;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class InventoriesController(IInventoryService inventoryService) : ControllerBase
{
    [HttpGet("InventoryItems/self")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetInventoryItemsSelf([FromQuery] GridifyQuery query)
    {
        var result = await inventoryService.GetInventoryItemsSelf(query);
        return Ok(result);
    }
}