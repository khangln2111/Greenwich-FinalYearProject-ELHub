using DAL.Data.Entities;
using Gridify;

namespace BLL.Gridify;

public class GiftGridifyMapper : GridifyMapper<Gift>
{
    public GiftGridifyMapper()
    {
        AddMap("CourseTitle", e => e.InventoryItem.Course.Title);
        AddMap("CourseDescription", e => e.InventoryItem.Course.Description);
        AddMap("CreatedAt", e => e.CreatedAt);
        AddMap("UpdatedAt", e => e.UpdatedAt);
    }
}