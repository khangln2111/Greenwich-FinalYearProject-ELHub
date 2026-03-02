using Domain.Entities;
using Gridify;

namespace Application.Gridify;

public class GiftGridifyMapper : GridifyMapper<Gift>
{
    public GiftGridifyMapper()
    {
        AddMap("CourseTitle", e => e.InventoryItem.Course.Title);
        AddMap("CourseSummary", e => e.InventoryItem.Course.Summary);
        AddMap("CourseDescription", e => e.InventoryItem.Course.Description);
        AddMap("CreatedAt", e => e.CreatedAt);
        AddMap("UpdatedAt", e => e.UpdatedAt);
    }
}