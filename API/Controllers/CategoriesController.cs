using Application.Common.Interfaces.ApplicationInterfaces;
using Application.DTOs.CategoryDTOs;
using Gridify;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController(ICategoryService categoryService) : ControllerBase
{
    // GET: api/Categories
    [HttpGet]
    [ProducesResponseType<Paging<CategoryVm>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetList([FromQuery] GridifyQuery query)
    {
        var categories = await categoryService.GetList(query);
        return Ok(categories);
    }

    // GET: api/Categories/id
    [HttpGet("{id}")]
    [ProducesResponseType<CategoryVm>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var category = await categoryService.GetById(id);
        return Ok(category);
    }

    // POST: api/Categories
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromForm] CreateCategoryCommand command)
    {
        var result = await categoryService.Create(command);
        return StatusCode(StatusCodes.Status201Created, result);
    }

    // PUT: api/Categories/id
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update([FromForm] UpdateCategoryCommand command)
    {
        var result = await categoryService.Update(command);
        return Ok(result);
    }


    // DELETE: api/Categories/id
    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await categoryService.Delete(id);
        return Ok(result);
    }
}