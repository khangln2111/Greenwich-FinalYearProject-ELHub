using BLL.DTOs.IdentityDTOs;
using BLL.Models;

namespace BLL.BusinessServices.Abstract;

public interface IIdentityService
{
    Task<Success> Register(RegisterCommand command);

    Task Login(LoginCommand command);

    Task<Success> LoginCustom(LoginCommand command);

    Task LoginWithGoogle(GoogleLoginCommand command);

    Task<Success> ConfirmEmail(ConfirmEmailCommand command);

    Task<Success> ResendConfirmationEmailOtp(ResendConfirmationEmailCommand command);

    Task RefreshToken(RefreshTokenCommand command);

    Task<Success> SendResetPasswordOtp(SendResetPasswordOtpCommand command);

    Task<Success> ValidateResetPasswordOtp(ValidateResetPasswordOtpCommand command);

    Task<Success> ResetPassword(ResetPasswordCommand command);

    Task<InfoMeVm> GetInfoMe();
}