using BLL.BusinessServices.Abstract;
using BLL.DTOs.LectureDTOs;
using Gridify;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LecturesController(ILectureService lectureService) : ControllerBase
{
    // GET: api/Sections
    [HttpGet]
    [ProducesResponseType<Paging<LectureVm>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetList([FromQuery] GridifyQuery query)
    {
        var courses = await lectureService.GetList(query);
        return Ok(courses);
    }

    // GET: api/Sections/id
    [HttpGet("{id:guid}")]
    [ProducesResponseType<LectureVm>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var course = await lectureService.GetById(id);
        return Ok(course);
    }

    // POST: api/Sections
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromForm] CreateLectureCommand command)
    {
        var result = await lectureService.Create(command);
        return StatusCode(StatusCodes.Status201Created, result);
    }

    // PUT: api/Sections
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update([FromForm] UpdateLectureCommand command)
    {
        var result = await lectureService.Update(command);
        return Ok(result);
    }

    // DELETE: api/Sections/id  
    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await lectureService.Delete(id);
        return Ok(result);
    }
}