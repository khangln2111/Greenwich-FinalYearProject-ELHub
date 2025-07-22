namespace BLL.DTOs.IdentityDTOs;

public class WorkProfileVm
{
    public Guid Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? ProfessionalTitle { get; set; }
    public string? About { get; set; }
    public string? AvatarUrl { get; set; }
    public string? FavoriteQuote { get; set; }
    public string? FavoriteQuoteCite { get; set; }
}