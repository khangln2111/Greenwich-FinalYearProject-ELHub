using System.Text;
using Domain.Enums;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.AI;
using OllamaSharp.Models.Chat;
using ChatRole = Microsoft.Extensions.AI.ChatRole;

namespace API;

[ApiController]
[Route("api/[controller]")]
public class CourseRecommendationController(ApplicationDbContext dbContext, IChatClient chatClient) : ControllerBase
{
    [HttpGet("recommend-stream")]
    public async Task RecommendStream([FromQuery] string userQuery, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(userQuery))
        {
            Response.StatusCode = 400;
            await Response.WriteAsync("Query cannot be empty.", ct);
            return;
        }

        // 1️⃣ Set SSE headers
        Response.ContentType = "text/event-stream; charset=utf-8";
        Response.Headers.Append("Cache-Control", "no-cache");
        Response.Headers.Append("X-Accel-Buffering", "no");

        // 2️⃣ Get top 50 published courses
        var courses = await dbContext.Courses
            .AsNoTracking()
            .Where(c => c.Status == CourseStatus.Published)
            .Include(c => c.Category)
            .OrderByDescending(c => c.EnrollmentCount)
            .Take(50)
            .Select(c => new
            {
                c.Title,
                c.Summary,
                CategoryName = c.Category.Name,
                c.AverageRating,
                c.SectionCount,
                c.LectureCount,
                c.EnrollmentCount
            })
            .ToListAsync(ct);

        if (!courses.Any())
        {
            await Response.WriteAsync("data: There are no available courses at the moment.\n\n", ct);
            await Response.Body.FlushAsync(ct);
            return;
        }

        // 3️⃣ Build course list text
        var coursesText = string.Join("\n", courses.Select(c =>
            $"- {c.Title} ({c.CategoryName}): {c.Summary} (Rating: {c.AverageRating}, Sections: {c.SectionCount}, Lectures: {c.LectureCount}, Enrolled: {c.EnrollmentCount})"
        ));

        // 4️⃣ Prepare structured messages for AI
        var messages = new List<ChatMessage>
        {
            new(ChatRole.System,
                "You are an expert e-learning advisor. Provide clear, friendly, and structured recommendations for online courses based on user interests."),
            new(ChatRole.User, $"""

                                User wants to learn about: '{userQuery}'.

                                Course list:
                                {coursesText}

                                Instructions:
                                - Highlight 3 most suitable courses and explain why each is a good fit.
                                - If no course fits, suggest other categories or similar courses.
                                - Keep language friendly, concise, and easy to read.
                                - Use bullets, numbering, or line breaks for clarity.
                                - Output in plain text suitable for display to the user.

                                """)
        };

        // 5️⃣ Stream response from LLaMA 3.2
        await foreach (var token in chatClient.GetStreamingResponseAsync(messages, cancellationToken: ct))
        {
            var bytes = Encoding.UTF8.GetBytes(token.ToString());
            await Response.Body.WriteAsync(bytes, ct);
            await Response.Body.FlushAsync(ct); // send chunks immediately
        }
    }
}