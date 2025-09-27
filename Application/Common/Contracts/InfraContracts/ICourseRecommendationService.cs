using Application.Common.Contracts.GeneralContracts;
using Application.Common.Models;

namespace Application.Common.Contracts.InfraContracts;

public interface ICourseRecommendationService : IInfraService
{
    Task<List<RecommendedCourseVm>> RecommendByEmbeddingAsync(string userQuery, int topN = 10,
        CancellationToken ct = default);
}