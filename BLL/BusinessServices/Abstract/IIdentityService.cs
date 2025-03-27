using BLL.DTOs.IdentityDTOs;
using BLL.Models;

namespace BLL.BusinessServices.Abstract;

public interface IIdentityService
{
    Task<Success> Register(RegisterCommand command);

    Task Login(LoginCommand command);

    Task GoogleLogin(GoogleLoginCommand command);

    Task<Success> ConfirmEmail(ConfirmEmailCommand command);

    Task<Success> ResendConfirmationEmail(ResendConfirmationEmailCommand command);

    Task RefreshToken(RefreshTokenCommand command);


    Task<Success> ForgotPassword(ForgotPasswordCommand command);

    Task<Success> ResetPassword(ResetPasswordCommand command);
}