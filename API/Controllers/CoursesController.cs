using BLL.BusinessServices.Abstract;
using BLL.DTOs.CourseDTOs;
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
    [ProducesResponseType<Paging<CourseVm>>(StatusCodes.Status200OK)]
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

    // DELETE: api/Courses/id
    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await courseService.Delete(id);
        return Ok(result);
    }
}