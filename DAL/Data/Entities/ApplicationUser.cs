using DAL.Data.Entities.MediaEntities;
using Microsoft.AspNetCore.Identity;

namespace DAL.Data.Entities;

public class ApplicationUser : IdentityUser<Guid>
{
    //constructor

    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public Media? ProfilePicture { get; set; }
    public string? Address { get; set; }
    public string? Bio { get; set; }

    public bool IsActivated { get; set; } = false;

    public bool IsInitialPasswordChanged { get; set; } = false;

    public Cart Cart { get; set; } = new();

    public ICollection<ApplicationRole> Roles { get; set; } = new List<ApplicationRole>();

    public ICollection<Review> Reviews { get; set; } = new List<Review>();

    public ICollection<Order> Orders { get; set; } = new List<Order>();

    public ICollection<Course> Courses { get; set; } = new List<Course>();

    public ICollection<Section> Sections { get; set; } = new List<Section>();

    public ICollection<Lecture> Lessons { get; set; } = new List<Lecture>();

    // public ICollection<RefreshToken> RefreshTokens { get; set; }


    public ICollection<Notification> ReceivedNotifications { get; set; } = new List<Notification>();
}