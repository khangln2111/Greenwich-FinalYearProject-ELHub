using Microsoft.AspNetCore.Http;

namespace Application.Common.Interfaces.InfrastructureInterfaces;

public interface IMediaProcessor
{
    Task<TimeSpan> GetDuration(IFormFile file);

    Task<TimeSpan> GetDuration(string filePath);
}