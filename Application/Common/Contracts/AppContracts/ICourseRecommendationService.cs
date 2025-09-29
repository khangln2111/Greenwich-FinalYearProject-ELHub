using System.Runtime.CompilerServices;
using Application.Common.Contracts.GeneralContracts;
using Application.DTOs.CourseRecommendationDTOs;
using Microsoft.Extensions.AI;

namespace Application.Common.Contracts.AppContracts;

public interface ICourseRecommendationService : IAppService
{
    IAsyncEnumerable<string> GetCourseRecommendationsStream(ChatRequest request,
        CancellationToken ct);

    string CreateEmptyChatSession();
}