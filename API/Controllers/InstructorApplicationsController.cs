using Application.Common.Interfaces.AppInterfaces;
using Application.DTOs.InstructorApplicationDTOs;
using Application.Gridify.CustomModels;
using Gridify;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/instructor-applications")]
[ApiController]
public class InstructorApplicationsController(IInstructorApplicationService service) : ControllerBase
{
    // GET: api/instructor-applications
    [HttpGet]
    [ProducesResponseType<Paged<InstructorApplicationVm>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetList([FromQuery] GridifyQuery query)
    {
        var applications = await service.GetList(query);
        return Ok(applications);
    }


    // POST: api/instructor-applications
    [HttpPost]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromForm] CreateInstructorApplicationCommand command)
    {
        var result = await service.Create(command);
        return StatusCode(StatusCodes.Status201Created, result);
    }

    // PUT: api/instructor-applications/retry
    [HttpPut("retry")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Retry([FromForm] RetryInstructorApplicationCommand command)
    {
        var result = await service.Retry(command);
        return Ok(result);
    }

    // GET: api/instructor-applications/self
    [HttpGet("self")]
    [Authorize]
    [ProducesResponseType<InstructorApplicationVm>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetSelf()
    {
        var application = await service.GetSelf();
        return Ok(application);
    }

    // GET: api/instructor-applications/self/can-retry
    [HttpGet("self/can-retry")]
    [Authorize]
    [ProducesResponseType<bool>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> CanRetrySelf()
    {
        var canRetry = await service.CanRetrySelf();
        return Ok(canRetry);
    }

    // POST: api/instructor-applications/review
    [HttpPost("review")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Review([FromBody] ReviewInstructorApplicationCommand command)
    {
        var result = await service.Review(command);
        return Ok(result);
    }
}