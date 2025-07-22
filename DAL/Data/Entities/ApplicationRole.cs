using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Identity;

namespace DAL.Data.Entities;

public class ApplicationRole : IdentityRole<Guid>
{
    public ICollection<IdentityUserRole<Guid>> UserRoles { get; set; } = new Collection<IdentityUserRole<Guid>>();
    public ICollection<ApplicationUser> Users { get; set; } = new List<ApplicationUser>();
}