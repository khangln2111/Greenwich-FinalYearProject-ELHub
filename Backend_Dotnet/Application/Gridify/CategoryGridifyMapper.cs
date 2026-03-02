using Domain.Entities;
using Gridify;

namespace Application.Gridify;

public class CategoryGridifyMapper : GridifyMapper<Category>
{
    public CategoryGridifyMapper()
    {
        AddMap("CourseCount", c => c.Courses.Count);
        AddMap("Name", c => c.Name);
    }
}