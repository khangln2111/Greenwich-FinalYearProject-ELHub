namespace BLL.DTOs.IdentityDTOs;

public class RegisterCommand
{
    /// <example>khanglngcs210650@fpt.edu.vn</example>
    public required string Email { get; set; }

    /// <example>Abcd@1234</example>
    public required string Password { get; set; }

    /// <example>Abcd@1234</example>
    public required string ConfirmPassword { get; set; }
}