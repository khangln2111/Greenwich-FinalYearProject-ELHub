using DAL.Data.Entities;
using Gridify;

namespace BLL.Gridify;

public class UserGridifyMapper : GridifyMapper<ApplicationUser>
{
    public UserGridifyMapper()
    {
        AddMap("FullName", x => $"{x.FirstName} {x.LastName}");
        AddMap("Email", x => x.Email);
        AddMap("Roles", x => x.Roles.Select(r => r.Name).ToArray());
        AddMap("IsActivated", x => x.IsActivated);
        AddMap("DateOfBirth", x => x.DateOfBirth);
    }
}