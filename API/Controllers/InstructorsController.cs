using BLL.BusinessServices.Abstract;
using BLL.DTOs.CourseDTOs;
using BLL.DTOs.InstructorDTO;
using BLL.Gridify.CustomModels;
using Gridify;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class InstructorsController(IInstructorService instructorService) : ControllerBase
{
    // GET: api/Instructors
    [HttpGet]
    [ProducesResponseType<Paged<InstructorVm>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetList([FromQuery] GridifyQuery query)
    {
        var instructors = await instructorService.GetList(query);
        return Ok(instructors);
    }

    // GET: api/Instructors/id
    [HttpGet("{id:guid}")]
    [ProducesResponseType<InstructorVm>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var instructor = await instructorService.GetById(id);
        return Ok(instructor);
    }

    // GET: api/Instructors/{instructorId}/Courses
    [HttpGet("{instructorId:guid}/Courses")]
    [ProducesResponseType<Paged<CourseVm>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCoursesByInstructorId(Guid instructorId, [FromQuery] GridifyQuery query)
    {
        var courses = await instructorService.GetCoursesByInstructorId(instructorId, query);
        return Ok(courses);
    }
}