using Microsoft.AspNetCore.Http;

namespace BLL.DTOs.IdentityDTOs;

public class UpdateWorkProfileSelfCommand
{
    public string? DisplayName { get; set; }
    public string? ProfessionalTitle { get; set; }
    public string? About { get; set; }
    public IFormFile? WorkAvatar { get; set; }
    public string? FavoriteQuote { get; set; }
    public string? FavoriteQuoteCite { get; set; }
}