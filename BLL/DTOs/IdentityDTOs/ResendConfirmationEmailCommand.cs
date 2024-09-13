namespace BLL.DTOs.IdentityDTOs;

public class ResendConfirmationEmailCommand
{
    /// <example>khanglngcs210650@fpt.edu.vn</example>
    public required string Email { get; init; }
}