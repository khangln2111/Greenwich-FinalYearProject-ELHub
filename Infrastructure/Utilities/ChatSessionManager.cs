// Infrastructure/Services/ChatSessionManager.cs

using System.Collections.Concurrent;
using Application.Common.Contracts.InfraContracts;
using Application.DTOs.CourseRecommendationDTOs;
using Microsoft.Extensions.AI;
using ChatRole = Microsoft.Extensions.AI.ChatRole;


namespace Infrastructure.Utilities;

public class ChatSessionManager : IChatSessionManager
{
    private readonly ConcurrentDictionary<string, ChatSession> _sessions = new();

    // After this time of inactivity, the session will be considered expired and will be cleaned up.
    private TimeSpan SessionTimeoutAfter { get; } = TimeSpan.FromMinutes(20);

    public void CreateSession(out string sessionId, string? systemPrompt)
    {
        sessionId = Guid.NewGuid().ToString("N");

        var session = new ChatSession();
        if (!string.IsNullOrWhiteSpace(systemPrompt))
            session.Messages.Add(new ChatMessage(ChatRole.System, systemPrompt));

        _sessions[sessionId] = session;
    }

    public ChatSession? GetSession(string sessionId)
    {
        _sessions.TryGetValue(sessionId, out var session);
        return session;
    }

    public void UpdateActivity(string sessionId)
    {
        if (_sessions.TryGetValue(sessionId, out var session)) session.LastActivity = DateTime.UtcNow;
    }

    public void RemoveSession(string sessionId)
    {
        _sessions.TryRemove(sessionId, out _);
    }

    public void CleanupExpired()
    {
        var now = DateTime.UtcNow;
        var expiredKeys = _sessions
            .Where(kv => now - kv.Value.LastActivity > SessionTimeoutAfter)
            .Select(kv => kv.Key)
            .ToList();

        foreach (var key in expiredKeys) _sessions.TryRemove(key, out _);
    }
}