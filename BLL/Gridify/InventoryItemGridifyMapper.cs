using DAL.Data.Entities;
using Gridify;

namespace BLL.Gridify;

public class InventoryItemGridifyMapper : GridifyMapper<InventoryItem>
{
    public InventoryItemGridifyMapper()
    {
        AddMap("CourseTitle", e => e.Course.Title);
        AddMap("CourseSummary", e => e.Course.Summary);
        AddMap("CourseDescription", e => e.Course.Description);
        AddMap("InstructorName", e => e.Course.Instructor.FirstName + " " + e.Course.Instructor.LastName);
        AddMap("CreatedAt", e => e.CreatedAt);
        AddMap("UpdatedAt", e => e.UpdatedAt);
        AddMap("Quantity", e => e.Quantity);
    }
}