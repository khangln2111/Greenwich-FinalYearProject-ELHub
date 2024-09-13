using BLL.BusinessServices.Abstract;
using BLL.DTOs.IdentityDTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class IdentityController(IIdentityService identityService) : ControllerBase
{
    // POST: api/Identity/Register
    [HttpPost("Register")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register([FromBody] RegisterCommand command)
    {
        var result = await identityService.RegisterAsync(command);
        return StatusCode(StatusCodes.Status201Created, result);
    }

    // POST: api/Identity/Login
    [HttpPost("Login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Login([FromBody] LoginCommand command)
    {
        await identityService.LoginAsync(command);
        return Empty;
    }

    //Login with google
    // POST: api/Identity/GoogleLogin
    [HttpPost("GoogleLogin")]
    public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginCommand command)
    {
        await identityService.GoogleLoginAsync(command);
        return Empty;
    }


    // POST: api/Identity/ConfirmEmail
    [HttpPost("ConfirmEmail")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailCommand command)
    {
        var result = await identityService.ConfirmEmailAsync(command);
        return Ok(result);
    }

    // Post: api/Identity/ResendConfirmationEmail
    [HttpPost("ResendConfirmationEmail")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ResendConfirmationEmail([FromBody] ResendConfirmationEmailCommand command)
    {
        var result = await identityService.ResendConfirmationEmailAsync(command);
        return Ok(result);
    }


    // POST: api/Identity/ForgotPassword
    [HttpPost("ForgotPassword")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordCommand command)
    {
        var result = await identityService.ForgotPasswordAsync(command);
        return Ok(result);
    }

    // POST: api/Identity/ResetPassword
    [HttpPost("ResetPassword")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordCommand command)
    {
        var result = await identityService.ResetPasswordAsync(command);
        return Ok(result);
    }

    // POST: api/Identity/RefreshToken
    [HttpPost("RefreshToken")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenCommand command)
    {
        await identityService.RefreshTokenAsync(command);
        return Empty;
    }
}