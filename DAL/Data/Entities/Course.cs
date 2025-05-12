using DAL.Data.Entities.MediaEntities;
using DAL.Data.Enums;

namespace DAL.Data.Entities;

public class Course : BaseEntity
{
    public required string Title { get; set; }

    public required string Description { get; set; }


    public decimal? Price { get; set; }

    public int? DiscountPercentage { get; set; }

    public CourseLevel? Level { get; set; }

    public string[]? Prerequisites { get; set; }

    public string[]? LearningOutcomes { get; set; }

    public CourseStatus Status { get; set; } = CourseStatus.Draft;

    //Relationships 
    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = null!;
    public Media? Image { get; set; }
    public DurationMedia? PromoVideo { get; set; }
    public ICollection<Section> Sections { get; } = new List<Section>();

    public ICollection<CartItem> CartItems { get; } = new List<CartItem>();

    public ICollection<OrderItem> OrderItems { get; } = new List<OrderItem>();

    public ICollection<Review> Reviews { get; } = new List<Review>();

    public Guid InstructorId { get; set; }

    public ApplicationUser Instructor { get; set; } = null!;
}