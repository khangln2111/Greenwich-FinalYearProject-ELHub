using Gridify;
using Review = Domain.Entities.Review;

namespace Application.Gridify.CustomModels;

public class ReviewGridifyMapper : GridifyMapper<Review>
{
    public ReviewGridifyMapper()
    {
        AddMap("Content", r => r.Content);
        AddMap("Rating", r => r.Rating);
        AddMap("IsReplied", r => r.Reply != null);
        AddMap("CreatedAt", r => r.CreatedAt);
        AddMap("UpdatedAt", r => r.UpdatedAt);
    }
}