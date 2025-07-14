using BLL.BusinessServices.Abstract;
using BLL.DTOs.CourseDTOs;
using BLL.Gridify.CustomModels;
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

    // GET: api/Courses/id
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

    // GET: api/Courses/Learning/{id:guid}
    [HttpGet("Learning/{id:guid}")]
    [Authorize]
    [ProducesResponseType<LearningCourseVm>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetCourseLearning(Guid id)
    {
        var course = await courseService.GetCourseLearning(id);
        return Ok(course);
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

    // DELETE: api/Courses/id
    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await courseService.Delete(id);
        return Ok(result);
    }

    // POST: api/Courses/{id:guid}/Submit
    [HttpPost("{id:guid}/Submit")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SubmitCourse(Guid id)
    {
        var result = await courseService.SubmitCourse(id);
        return Ok(result);
    }

    // POST: api/Courses/Moderate
    [HttpPost("Moderate")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ModerateCourse([FromBody] ModerateCourseCommand command)
    {
        var result = await courseService.ModerateCourse(command);
        return Ok(result);
    }

    // POST: api/Courses/{id:guid}/RetrySubmission
    [HttpPost("{id:guid}/RetrySubmission")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RetryCourseSubmission(Guid id)
    {
        var result = await courseService.RetryCourseSubmission(id);
        return Ok(result);
    }

    // GET: api/Courses/{courseId}/Instructor
    [HttpGet("{courseId:guid}/Instructor")]
    [ProducesResponseType<InstructorVm>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetInstructorByCourseId(Guid courseId)
    {
        var instructor = await courseService.GetInstructorByCourseId(courseId);
        return Ok(instructor);
    }
}