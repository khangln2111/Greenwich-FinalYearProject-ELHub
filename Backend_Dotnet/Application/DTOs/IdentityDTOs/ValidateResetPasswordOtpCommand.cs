namespace Application.DTOs.IdentityDTOs;

public class ValidateResetPasswordOtpCommand
{
    public required string Otp { get; init; }

    /// <example>khanglngcs210650@fpt.edu.vn</example>
    public required string Email { get; init; }
}