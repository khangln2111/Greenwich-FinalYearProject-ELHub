namespace BLL.DTOs.IdentityDTOs;

public class WorkProfileVm
{
    public Guid Id { get; set; }
    public string? DisplayName { get; set; }
    public string? ProfessionalTitle { get; set; }
    public string? About { get; set; }
    public string? WorkAvatarUrl { get; set; }
    public string? FavoriteQuote { get; set; }
    public string? FavoriteQuoteCite { get; set; }
}