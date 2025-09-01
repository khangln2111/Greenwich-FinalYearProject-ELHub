using Application.Common.Interfaces.AppInterfaces;
using Application.DTOs.IdentityDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class IdentityController(IIdentityService identityService) : ControllerBase
{
    // POST: api/identity/register
    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register([FromBody] RegisterCommand command)
    {
        var result = await identityService.Register(command);
        return StatusCode(StatusCodes.Status201Created, result);
    }

    // POST: api/identity/login
    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Login([FromBody] LoginCommand command)
    {
        await identityService.Login(command);
        return Empty;
    }

    // POST: api/identity/login-custom
    [HttpPost("login-custom")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> LoginCustom([FromBody] LoginCommand command)
    {
        var result = await identityService.LoginCustom(command);
        return Ok(result);
    }

    //Login with Google
    // POST: api/identity/login-with-google
    [HttpPost("login-with-google")]
    public async Task<IActionResult> LoginWithGoogle([FromBody] GoogleLoginCommand command)
    {
        await identityService.LoginWithGoogle(command);
        return Empty;
    }


    // POST: api/identity/send-email-confirmation-otp
    [HttpPost("send-email-confirmation-otp")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SendEmailConfirmationOtp([FromBody] ResendConfirmationEmailCommand command)
    {
        var result = await identityService.SendEmailConfirmationOtp(command);

        return Ok(result);
    }

    // POST: api/identity/confirm-email
    [HttpPost("confirm-email")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailCommand command)
    {
        var result = await identityService.ConfirmEmail(command);
        return Ok(result);
    }


    // POST: api/identity/send-reset-password-otp
    [HttpPost("send-reset-password-otp")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> SendResetPasswordOtp([FromBody] SendResetPasswordOtpCommand command)
    {
        var result = await identityService.SendResetPasswordOtp(command);


        return Ok(result);
    }

    // POST: api/identity/validate-reset-password-otp
    [HttpPost("validate-reset-password-otp")]
    public async Task<IActionResult> ValidateResetPasswordOtp([FromBody] ValidateResetPasswordOtpCommand command)
    {
        var result = await identityService.ValidateResetPasswordOtp(command);
        return Ok(result);
    }

    // POST: api/identity/reset-password
    [HttpPost("reset-password")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordCommand command)
    {
        var result = await identityService.ResetPassword(command);
        return Ok(result);
    }

    // POST: api/identity/refresh-token
    [HttpPost("refresh-token")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenCommand command)
    {
        await identityService.RefreshToken(command);
        return Empty;
    }

    // GET: api/identity/self
    [HttpGet("self")]
    [Authorize]
    [ProducesResponseType<InfoMeVm>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetInfoSelf()
    {
        var result = await identityService.GetInfoSelf();
        return Ok(result);
    }

    // GET: api/identity/work-profile-self
    [HttpGet("work-profile-self")]
    [Authorize]
    [ProducesResponseType<WorkProfileVm>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetWorkProfileSelf()
    {
        var result = await identityService.GetWorkProfileSelf();
        return Ok(result);
    }

    // PUT: api/identity/update-user-profile-self
    [HttpPut("update-user-profile-self")]
    [Authorize]
    [ProducesResponseType<InfoMeVm>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> UpdateUserProfileSelf([FromForm] UpdateUserProfileSelfCommand command)
    {
        var result = await identityService.UpdateUserProfileSelf(command);
        return Ok(result);
    }

    // PUT: api/identity/update-work-profile-self
    [HttpPut("update-work-profile-self")]
    [Authorize]
    [ProducesResponseType<InfoMeVm>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> UpdateWorkProfileSelf([FromForm] UpdateWorkProfileSelfCommand command)
    {
        var result = await identityService.UpdateWorkProfileSelf(command);
        return Ok(result);
    }
}