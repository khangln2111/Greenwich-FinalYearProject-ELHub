using DAL.Data.Entities;
using Gridify;

namespace BLL.Gridify;

public class EnrollmentGridifyMapper : GridifyMapper<Enrollment>
{
    public EnrollmentGridifyMapper()
    {
        AddMap("CourseTitle", e => e.Course.Title);
        AddMap("CourseDescription", e => e.Course.Description);
        AddMap("InstructorName", e => e.Course.Instructor.FirstName + " " + e.Course.Instructor.LastName);
        AddMap("CreatedAt", e => e.CreatedAt);
        AddMap("UpdatedAt", e => e.UpdatedAt);
    }
}