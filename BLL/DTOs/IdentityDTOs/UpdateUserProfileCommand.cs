using DAL.Data.Enums;
using Microsoft.AspNetCore.Http;

namespace BLL.DTOs.IdentityDTOs;

public class UpdateUserProfileCommand
{
    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public Gender? Gender { get; set; }

    public DateTime? Birthday { get; set; }

    public IFormFile? Avatar { get; set; }
}