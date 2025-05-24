namespace BLL.DTOs.IdentityDTOs;

public class InfoMeVm
{
    public Guid Id { get; set; }
    public required string Email { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public string[] Roles { get; set; } = [];
}