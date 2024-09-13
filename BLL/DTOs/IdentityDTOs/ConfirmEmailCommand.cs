namespace BLL.DTOs.IdentityDTOs;

public class ConfirmEmailCommand
{
    /// <example>khanglngcs210650@fpt.edu.vn</example>
    public string Email { get; set; }

    public string Code { get; set; }
}