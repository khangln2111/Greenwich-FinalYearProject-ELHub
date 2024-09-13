using BLL.DTOs.IdentityDTOs;

namespace BLL.BusinessServices.Abstract;

public interface IIdentityService
{
    Task<string> RegisterAsync(RegisterCommand command);

    Task LoginAsync(LoginCommand command);

    Task GoogleLoginAsync(GoogleLoginCommand command);

    Task<string> ConfirmEmailAsync(ConfirmEmailCommand command);

    Task<string> ResendConfirmationEmailAsync(ResendConfirmationEmailCommand command);

    Task RefreshTokenAsync(RefreshTokenCommand command);


    Task<string> ForgotPasswordAsync(ForgotPasswordCommand command);

    Task<string> ResetPasswordAsync(ResetPasswordCommand command);
}