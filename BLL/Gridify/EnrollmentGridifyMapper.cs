using DAL.Data.Entities;
using Gridify;

namespace BLL.Gridify;

public class EnrollmentGridifyMapper : GridifyMapper<Enrollment>
{
    public EnrollmentGridifyMapper()
    {
        AddMap("CourseTitle", e => e.Course.Title);
    }
}