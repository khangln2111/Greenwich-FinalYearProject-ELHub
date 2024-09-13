using DAL.Data.Entities.MediaEntities;

namespace DAL.Data.Entities;

public class Course : BaseEntity

{
    public required string Title { get; set; }

    public required string Summary { get; set; }

    public required string Description { get; set; }

    public decimal? Price { get; set; }

    public int? DiscountPercentage { get; set; }

    public string? Language { get; set; }

    public string? Level { get; set; }

    public string? Requirements { get; set; }

    public string? WhatYouWillLearn { get; set; }

    public string? TargetAudience { get; set; }


    //Relationships 
    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = null!;
    public Media? Image { get; set; }
    public DurationMedia? PromoVideo { get; set; }
    public ICollection<Section> Sections { get; } = new List<Section>();


    public ICollection<CartItem> CartItems { get; } = new List<CartItem>();

    public ICollection<OrderItem> OrderItems { get; } = new List<OrderItem>();

    public ICollection<Review> Reviews { get; } = new List<Review>();
}