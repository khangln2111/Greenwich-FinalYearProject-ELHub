using Microsoft.Extensions.AI;

namespace Application.DTOs.CourseRecommendationDTOs;

public class ChatSession
{
    public List<ChatMessage> Messages { get; } = [];
    public DateTime LastActivity { get; set; } = DateTime.UtcNow;
}