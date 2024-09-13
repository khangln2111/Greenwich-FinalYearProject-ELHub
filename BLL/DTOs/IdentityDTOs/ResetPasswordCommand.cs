namespace BLL.DTOs.IdentityDTOs;

public class ResetPasswordCommand
{
    /// <example>khanglngcs210650@fpt.edu.vn</example>
    public required string Email { get; init; }

    /// <example>Abcd@123456</example>
    public required string NewPassword { get; init; }

    /// The code sent to the user's email to reset the password. To get the reset code, first make a "/forgotPassword" request.
    public required string Code { get; init; }
}