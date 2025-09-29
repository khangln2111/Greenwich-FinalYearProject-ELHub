using System.Runtime.CompilerServices;
using System.Text;
using Application.Common.Contracts.AppContracts;
using Application.Common.Contracts.GeneralContracts;
using Application.Common.Contracts.InfraContracts;
using Application.DTOs.CourseRecommendationDTOs;
using Application.Exceptions;
using Application.Validations;
using Application.Validations.CourseRecommendationValidators;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.AI;

namespace Application.AppServices;

public class CourseRecommendationService(
    IApplicationDbContext context,
    IChatClient chatClient,
    IChatSessionManager chatSessionManager,
    IValidationService validationService) : ICourseRecommendationService
{
    public string CreateEmptyChatSession()
    {
        chatSessionManager.CreateSession(out var sessionId, null);
        return sessionId;
    }

    public async IAsyncEnumerable<string> GetCourseRecommendationsStream(ChatRequest request,
        [EnumeratorCancellation] CancellationToken ct)
    {
        await validationService.ValidateAsync(request);

        var session = chatSessionManager.GetSession(request.SessionId);
        if (session == null)
            throw new NotFoundException($"Chat session with ID {request.SessionId} not found.");


        // if no system prompt, add one with current course data
        if (session.Messages.All(m => m.Role != ChatRole.System))
        {
            // Get top 50 published courses by enrollment count
            var courses = await context.Courses
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

            var coursesText = courses.Any()
                ? string.Join("\n", courses.Select(c =>
                    $"- {c.Title} ({c.CategoryName}): {c.Summary} (Rating: {c.AverageRating}, Sections: {c.SectionCount}, Lectures: {c.LectureCount}, Enrolled: {c.EnrollmentCount})"
                ))
                : "No available courses.";


            var systemPrompt = $"""
                                    You are an expert e-learning advisor of ELHub.
                                    Current available courses:
                                    {coursesText}
                                    Instructions:
                                    - Highlight suitable courses when relevant.
                                    - Answer clearly, concisely, and friendly.
                                    - Be helpful and engaging like a human advisor.
                                    - Use emojis and UTF-8 icons widely to make users comfortable.
                                    - Remember previous conversation turns.
                                """;

            session.Messages.Insert(0, new ChatMessage(ChatRole.System, systemPrompt));
        }


        session.Messages.Add(new ChatMessage(ChatRole.User, request.UserQuery));
        chatSessionManager.UpdateActivity(request.SessionId);

        var assistantResponse = new StringBuilder();
        await foreach (var chatUpdate in chatClient.GetStreamingResponseAsync(session.Messages, cancellationToken: ct))
        {
            var text = chatUpdate.ToString();
            assistantResponse.Append(text);
            yield return text;
        }

        session.Messages.Add(new ChatMessage(ChatRole.Assistant, assistantResponse.ToString()));
        chatSessionManager.UpdateActivity(request.SessionId);
    }
}