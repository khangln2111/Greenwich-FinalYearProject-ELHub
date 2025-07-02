using DAL.Data.Entities;
using DAL.Data.Entities.MediaEntities;
using DAL.Data.Enums;
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
        if (!await context.Categories.AnyAsync())
        {
            var categories = new List<Category>
            {
                new()
                {
                    Name = "Technology",
                    Image = new Media
                    {
                        Type = MediaType.Image,
                        Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279169/Technology_ctbhfi.jpg",
                        LocalFilePath = "",
                        Extension = ".jpg",
                        FileSizeInBytes = 0
                    }
                },
                new()
                {
                    Name = "Business",
                    Image = new Media
                    {
                        Type = MediaType.Image,
                        Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751281313/Business_eicgkh.jpg",
                        LocalFilePath = "",
                        Extension = ".jpg",
                        FileSizeInBytes = 0
                    }
                },
                new()
                {
                    Name = "Design",
                    Image = new Media
                    {
                        Type = MediaType.Image,
                        Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279170/Design_csnlua.jpg",
                        LocalFilePath = "",
                        Extension = ".jpg",
                        FileSizeInBytes = 0
                    }
                },
                new()
                {
                    Name = "Marketing",
                    Image = new Media
                    {
                        Type = MediaType.Image,
                        Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279169/Marketing_v7q6cg.png",
                        LocalFilePath = "",
                        Extension = ".jpg",
                        FileSizeInBytes = 0
                    }
                },
                new()
                {
                    Name = "Software Development",
                    Image = new Media
                    {
                        Type = MediaType.Image,
                        Url =
                            "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279168/SoftwareDevelpoment_cxocj6.jpg",
                        LocalFilePath = "",
                        Extension = ".jpg",
                        FileSizeInBytes = 0
                    }
                },
                new()
                {
                    Name = "AI & Data Science",
                    Image = new Media
                    {
                        Type = MediaType.Image,
                        Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279169/AI_DataScience_giguue.jpg",
                        LocalFilePath = "",
                        Extension = ".jpg",
                        FileSizeInBytes = 0
                    }
                },
                new()
                {
                    Name = "Health & Fitness",
                    Image = new Media
                    {
                        Type = MediaType.Image,
                        Url =
                            "https://res.cloudinary.com/dr0hvau94/image/upload/v1751280801/Health_Fitness2_shruxx.jpg",
                        LocalFilePath = "",
                        Extension = ".jpg",
                        FileSizeInBytes = 0
                    }
                },
                new()
                {
                    Name = "Music & Audio",
                    Image = new Media
                    {
                        Type = MediaType.Image,
                        Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279170/Music_Audio_gjnyg1.jpg",
                        LocalFilePath = "",
                        Extension = ".jpg",
                        FileSizeInBytes = 0
                    }
                },
                new()
                {
                    Name = "Photography",
                    Image = new Media
                    {
                        Type = MediaType.Image,
                        Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279170/Photography2_nrpzmb.jpg",
                        LocalFilePath = "",
                        Extension = ".jpg",
                        FileSizeInBytes = 0
                    }
                },
                new()
                {
                    Name = "Finance & Accounting",
                    Image = new Media
                    {
                        Type = MediaType.Image,
                        Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279169/Finance_lkx783.jpg",
                        LocalFilePath = "",
                        Extension = ".jpg",
                        FileSizeInBytes = 0
                    }
                }
            };
            await context.Categories.AddRangeAsync(categories);
        }


        if (!await context.Roles.AnyAsync())
        {
            var roles = new List<ApplicationRole>
            {
                new() { Name = "Admin" },
                new() { Name = "Instructor" }
            };
            await context.Roles.AddRangeAsync(roles);
        }

        await context.SaveChangesAsync();
    }
}