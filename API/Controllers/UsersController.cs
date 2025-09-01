using Application.Common.Interfaces.AppInterfaces;
using Application.Common.Models;
using Application.DTOs.UserDTOs;
using Application.Gridify.CustomModels;
using Gridify;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController(IUserService userService) : ControllerBase
{
    // GET: api/users
    [HttpGet]
    [ProducesResponseType<Paged<UserVm>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetList([FromQuery] GridifyQuery query)
    {
        var users = await userService.GetList(query);
        return Ok(users);
    }

    // GET: api/users/{id}
    [HttpGet("{id:guid}")]
    [ProducesResponseType<UserDetailVm>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var user = await userService.GetById(id);
        return Ok(user);
    }

    // POST: api/users/assign-roles
    [HttpPost("assign-roles")]
    [ProducesResponseType<Success>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AssignRolesToUser([FromBody] AssignRolesToUserCommand command)
    {
        var result = await userService.AssignRolesToUser(command);
        return Ok(result);
    }

    // PUT: api/users/set-activation
    [HttpPut("set-activation")]
    [ProducesResponseType<Success>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SetUserActivation([FromBody] SetUserActivationCommand command)
    {
        var result = await userService.SetUserActivation(command);
        return Ok(result);
    }

    // PUT: api/users
    [HttpPut]
    [ProducesResponseType<Success>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateUser([FromForm] UpdateUserCommand command)
    {
        var result = await userService.UpdateUser(command);
        return Ok(result);
    }
}