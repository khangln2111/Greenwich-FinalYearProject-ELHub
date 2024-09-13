using Microsoft.AspNetCore.Http;

namespace DAL.Utilities.MediaUtility.Abstract;

public interface IMediaProcessor
{
    Task<TimeSpan> GetDurationAsync(IFormFile file);

    Task<TimeSpan> GetDurationAsync(string filePath);
}