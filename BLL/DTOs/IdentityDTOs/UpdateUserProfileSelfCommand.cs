using DAL.Data.Enums;
using Microsoft.AspNetCore.Http;

namespace BLL.DTOs.IdentityDTOs;

public class UpdateUserProfileSelfCommand
{
    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public Gender? Gender { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public IFormFile? Avatar { get; set; }
}