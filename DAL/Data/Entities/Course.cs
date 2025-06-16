using DAL.Data.Entities.MediaEntities;
using DAL.Data.Enums;

namespace DAL.Data.Entities;

public class Course : BaseEntity
{
    public required string Title { get; set; }

    public required string Description { get; set; }


    public decimal Price { get; set; } = 0;

    public decimal DiscountedPrice { get; set; } = 0;

    public CourseLevel? Level { get; set; }

    public string[]? Prerequisites { get; set; }

    public string[]? LearningOutcomes { get; set; }

    public CourseStatus Status { get; set; } = CourseStatus.Draft;

    //Relationships 
    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = null!;
    public Media? Image { get; set; }
    public DurationMedia? PromoVideo { get; set; }

    public ICollection<Section> Sections { get; set; } = new List<Section>();

    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();


    public ICollection<Gift> Gifts { get; set; } = new List<Gift>();

    public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();

    public Guid InstructorId { get; set; }

    public ApplicationUser Instructor { get; set; } = null!;
}