using Application.Common.Contracts.GeneralContracts;
using Application.Common.Models;
using Application.DTOs.IdentityDTOs;

namespace Application.Common.Contracts.AppContracts;

public interface IIdentityService : IAppService
{
    Task<Success> Register(RegisterCommand command);

    Task Login(LoginCommand command);

    Task<Success> LoginCustom(LoginCommand command);

    Task LoginWithGoogle(GoogleLoginCommand command);

    Task ConfirmEmail(ConfirmEmailCommand command);

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