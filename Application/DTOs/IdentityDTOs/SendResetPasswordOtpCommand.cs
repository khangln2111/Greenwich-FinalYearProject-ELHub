namespace Application.DTOs.IdentityDTOs;

public class SendResetPasswordOtpCommand
{
    /// <example>khanglngcs210650@fpt.edu.vn</example>
    public required string Email { get; init; }
}