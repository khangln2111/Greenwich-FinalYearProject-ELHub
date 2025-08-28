namespace Application.Common.Models;

public class GoogleUserInfo
{
    public string Email { get; set; } = null!;
    public string? GivenName { get; set; }
    public string? FamilyName { get; set; }
}