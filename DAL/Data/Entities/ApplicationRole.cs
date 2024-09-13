using Microsoft.AspNetCore.Identity;

namespace DAL.Data.Entities;

public class ApplicationRole : IdentityRole<Guid>
{
    public ICollection<ApplicationUser> Users { get; set; } = new List<ApplicationUser>();
}