using Domain.Entities.MediaEntities;
using Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;

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

    public string? ProfessionalTitle { get; set; }

    public string? About { get; set; }

    public string? FavoriteQuote { get; set; }
    public string? FavoriteQuoteCite { get; set; }

    public decimal Balance { get; set; } = 0;

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public ICollection<Experience> Experiences { get; init; } = new List<Experience>();

    public bool IsActivated { get; set; } = true;

    public bool IsInitialPasswordChanged { get; set; } = true;

    public Cart Cart { get; set; } = new();

    public Inventory Inventory { get; set; } = new();

    public ICollection<IdentityUserRole<Guid>> UserRoles { get; set; } = new List<IdentityUserRole<Guid>>();
    public ICollection<ApplicationRole> Roles { get; set; } = new List<ApplicationRole>();

    public ICollection<Review> Reviews { get; init; } = new List<Review>();

    public ICollection<Order> Orders { get; init; } = new List<Order>();

    public ICollection<Course> Courses { get; init; } = new List<Course>();

    public ICollection<Enrollment> Enrollments { get; init; } = new List<Enrollment>();

    public ICollection<WalletTransaction> WalletTransactions { get; init; } = new List<WalletTransaction>();

    public ICollection<Notification> ReceivedNotifications { get; init; } = new List<Notification>();
}