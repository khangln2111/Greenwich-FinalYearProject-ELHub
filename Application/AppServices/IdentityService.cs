using System.Security.Claims;
using Application.Common.Interfaces;
using Application.Common.Interfaces.AppInterfaces;
using Application.Common.Interfaces.InfrastructureInterfaces;
using Application.Common.Models;
using Application.DTOs.IdentityDTOs;
using Application.Exceptions;
using Application.Validations;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Domain.Enums;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Application.AppServices;

public class IdentityService(
    UserManager<ApplicationUser> userManager,
    SignInManager<ApplicationUser> signInManager,
    IOptionsMonitor<BearerTokenOptions> bearerTokenOptions,
    TimeProvider timeProvider,
    IValidationService validationService,
    IEmailUtility emailUtility,
    IOptions<BearerTokenOptions> options,
    IMapper mapper,
    IMediaManager mediaManager,
    IApplicationDbContext context,
    ICurrentUserUtility currentUserUtility,
    IExternalAuthUtility externalAuthUtility
)
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
            Email = command.Email,
            FirstName = command.FirstName,
            LastName = command.LastName
        };


        var result = await userManager.CreateAsync(user, command.Password);
        if (!result.Succeeded) throw new BadRequestException(result.Errors);

        var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
        await emailUtility.SendConfirmationEmail(user.Email, token);

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
        {
            var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
            if (user.Email != null) await emailUtility.SendConfirmationEmail(user.Email, token);
            throw new HttpException(StatusCodes.Status403Forbidden, "Email is not confirmed",
                ErrorCode.EmailNotConfirmed);
        }

        var result = await signInManager.PasswordSignInAsync(command.Email, command.Password, false, false);
        if (!result.Succeeded)
            throw new HttpException(StatusCodes.Status401Unauthorized, "Email or password wrong",
                ErrorCode.EmailOrPasswordIncorrect);
    }

    public async Task LoginWithGoogle(GoogleLoginCommand command)
    {
        await validationService.ValidateAsync(command);

        var payload = await externalAuthUtility.GetGoogleInfo(command.IdToken);
        if (payload == null || string.IsNullOrEmpty(payload.Email))
            throw new HttpException(StatusCodes.Status400BadRequest, "Invalid Google token",
                ErrorCode.InvalidToken);


        var user = await userManager.FindByEmailAsync(payload.Email);

        // If user not found, create a new user
        if (user == null)
        {
            user = new ApplicationUser
            {
                UserName = payload.Email,
                Email = payload.Email,
                EmailConfirmed = true,
                FirstName = payload.GivenName,
                LastName = payload.FamilyName
            };
            await userManager.CreateAsync(user);
        }

        if (!user.EmailConfirmed)
        {
            user.EmailConfirmed = true; // Automatically confirm email for Google users
            await userManager.UpdateAsync(user);
        }


        signInManager.AuthenticationScheme = IdentityConstants.BearerScheme;
        await signInManager.SignInAsync(user, false);
    }


    public async Task<Success> SendEmailConfirmationOtp(ResendConfirmationEmailCommand command)
    {
        await validationService.ValidateAsync(command);
        var user = await userManager.FindByEmailAsync(command.Email);
        if (user == null) throw new NotFoundException("Email not found");
        if (user.EmailConfirmed)
            throw new HttpException(StatusCodes.Status400BadRequest, "Email is already confirmed",
                ErrorCode.EmailAlreadyConfirmed);
        var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
        await emailUtility.SendConfirmationEmail(command.Email, token);
        return new Success("Confirmation email has been sent, please check your email");
    }

    public async Task<Success> ConfirmEmail(ConfirmEmailCommand command)
    {
        await validationService.ValidateAsync(command);
        var user = await userManager.FindByEmailAsync(command.Email);
        if (user == null) throw new NotFoundException("Email not found");
        if (user.EmailConfirmed)
            throw new HttpException(StatusCodes.Status400BadRequest, "Email is already confirmed",
                ErrorCode.EmailAlreadyConfirmed);

        var result = await userManager.ConfirmEmailAsync(user, command.Otp);

        if (!result.Succeeded)
            throw new HttpException(StatusCodes.Status400BadRequest, "Please provide a valid Otp",
                ErrorCode.InvalidOtp);

        return new Success("Email confirmed successfully, now you can log in");
    }


    public async Task<Success> SendResetPasswordOtp(SendResetPasswordOtpCommand command)
    {
        await validationService.ValidateAsync(command);
        var user = await userManager.FindByEmailAsync(command.Email);
        if (user == null) throw new NotFoundException("Email not found");

        var token = await userManager.GeneratePasswordResetTokenAsync(user);
        await emailUtility.SendForgotPasswordEmail(command.Email, token);

        return new Success("Reset password email has been sent, please check your email");
    }


    public async Task<Success> ResetPassword(ResetPasswordCommand request)
    {
        await validationService.ValidateAsync(request);
        var user = await userManager.FindByEmailAsync(request.Email);
        if (user == null) throw new NotFoundException("Email not found");

        var result = await userManager.ResetPasswordAsync(user, request.Otp, request.NewPassword);

        if (!result.Succeeded)
            throw new HttpException(StatusCodes.Status400BadRequest, "Invalid or expired OTP",
                ErrorCode.InvalidOtp);

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
            throw new HttpException(StatusCodes.Status400BadRequest, "Invalid or expired OTP",
                ErrorCode.InvalidOtp);

        return new Success("Otp is valid");
    }

    public async Task RefreshToken(RefreshTokenCommand command)
    {
        await validationService.ValidateAsync(command);
        //refresh token logic
        var refreshTokenProtector = bearerTokenOptions.Get(IdentityConstants.BearerScheme).RefreshTokenProtector;
        var refreshTicket = refreshTokenProtector.Unprotect(command.RefreshToken);

        //Reject the request if the refresh token is expired
        if (refreshTicket?.Properties.ExpiresUtc is not { } expiresUtc || timeProvider.GetUtcNow() >= expiresUtc ||
            await signInManager.ValidateSecurityStampAsync(refreshTicket.Principal) is not { } user)
            throw new HttpException(StatusCodes.Status400BadRequest, "Invalid refresh token", ErrorCode.InvalidToken);

        signInManager.AuthenticationScheme = IdentityConstants.BearerScheme;
        await signInManager.SignInAsync(user, false);
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


    public async Task<InfoMeVm> GetInfoSelf()
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser is null)
            throw new UnauthorizedAccessException("User not authenticated");

        var user = await context.Users
            .AsNoTracking()
            .ProjectTo<InfoMeVm>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(u => u.Id == currentUser.Id);

        if (user is null)
            throw new NotFoundException("User not found");

        return user;
    }

    public async Task<WorkProfileVm> GetWorkProfileSelf()
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser is null)
            throw new UnauthorizedAccessException("User not authenticated");

        var workProfile = await context.Users
            .Include(u => u.Avatar)
            .Include(u => u.Roles)
            .ProjectTo<WorkProfileVm>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(u => u.Id == currentUser.Id);

        if (workProfile is null)
            throw new NotFoundException("User not found");

        return workProfile;
    }

    public async Task<Success> UpdateWorkProfileSelf(UpdateWorkProfileSelfCommand selfCommand)
    {
        await validationService.ValidateAsync(selfCommand);
        var user = await userManager.GetUserAsync(signInManager.Context.User);
        if (user == null) throw new NotFoundException("Current user not found");

        // if the user does not have an avatar, create a new one
        if (selfCommand.Avatar != null && user.Avatar == null)
        {
            var avatar = await mediaManager.SaveFile(selfCommand.Avatar, MediaType.Image);
            await context.Media.AddAsync(avatar);
            user.Avatar = avatar;
        }

        if (selfCommand.Avatar != null && user.Avatar != null)
            await mediaManager.UpdateFile(user.Avatar, selfCommand.Avatar);

        mapper.Map(selfCommand, user);
        await context.SaveChangesAsync();

        return new Success("User work profile updated successfully");
    }


    public async Task<Success> UpdateUserProfileSelf(UpdateUserProfileSelfCommand selfCommand)
    {
        await validationService.ValidateAsync(selfCommand);
        var user = await userManager.GetUserAsync(signInManager.Context.User);
        if (user == null) throw new NotFoundException("Current user not found");

        // if the user does not have an avatar, create a new one
        if (selfCommand.Avatar != null && user.Avatar == null)
        {
            var avatar = await mediaManager.SaveFile(selfCommand.Avatar, MediaType.Image);
            await context.Media.AddAsync(avatar);
            user.Avatar = avatar;
        }

        if (selfCommand.Avatar != null && user.Avatar != null)
            await mediaManager.UpdateFile(user.Avatar, selfCommand.Avatar);

        mapper.Map(selfCommand, user);
        await context.SaveChangesAsync();

        return new Success("User profile updated successfully");
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