using Domain.Entities;
using Gridify;

namespace Application.Gridify;

public class InstructorApplicationGridifyMapper : GridifyMapper<InstructorApplication>
{
    public InstructorApplicationGridifyMapper()
    {
        AddMap("Id", x => x.Id);
        AddMap("UserId", x => x.UserId);
        AddMap("Status", x => x.Status);
        AddMap("ProfessionalTitle", x => x.ProfessionalTitle);
        AddMap("Email", x => x.User.Email);
        AddMap("FullName", x => x.User.FirstName + " " + x.User.LastName);
        AddMap("About", x => x.About);
        AddMap("CreatedAt", x => x.CreatedAt);
        AddMap("UpdatedAt", x => x.UpdatedAt);
        AddMap("ReviewedAt", x => x.ReviewedAt);
    }
}