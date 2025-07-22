using DAL.Data.Entities;
using DAL.Data.Entities.MediaEntities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>(options)
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

    public DbSet<LectureProgress> LectureProgresses { get; set; }

    public DbSet<InstructorApplication> InstructorApplications { get; set; }

    public DbSet<CourseApprovalHistory> CourseApprovalHistories { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        var connectionString =
            "Server=localhost\\SQLEXPRESS;Database=FinalProject;Trusted_Connection=True;TrustServerCertificate=True;";
        builder.UseSqlServer(connectionString);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        builder.Entity<ApplicationUser>()
            .HasMany(u => u.Roles)
            .WithMany(r => r.Users)
            .UsingEntity<IdentityUserRole<Guid>>
            (au => au.HasOne<ApplicationRole>().WithMany(role => role.UserRoles).HasForeignKey(u => u.RoleId),
                au => au.HasOne<ApplicationUser>().WithMany(user => user.UserRoles).HasForeignKey(r => r.UserId));
    }
}