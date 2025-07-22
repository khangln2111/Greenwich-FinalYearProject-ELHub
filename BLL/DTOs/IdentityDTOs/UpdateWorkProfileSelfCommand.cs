using Microsoft.AspNetCore.Http;

namespace BLL.DTOs.IdentityDTOs;

public class UpdateWorkProfileSelfCommand
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? ProfessionalTitle { get; set; }
    public string? About { get; set; }
    public IFormFile? Avatar { get; set; }
    public string? FavoriteQuote { get; set; }
    public string? FavoriteQuoteCite { get; set; }
}