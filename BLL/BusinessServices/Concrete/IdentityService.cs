using BLL.BusinessServices.Abstract;
using BLL.DTOs.IdentityDTOs;
using BLL.Exceptions;
using BLL.Validations;
using DAL.Data;
using DAL.Data.Entities;
using DAL.Utilities.EmailUtility;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace BLL.BusinessServices.Concrete;

public class IdentityService(
    UserManager<ApplicationUser> userManager,
    SignInManager<ApplicationUser> signInManager,
    IOptionsMonitor<BearerTokenOptions> bearerTokenOptions,
    TimeProvider timeProvider,
    IValidationService validationService,
    IEmailUtility emailUtility,
    ApplicationDbContext context)
    : IIdentityService
{
    public async Task<string> RegisterAsync(RegisterCommand command)
    {
        await validationService.ValidateAsync(command);

        if (await userManager.FindByEmailAsync(command.Email) is not null)
            throw new ConflictException("Email is already taken");

        var user = new ApplicationUser
        {
            UserName = command.Email,
            Email = command.Email
        };

        //create cart for user 
        user.Cart = new Cart { ApplicationUser = user };

        var result = await userManager.CreateAsync(user, command.Password);
        if (!result.Succeeded) throw new BadRequestException(result.Errors);

        var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
        await emailUtility.SendConfirmationEmailAsync(user.Email, token);

        return "Registered successfully, please check your email to confirm your account";
    }

    public async Task LoginAsync(LoginCommand command)
    {
        await validationService.ValidateAsync(command);
        signInManager.AuthenticationScheme = IdentityConstants.BearerScheme;

        var user = await userManager.FindByEmailAsync(command.Email);
        if (user == null) throw new UnauthorizedAccessException("Email or password wrong");
        if (!user.EmailConfirmed) throw new UnauthorizedAccessException("Email is not confirmed");
        var result = await signInManager.PasswordSignInAsync(command.Email, command.Password, false, false);
        if (!result.Succeeded) throw new UnauthorizedAccessException("Email or password wrong");
    }

    public async Task GoogleLoginAsync(GoogleLoginCommand command)
    {
        await validationService.ValidateAsync(command);
        var payload = await GoogleJsonWebSignature.ValidateAsync(command.IdToken);
        var user = await userManager.FindByEmailAsync(payload.Email);
        if (user == null)
        {
            user = new ApplicationUser
            {
                UserName = payload.Email,
                Email = payload.Email,
                EmailConfirmed = true
            };
            await userManager.CreateAsync(user);
        }

        signInManager.AuthenticationScheme = IdentityConstants.BearerScheme;
        await signInManager.SignInAsync(user, false);
    }

    public async Task<string> ConfirmEmailAsync(ConfirmEmailCommand command)
    {
        await validationService.ValidateAsync(command);
        var user = await userManager.FindByEmailAsync(command.Email);
        if (user == null) throw new NotFoundException("Email not found");

        var result = await userManager.ConfirmEmailAsync(user, command.Code);

        if (!result.Succeeded) throw new UnauthorizedAccessException("Please provide a valid token");

        return "Email confirmed successfully";
    }

    public async Task<string> ResendConfirmationEmailAsync(ResendConfirmationEmailCommand command)
    {
        await validationService.ValidateAsync(command);
        var user = await userManager.FindByEmailAsync(command.Email);
        if (user == null) throw new NotFoundException("Email not found");
        if (user.EmailConfirmed) throw new UnauthorizedAccessException("Email is already confirmed");
        var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
        await emailUtility.SendConfirmationEmailAsync(command.Email, token);
        return "Confirmation email has been resent, please check your email";
    }


    public async Task<string> ForgotPasswordAsync(ForgotPasswordCommand command)
    {
        await validationService.ValidateAsync(command);
        var user = await userManager.FindByEmailAsync(command.Email);
        if (user == null) throw new NotFoundException("Email not found");

        var token = await userManager.GeneratePasswordResetTokenAsync(user);
        await emailUtility.SendForgotPasswordEmailAsync(command.Email, token);

        return "Reset password code has been sent, please check your email";
    }


    public async Task<string> ResetPasswordAsync(ResetPasswordCommand request)
    {
        await validationService.ValidateAsync(request);
        var user = await userManager.FindByEmailAsync(request.Email);
        if (user == null) throw new NotFoundException("Email not found");

        var result = await userManager.ResetPasswordAsync(user, request.Code, request.NewPassword);

        if (!result.Succeeded) throw new BadRequestException(result.Errors);
        return "Password reset successfully, now you can log in with your new password";
    }

    public async Task RefreshTokenAsync(RefreshTokenCommand command)
    {
        await validationService.ValidateAsync(command);
        //refresh token logic
        var refreshTokenProtector = bearerTokenOptions.Get(IdentityConstants.BearerScheme).RefreshTokenProtector;
        var refreshTicket = refreshTokenProtector.Unprotect(command.RefreshToken);

        //Reject the request if the refresh token is expired
        if (refreshTicket?.Properties.ExpiresUtc is not { } expiresUtc ||
            timeProvider.GetUtcNow() >= expiresUtc ||
            await signInManager.ValidateSecurityStampAsync(refreshTicket.Principal) is not { } user)
            throw new UnauthorizedAccessException("Invalid refresh token");

        var newPrincipal = await signInManager.CreateUserPrincipalAsync(user);
        signInManager.AuthenticationScheme = IdentityConstants.BearerScheme;
        await signInManager.SignInWithClaimsAsync(user, false, newPrincipal.Claims);
        // await signInManager.RefreshSignInAsync(user);
    }
}