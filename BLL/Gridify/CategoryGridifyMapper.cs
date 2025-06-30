using DAL.Data.Entities;
using Gridify;

namespace BLL.Gridify;

public class CategoryGridifyMapper : GridifyMapper<Category>
{
    public CategoryGridifyMapper()
    {
        AddMap("CourseCount", c => c.Courses.Count);
        AddMap("Name", c => c.Name);
    }
}