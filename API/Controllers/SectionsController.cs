using Application.Common.Interfaces.AppInterfaces;
using Application.DTOs.SectionDTOs;
using Gridify;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SectionsController(ISectionService sectionService) : ControllerBase
{
    // GET: api/sections
    [HttpGet]
    [ProducesResponseType<Paging<SectionVm>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetList([FromQuery] GridifyQuery query)
    {
        var sections = await sectionService.GetList(query);
        return Ok(sections);
    }

    // GET: api/sections/{id}
    [HttpGet("{id:guid}")]
    [ProducesResponseType<SectionVm>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var section = await sectionService.GetById(id);
        return Ok(section);
    }

    // POST: api/sections
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreateSectionCommand command)
    {
        var result = await sectionService.Create(command);
        return StatusCode(StatusCodes.Status201Created, result);
    }

    // PUT: api/sections
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update([FromBody] UpdateSectionCommand command)
    {
        var result = await sectionService.Update(command);
        return Ok(result);
    }

    // DELETE: api/sections/{id}
    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await sectionService.Delete(id);
        return Ok(result);
    }

    // PUT: api/sections/reorder-section
    [HttpPut("reorder-section")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ReorderSection([FromBody] ReorderSectionCommand command)
    {
        var result = await sectionService.ReorderSection(command);
        return Ok(result);
    }
}