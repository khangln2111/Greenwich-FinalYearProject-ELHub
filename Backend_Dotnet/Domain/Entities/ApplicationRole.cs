using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;

public class ApplicationRole : IdentityRole<Guid>
{
    public ICollection<IdentityUserRole<Guid>> UserRoles { get; set; } = new Collection<IdentityUserRole<Guid>>();
    public ICollection<ApplicationUser> Users { get; set; } = new List<ApplicationUser>();
}