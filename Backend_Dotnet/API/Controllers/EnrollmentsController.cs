using Application.Common.Contracts.AppContracts;
using Application.DTOs.EnrollmentDTOs;
using Gridify;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EnrollmentsController(IEnrollmentService enrollmentService) : ControllerBase
{
    // POST: api/enrollments/enroll-from-inventory
    [HttpPost("enroll-from-inventory")]
    [Authorize]
    public async Task<IActionResult> EnrollFromInventory([FromBody] EnrollFromInventoryCommand command)
    {
        var result = await enrollmentService.EnrollFromInventory(command);
        return Ok(result);
    }

    // GET: api/enrollments/self
    [HttpGet("self")]
    [Authorize]
    public async Task<IActionResult> GetListSelf([FromQuery] GridifyQuery query)
    {
        var result = await enrollmentService.GetListSelf(query);
        return Ok(result);
    }

    // GET: api/enrollments/self/{id}
    [HttpGet("self/{id:guid}")]
    [Authorize]
    public async Task<IActionResult> GetByIdSelf(Guid id)
    {
        var result = await enrollmentService.GetByIdSelf(id);
        return Ok(result);
    }
}