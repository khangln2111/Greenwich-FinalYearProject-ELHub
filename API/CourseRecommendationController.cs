using System.Text;
using Application.Common.Contracts.AppContracts;
using Application.Common.Contracts.InfraContracts;
using Application.DTOs.CourseRecommendationDTOs;
using Domain.Enums;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.AI;
using ChatRole = Microsoft.Extensions.AI.ChatRole;

namespace API;

[ApiController]
[Route("api/[controller]")]
public class CourseRecommendationController(
    ICourseRecommendationService courseRecommendationService)
    : ControllerBase
{
    [HttpPost("chat-session")]
    public IActionResult CreateEmptyChatSession()
    {
        var sessionId = courseRecommendationService.CreateEmptyChatSession();
        return Ok(new { sessionId });
    }


    [HttpPost("chat-stream")]
    public async Task ChatStream([FromBody] ChatRequest request, CancellationToken ct)
    {
        Response.ContentType = "text/event-stream; charset=utf-8";
        Response.Headers.Append("Cache-Control", "no-cache");
        Response.Headers.Append("X-Accel-Buffering", "no");


        await foreach (var chunk in courseRecommendationService.GetCourseRecommendationsStream(request, ct))
        {
            var bytes = Encoding.UTF8.GetBytes(chunk);
            await Response.Body.WriteAsync(bytes, ct);
            await Response.Body.FlushAsync(ct);
        }
    }
}