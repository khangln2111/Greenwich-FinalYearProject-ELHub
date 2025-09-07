using Application.Common.Interfaces.AppInterfaces;
using Application.DTOs.CourseDTOs;
using Application.DTOs.EnrollmentDTOs;
using Application.DTOs.InstructorDTO;
using Application.Gridify.CustomModels;
using Gridify;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CoursesController(ICourseService courseService) : ControllerBase
{
    // GET: api/Courses
    [HttpGet]
    [ProducesResponseType<Paged<CourseVm>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetList([FromQuery] GridifyQuery query)
    {
        var courses = await courseService.GetList(query);
        return Ok(courses);
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
    [Authorize]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromForm] CreateCourseCommand command)
    {
        var result = await courseService.Create(command);
        return StatusCode(StatusCodes.Status201Created, result);
    }


    // PUT: api/Courses
    [HttpPut]
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
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await courseService.Delete(id);
        return Ok(result);
    }

    // POST: api/courses/{id}/submit
    [HttpPost("{id:guid}/submit")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SubmitCourse(Guid id)
    {
        var result = await courseService.SubmitCourse(id);
        return Ok(result);
    }

    // POST: api/courses/moderate
    [HttpPost("moderate")]
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
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ResubmitCourse(Guid id)
    {
        var result = await courseService.ResubmitCourse(id);
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