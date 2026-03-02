using Application.Common.Contracts.AppContracts;
using Application.DTOs.InstructorApplicationDTOs;
using Application.Gridify.CustomModels;
using Domain.Enums;
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
    [Authorize(Roles = nameof(RoleName.Admin))]
    [ProducesResponseType<Paged<InstructorApplicationVm>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetList([FromQuery] GridifyQuery query)
    {
        var applications = await service.GetList(query);
        return Ok(applications);
    }

    // GET: api/instructor-applications/{id}
    [HttpGet("{id}")]
    [Authorize(Roles = nameof(RoleName.Admin))]
    [ProducesResponseType<InstructorApplicationVm>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var application = await service.GetById(id);
        return Ok(application);
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

    // PUT: api/instructor-applications/resubmit
    [HttpPut("resubmit")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Resubmit([FromForm] ResubmitInstructorApplicationCommand command)
    {
        var result = await service.Resubmit(command);
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

    // GET: api/instructor-applications/self/retry-info
    [HttpGet("self/retry-info")]
    [Authorize]
    [ProducesResponseType<InstructorApplicationRetryInfoVm>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetRetryInfoSelf()
    {
        var retryInfo = await service.GetRetryInfoSelf();
        return Ok(retryInfo);
    }

    // POST: api/instructor-applications/moderate
    [HttpPost("moderate")]
    [Authorize(Roles = nameof(RoleName.Admin))]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Moderate([FromBody] ModerateInstructorApplicationCommand command)
    {
        var result = await service.Moderate(command);
        return Ok(result);
    }
}