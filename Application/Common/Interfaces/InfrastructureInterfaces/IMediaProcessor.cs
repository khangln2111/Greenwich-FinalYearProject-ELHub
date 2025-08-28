using Microsoft.AspNetCore.Http;

namespace Application.Common.Interfaces.InfrastructureInterfaces;

public interface IMediaProcessor
{
    Task<TimeSpan> GetDurationAsync(IFormFile file);

    Task<TimeSpan> GetDurationAsync(string filePath);
}