using BLL.BusinessServices.Abstract;
using BLL.DTOs.EnrollmentDTOs;
using Gridify;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EnrollmentsController(IEnrollmentService enrollmentService) : ControllerBase
{
    [HttpPost("EnrollFromInventory")]
    public async Task<IActionResult> EnrollFromInventory([FromBody] EnrollFromInventoryCommand command)
    {
        var result = await enrollmentService.EnrollFromInventory(command);
        return Ok(result);
    }

    [HttpGet("self")]
    public async Task<IActionResult> GetListSelf([FromQuery] GridifyQuery query)
    {
        var result = await enrollmentService.GetListSelf(query);
        return Ok(result);
    }
}