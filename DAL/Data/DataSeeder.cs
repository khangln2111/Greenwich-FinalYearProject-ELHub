using DAL.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace DAL.Data;

public class DataSeeder(ApplicationDbContext context)
{
    public async Task SeedAsync()
    {
        await SeedCategoriesAsync();
    }

    private async Task SeedCategoriesAsync()
    {
        if (await context.Categories.AnyAsync())
            return;

        var categories = new List<Category>
        {
            new() { Name = "Technology" },
            new() { Name = "Business" },
            new() { Name = "Design" },
            new() { Name = "Marketing" },
            new() { Name = "Software Development" }
        };

        await context.Categories.AddRangeAsync(categories);
        await context.SaveChangesAsync();
    }
}