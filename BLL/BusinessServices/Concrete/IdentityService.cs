using System.Net;
using System.Runtime.InteropServices.JavaScript;
using System.Security.Claims;
using BLL.BusinessServices.Abstract;
using BLL.DTOs.IdentityDTOs;
using BLL.Exceptions;
using BLL.Models;
using BLL.Validations;
using DAL.Data;
using DAL.Data.Entities;
using DAL.Utilities.EmailUtility;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Http;
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
    IOptions<BearerTokenOptions> options)
    : IIdentityService
{
    public async Task<Success> Register(RegisterCommand command)
    {
        await validationService.ValidateAsync(command);

        if (await userManager.FindByEmailAsync(command.Email) is not null)
            throw new HttpException(StatusCodes.Status409Conflict, "Email already taken",
                ErrorCode.EmailAlreadyTaken);


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

        return new Success("Registered successfully, please check your email to confirm your account");
    }

    public async Task Login(LoginCommand command)
    {
        await validationService.ValidateAsync(command);
        signInManager.AuthenticationScheme = IdentityConstants.BearerScheme;

        var user = await userManager.FindByEmailAsync(command.Email);
        if (user == null)
            throw new HttpException(StatusCodes.Status401Unauthorized, "Email or password wrong",
                ErrorCode.EmailOrPasswordIncorrect);
        if (!user.EmailConfirmed)
            throw new HttpException(StatusCodes.Status403Forbidden, "Email is not confirmed",
                ErrorCode.EmailNotConfirmed);
        var result = await signInManager.PasswordSignInAsync(command.Email, command.Password, false, false);
        if (!result.Succeeded)
            throw new HttpException(StatusCodes.Status401Unauthorized, "Email or password wrong",
                ErrorCode.EmailOrPasswordIncorrect);
    }

    public async Task GoogleLogin(GoogleLoginCommand command)
    {
        await validationService.ValidateAsync(command);
        var payload = await GoogleJsonWebSignature.ValidateAsync(command.IdToken);

        var user = await userManager.FindByEmailAsync(payload.Email);

        // If user not found, create a new user
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

    public async Task<Success> ResendConfirmationEmailOtp(ResendConfirmationEmailCommand command)
    {
        await validationService.ValidateAsync(command);
        var user = await userManager.FindByEmailAsync(command.Email);
        if (user == null) throw new NotFoundException("Email not found");
        if (user.EmailConfirmed)
            throw new HttpException(StatusCodes.Status400BadRequest, "Email is already confirmed",
                ErrorCode.EmailAlreadyConfirmed);
        var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
        await emailUtility.SendConfirmationEmailAsync(command.Email, token);
        return new Success("Confirmation email has been sent, please check your email");
    }

    public async Task<Success> ConfirmEmail(ConfirmEmailCommand command)
    {
        await validationService.ValidateAsync(command);
        var user = await userManager.FindByEmailAsync(command.Email);
        if (user == null) throw new NotFoundException("Email not found");

        var result = await userManager.ConfirmEmailAsync(user, command.Code);

        if (!result.Succeeded)
            throw new HttpException(StatusCodes.Status400BadRequest, "Please provide a valid token",
                ErrorCode.InvalidToken);

        return new Success("Email confirmed successfully, now you can log in");
    }


    public async Task<Success> SendResetPasswordOtp(SendResetPasswordOtpCommand command)
    {
        await validationService.ValidateAsync(command);
        var user = await userManager.FindByEmailAsync(command.Email);
        if (user == null) throw new NotFoundException("Email not found");

        var token = await userManager.GeneratePasswordResetTokenAsync(user);
        await emailUtility.SendForgotPasswordEmailAsync(command.Email, token);

        return new Success("Reset password email has been sent, please check your email");
    }


    public async Task<Success> ResetPassword(ResetPasswordCommand request)
    {
        await validationService.ValidateAsync(request);
        var user = await userManager.FindByEmailAsync(request.Email);
        if (user == null) throw new NotFoundException("Email not found");

        var result = await userManager.ResetPasswordAsync(user, request.Otp, request.NewPassword);

        if (!result.Succeeded) throw new BadRequestException(result.Errors);

        return new Success("Password reset successfully, now you can log in with new password");
    }

    public async Task<Success> ValidateResetPasswordOtp(ValidateResetPasswordOtpCommand command)
    {
        await validationService.ValidateAsync(command);
        var user = await userManager.FindByEmailAsync(command.Email);
        if (user == null) throw new NotFoundException("Email not found");

        var result = await userManager.VerifyUserTokenAsync(user, "Phone",
            "ResetPassword", command.Otp);

        Console.WriteLine("Token provider:" + userManager.Options.Tokens.PasswordResetTokenProvider);
        Console.WriteLine("Token purpose:" + UserManager<ApplicationUser>.ResetPasswordTokenPurpose);
        if (result == false)
            throw new HttpException(StatusCodes.Status400BadRequest, "Invalid or expired token",
                ErrorCode.InvalidToken);

        return new Success("Otp is valid");
    }

    public async Task RefreshToken(RefreshTokenCommand command)
    {
        await validationService.ValidateAsync(command);
        //refresh token logic
        var refreshTokenProtector = bearerTokenOptions.Get(IdentityConstants.BearerScheme).RefreshTokenProtector;
        var refreshTicket = refreshTokenProtector.Unprotect(command.RefreshToken);

        //Reject the request if the refresh token is expired
        if (refreshTicket?.Properties.ExpiresUtc is not { } expiresUtc ||
            timeProvider.GetUtcNow() >= expiresUtc ||
            await signInManager.ValidateSecurityStampAsync(refreshTicket.Principal) is not { } user)
            throw new HttpException(StatusCodes.Status400BadRequest, "Invalid refresh token", ErrorCode.InvalidToken);

        var newPrincipal = await signInManager.CreateUserPrincipalAsync(user);
        signInManager.AuthenticationScheme = IdentityConstants.BearerScheme;
        await signInManager.SignInWithClaimsAsync(user, false, newPrincipal.Claims);
        // await signInManager.RefreshSignInAsync(user);
    }

    public async Task<Success> LoginCustom(LoginCommand command)
    {
        await validationService.ValidateAsync(command);
        signInManager.AuthenticationScheme = IdentityConstants.BearerScheme;

        var user = await userManager.FindByEmailAsync(command.Email);

        if (user == null)
            throw new HttpException(StatusCodes.Status401Unauthorized, "Email or password wrong",
                ErrorCode.EmailOrPasswordIncorrect);

        if (!user.EmailConfirmed)
            throw new HttpException(StatusCodes.Status403Forbidden, "Email is not confirmed",
                ErrorCode.EmailNotConfirmed);

        var result = await signInManager.CheckPasswordSignInAsync(user, command.Password, false);
        if (!result.Succeeded)
            throw new HttpException(StatusCodes.Status401Unauthorized, "Email or password wrong",
                ErrorCode.EmailOrPasswordIncorrect);

        //get user principal to create tokens
        var principal = await signInManager.CreateUserPrincipalAsync(user);
        var accessToken = CreateAccessToken(principal);
        var refreshToken = CreateRefreshToken(principal);


        return new Success("Logged in successfully",
            new
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                AccessTokenExpiresIn = options.Value.BearerTokenExpiration.TotalSeconds,
                RefreshTokenExpiresIn = options.Value.RefreshTokenExpiration.TotalSeconds
            });
    }


    private string CreateAccessToken(ClaimsPrincipal principal)
    {
        var issueAt = timeProvider.GetUtcNow();
        var properties = new AuthenticationProperties
        {
            ExpiresUtc = issueAt + options.Value.BearerTokenExpiration
        };
        var ticket = new AuthenticationTicket(principal, properties, IdentityConstants.BearerScheme);
        return options.Value.BearerTokenProtector.Protect(ticket);
    }

    private string CreateRefreshToken(ClaimsPrincipal principal)
    {
        var issuedAt = timeProvider.GetUtcNow();
        var refreshProperties = new AuthenticationProperties
        {
            ExpiresUtc = issuedAt + options.Value.RefreshTokenExpiration
        };
        var ticket = new AuthenticationTicket(principal, refreshProperties, IdentityConstants.BearerScheme);
        return options.Value.RefreshTokenProtector.Protect(ticket);
    }
}