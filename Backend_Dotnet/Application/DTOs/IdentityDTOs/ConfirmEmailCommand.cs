namespace Application.DTOs.IdentityDTOs;

public class ConfirmEmailCommand
{
    /// <example>khanglngcs210650@fpt.edu.vn</example>
    public required string Email { get; set; }

    public required string Otp { get; set; }
}