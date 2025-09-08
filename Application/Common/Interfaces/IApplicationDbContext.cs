using Domain.Entities;
using Domain.Entities.MediaEntities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces;

public interface IApplicationDbContext : IAsyncDisposable
{
    public DbSet<Category> Categories { get; set; }

    public DbSet<Course> Courses { get; set; }

    public DbSet<Section> Sections { get; set; }

    public DbSet<Lecture> Lectures { get; set; }

    public DbSet<Media> Media { get; set; }

    public DbSet<Cart> Carts { get; set; }

    public DbSet<CartItem> CartItems { get; set; }

    public DbSet<Order> Orders { get; set; }

    public DbSet<OrderItem> OrderItems { get; set; }

    public DbSet<Notification> Notifications { get; set; }

    public DbSet<Inventory> Inventories { get; set; }

    public DbSet<InventoryItem> InventoryItems { get; set; }

    public DbSet<Enrollment> Enrollments { get; set; }

    public DbSet<Gift> Gifts { get; set; }

    public DbSet<Review> Reviews { get; set; }

    public DbSet<ReviewReply> ReviewReplies { get; set; }

    public DbSet<LectureProgress> LectureProgresses { get; set; }

    public DbSet<InstructorApplication> InstructorApplications { get; set; }

    public DbSet<CourseApprovalHistory> CourseApprovalHistories { get; set; }

    public DbSet<WalletTransaction> WalletTransactions { get; set; }

    public DbSet<ApplicationUser> Users { get; set; }

    public DbSet<ApplicationRole> Roles { get; set; }

    Task<int> SaveChangesAsync();

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}