using Application.Common.Contracts.InfraContracts;
using Microsoft.AspNetCore.Http;
using NReco.VideoInfo;

namespace Infrastructure.Utilities;

public class MediaProcessor : IMediaProcessor
{
    private readonly FFProbe _ffProbe = new();


    public async Task<TimeSpan> GetDuration(string filePath)
    {
        var mediaInfo = await Task.Run(() => _ffProbe.GetMediaInfo(filePath));
        return mediaInfo.Duration;
    }

    public async Task<TimeSpan> GetDuration(IFormFile file)
    {
        var tempFilePath = Path.GetTempFileName();
        await using var stream = new FileStream(tempFilePath, FileMode.Create);
        await file.CopyToAsync(stream);
        var mediaInfo = await Task.Run(() => _ffProbe.GetMediaInfo(tempFilePath));
        File.Delete(tempFilePath);
        return mediaInfo.Duration;
    }
}