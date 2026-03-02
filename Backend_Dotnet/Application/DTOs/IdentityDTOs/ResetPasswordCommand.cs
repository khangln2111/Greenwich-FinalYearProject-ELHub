namespace Application.DTOs.IdentityDTOs;

public class ResetPasswordCommand
{
    /// <example>khanglngcs210650@fpt.edu.vn</example>
    public required string Email { get; init; }

    /// <example>Abcd@123456</example>
    public required string NewPassword { get; init; }

    /// The otp sent to the user's email to reset the password. To get the reset otp first make a "/SendResetPasswordOtp" request.
    public required string Otp { get; init; }
}