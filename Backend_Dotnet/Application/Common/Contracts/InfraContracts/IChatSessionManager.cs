using Application.DTOs.CourseRecommendationDTOs;

namespace Application.Common.Contracts.InfraContracts;

public interface IChatSessionManager
{
    void CreateSession(out string sessionId, string? systemPrompt);

    ChatSession? GetSession(string sessionId);

    void UpdateActivity(string sessionId);

    void RemoveSession(string sessionId);

    void CleanupExpired();
}