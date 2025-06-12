using Gridify;
using Review = DAL.Data.Entities.Review;

namespace BLL.Gridify.CustomModels;

public class ReviewGridifyMapper : GridifyMapper<Review>
{
    public ReviewGridifyMapper()
    {
        AddMap("Content", r => r.Content);
        AddMap("Rating", r => r.Rating);
    }
}