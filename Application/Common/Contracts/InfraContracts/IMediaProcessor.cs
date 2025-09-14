using Application.Common.Contracts.GeneralContracts;
using Microsoft.AspNetCore.Http;

namespace Application.Common.Contracts.InfraContracts;

public interface IMediaProcessor : IInfraService
{
    Task<TimeSpan> GetDuration(IFormFile file);

    Task<TimeSpan> GetDuration(string filePath);
}