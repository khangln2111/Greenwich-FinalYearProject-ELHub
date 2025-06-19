using DAL.Data.Entities.MediaEntities;
using DAL.Data.Enums;
using Microsoft.AspNetCore.Identity;

namespace DAL.Data.Entities;

public class ApplicationUser : IdentityUser<Guid>
{
    //constructor

    public string? FirstName { get; set; }
    public string? LastName { get; set; }


    public Media? Avatar { get; set; }
    public string? Address { get; set; }
    public string? Bio { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public Gender? Gender { get; set; }

    public string? DisplayName { get; set; }

    public Media? WorkAvatar { get; set; }

    public string? ProfessionalTitle { get; set; }

    public string? About { get; set; }

    public string? FavoriteQuote { get; set; }
    public string? FavoriteQuoteCite { get; set; }


    public ICollection<Experience> Experiences { get; init; } = new List<Experience>();

    public bool IsActivated { get; set; } = false;

    public bool IsInitialPasswordChanged { get; set; } = false;

    public Cart Cart { get; set; } = new();

    public Inventory Inventory { get; set; } = new();

    public ICollection<ApplicationRole> Roles { get; init; } = new List<ApplicationRole>();

    public ICollection<Review> Reviews { get; init; } = new List<Review>();

    public ICollection<Order> Orders { get; init; } = new List<Order>();

    public ICollection<Course> Courses { get; init; } = new List<Course>();

    public ICollection<Enrollment> Enrollments { get; init; } = new List<Enrollment>();

    // public ICollection<RefreshToken> RefreshTokens { get; set; }


    public ICollection<Notification> ReceivedNotifications { get; init; } = new List<Notification>();
}