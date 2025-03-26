using BLL.DTOs.IdentityDTOs;
using BLL.Models;

namespace BLL.BusinessServices.Abstract;

public interface IIdentityService
{
    Task<Success> RegisterAsync(RegisterCommand command);

    Task LoginAsync(LoginCommand command);

    Task GoogleLoginAsync(GoogleLoginCommand command);

    Task<Success> ConfirmEmailAsync(ConfirmEmailCommand command);

    Task<Success> ResendConfirmationEmailAsync(ResendConfirmationEmailCommand command);

    Task RefreshTokenAsync(RefreshTokenCommand command);


    Task<Success> ForgotPasswordAsync(ForgotPasswordCommand command);

    Task<Success> ResetPasswordAsync(ResetPasswordCommand command);
}