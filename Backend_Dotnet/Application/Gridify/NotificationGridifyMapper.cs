using Domain.Entities;
using Gridify;

namespace Application.Gridify;

public class NotificationGridifyMapper : GridifyMapper<Notification>
{
    public NotificationGridifyMapper()
    {
        AddMap("Title", n => n.Title);
        AddMap("Content", n => n.Content);
        AddMap("IsRead", n => n.IsRead);
        AddMap("Type", n => n.Type);
        AddMap("Url", n => n.Url);
        AddMap("CreatedAt", n => n.CreatedAt);
    }
}