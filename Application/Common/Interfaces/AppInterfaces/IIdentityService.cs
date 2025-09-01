using Application.Common.Models;
using Application.DTOs.IdentityDTOs;

namespace Application.Common.Interfaces.AppInterfaces;

public interface IIdentityService
{
    Task<Success> Register(RegisterCommand command);

    Task Login(LoginCommand command);

    Task<Success> LoginCustom(LoginCommand command);

    Task LoginWithGoogle(GoogleLoginCommand command);

    Task<Success> ConfirmEmail(ConfirmEmailCommand command);

    Task<Success> SendEmailConfirmationOtp(ResendConfirmationEmailCommand command);

    Task RefreshToken(RefreshTokenCommand command);

    Task<Success> SendResetPasswordOtp(SendResetPasswordOtpCommand command);

    Task<Success> ValidateResetPasswordOtp(ValidateResetPasswordOtpCommand command);

    Task<Success> ResetPassword(ResetPasswordCommand command);

    Task<InfoMeVm> GetInfoSelf();

    Task<WorkProfileVm> GetWorkProfileSelf();

    Task<Success> UpdateUserProfileSelf(UpdateUserProfileSelfCommand selfCommand);

    Task<Success> UpdateWorkProfileSelf(UpdateWorkProfileSelfCommand selfCommand);
}