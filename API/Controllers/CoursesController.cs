using Application.Common.Contracts.AppContracts;
using Application.DTOs.CourseDTOs;
using Application.DTOs.InstructorDTO;
using Application.Gridify.CustomModels;
using Domain.Enums;
using Gridify;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CoursesController(ICourseService courseService) : ControllerBase
{
    // GET: api/Courses/all
    [HttpGet("all")]
    [ProducesResponseType<Paged<CourseVm>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll([FromQuery] GridifyQuery query)
    {
        var courses = await courseService.GetAll(query);
        return Ok(courses);
    }

    [HttpGet("owned")]
    [Authorize(Roles = nameof(RoleName.Instructor))]
    public async Task<Paged<CourseVm>> GetOwned([FromQuery] GridifyQuery query)
    {
        return await courseService.GetOwned(query);
    }

    [HttpGet("published")]
    public async Task<Paged<CourseVm>> GetPublished([FromQuery] GridifyQuery query)
    {
        return await courseService.GetPublished(query);
    }

    // GET: api/courses/{id}
    [HttpGet("{id:guid}")]
    [ProducesResponseType<CourseVm>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var course = await courseService.GetById(id);
        return Ok(course);
    }

    // POST: api/Courses
    [HttpPost]
    [Authorize(Roles = nameof(RoleName.Instructor))]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromForm] CreateCourseCommand command)
    {
        var result = await courseService.Create(command);
        return StatusCode(StatusCodes.Status201Created, result);
    }


    // PUT: api/Courses
    [HttpPut]
    [Authorize(Roles = nameof(RoleName.Instructor))]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update([FromForm] UpdateCourseCommand command)
    {
        var result = await courseService.Update(command);
        return Ok(result);
    }

    // DELETE: api/courses/{id}
    [HttpDelete("{id:guid}")]
    [Authorize(Roles = nameof(RoleName.Admin))]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await courseService.Delete(id);
        return Ok(result);
    }

    // POST: api/courses/{id}/submit
    [HttpPost("{id:guid}/submit")]
    [Authorize(Roles = nameof(RoleName.Instructor))]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SubmitCourse(Guid id)
    {
        var result = await courseService.SubmitCourse(id);
        return Ok(result);
    }

    // POST: api/courses/moderate
    [HttpPost("moderate")]
    [Authorize(Roles = nameof(RoleName.Admin))]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ModerateCourse([FromBody] ModerateCourseCommand command)
    {
        var result = await courseService.ModerateCourse(command);
        return Ok(result);
    }

    // POST: api/courses/{id}/resubmit
    [HttpPost("{id:guid}/resubmit")]
    [Authorize(Roles = nameof(RoleName.Instructor))]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ResubmitCourse(Guid id)
    {
        var result = await courseService.ResubmitCourse(id);
        return Ok(result);
    }

    // PUT: api/courses/set-banned-status
    [HttpPut("set-banned-status")]
    [Authorize(Roles = nameof(RoleName.Admin))]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SetBannedStatus([FromBody] SetCourseBannedStatusCommand command)
    {
        var result = await courseService.SetBannedStatus(command);
        return Ok(result);
    }


    // GET: api/courses/{courseId}/instructor
    [HttpGet("{courseId:guid}/instructor")]
    [ProducesResponseType<InstructorVm>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetInstructorByCourseId(Guid courseId)
    {
        var instructor = await courseService.GetInstructorByCourseId(courseId);
        return Ok(instructor);
    }

    // GET: api/courses/{courseId}/current-user-enrollment-status
    [HttpGet("{courseId:guid}/current-user-enrollment-status")]
    [Authorize]
    [ProducesResponseType<CourseEnrollmentStatusVm>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetCurrentUserEnrollmentStatus(Guid courseId)
    {
        var status = await courseService.GetCurrentUserEnrollmentStatus(courseId);
        return Ok(status);
    }
}