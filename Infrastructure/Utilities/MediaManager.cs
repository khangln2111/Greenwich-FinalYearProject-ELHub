using Application.Common.Interfaces;
using Application.Common.Interfaces.InfrastructureInterfaces;
using Domain.Entities.MediaEntities;
using Domain.Enums;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Utilities;

public class MediaManager(
    IWebHostEnvironment webHostEnvironment,
    IHttpContextAccessor httpContextAccessor,
    IMediaProcessor mediaProcessor)
    : IMediaManager
{
    public async Task<Media> SaveFileAsync(IFormFile file, MediaType mediaType)
    {
        var fileId = Guid.NewGuid();
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
        var newFileName = GetFileName(fileId, extension);
        var localFilePath = GetLocalFilePath(mediaType, newFileName);
        var url = GetUrl(mediaType, newFileName);
        EnsureDirectoryExists(Path.GetDirectoryName(localFilePath));
        await SaveFileToLocal(file, localFilePath);

        Media media;
        if (mediaType is MediaType.Video or MediaType.Audio)
        {
            var duration = await mediaProcessor.GetDurationAsync(localFilePath); // Get duration if applicable
            media = new DurationMedia
            {
                Id = fileId,
                Type = mediaType,
                Extension = extension,
                FileSizeInBytes = file.Length,
                LocalFilePath = localFilePath,
                Url = url,
                DurationInSeconds = (int)Math.Round(duration.TotalSeconds)
            };
        }
        else
        {
            media = new Media
            {
                Id = fileId,
                Type = mediaType,
                Extension = extension,
                FileSizeInBytes = file.Length,
                LocalFilePath = localFilePath,
                Url = url
            };
        }

        return media;
    }

    public void DeleteFile(Media media)
    {
        var fileName = GetFileName(media.Id, media.Extension);
        var localFilePath = GetLocalFilePath(media.Type, fileName);
        if (File.Exists(localFilePath)) File.Delete(localFilePath);
    }


    public async Task UpdateFileAsync(Media existingMedia, IFormFile newFile)
    {
        // Delete the existing file if it exists
        DeleteFile(existingMedia);

        var fileId = existingMedia.Id; // Use the same ID for the new file
        var extension = Path.GetExtension(newFile.FileName).ToLowerInvariant();
        var newFileName = GetFileName(fileId, extension);
        var localFilePath = GetLocalFilePath(existingMedia.Type, newFileName);
        var urlFilePath = GetUrl(existingMedia.Type, newFileName);

        EnsureDirectoryExists(Path.GetDirectoryName(localFilePath));
        await SaveFileToLocal(newFile, localFilePath);

        existingMedia.Extension = extension;
        existingMedia.FileSizeInBytes = newFile.Length;
        existingMedia.LocalFilePath = localFilePath;
        existingMedia.Url = urlFilePath;

        // Update duration if it's a DurationMedia
        if (existingMedia is DurationMedia durationMedia &&
            (existingMedia.Type == MediaType.Video || existingMedia.Type == MediaType.Audio))
        {
            var duration = await mediaProcessor.GetDurationAsync(localFilePath);
            durationMedia.DurationInSeconds = (int)Math.Round(duration.TotalSeconds);
        }
    }

    public bool FileHasValidExtension(IFormFile file, string[] allowedExtensions)
    {
        var extension = Path.GetExtension(file.FileName).ToLower();
        return allowedExtensions.Contains(extension);
    }

    public bool IsFileUnderMaxSize(IFormFile file, int maxSize)
    {
        return file.Length <= maxSize;
    }

    public async Task CleanOrphanMediaFiles(IApplicationDbContext context)
    {
        // Lấy tất cả Media Ids từ database
        var mediaIds = await context.Media
            .Select(m => m.Id.ToString())
            .ToListAsync();


        var mediaRoot = Path.Combine(webHostEnvironment.WebRootPath, "media");

        if (!Directory.Exists(mediaRoot)) return;

        // Scan all files in the media directory and its subdirectories
        var files = Directory.GetFiles(mediaRoot, "*.*", SearchOption.AllDirectories);

        foreach (var filePath in files)
        {
            var fileName = Path.GetFileNameWithoutExtension(filePath);

            // If the file name (without extension) is not in the list of media IDs, delete it
            if (!mediaIds.Contains(fileName))
                try
                {
                    File.Delete(filePath);
                    Console.WriteLine($"Deleted orphan file: {filePath}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Failed to delete {filePath}: {ex.Message}");
                }
        }
    }

    private string GetFileName(Guid fileId, string extension)
    {
        return $"{fileId}{extension}";
    }

    // Get directory based on media type media/mediaType
    private string GetMediaDirectory(MediaType mediaType)
    {
        return Path.Combine("media", mediaType.ToString().ToLowerInvariant());
    }

    private string GetLocalFilePath(MediaType mediaType, string fileName)
    {
        var mediaDirectory = GetMediaDirectory(mediaType);
        return Path.Combine(webHostEnvironment.WebRootPath, mediaDirectory, fileName);
    }

    private string GetUrl(MediaType mediaType, string fileName)
    {
        var request = httpContextAccessor.HttpContext?.Request;
        var baseUrl = request != null ? $"{request.Scheme}://{request.Host}" : "https://localhost";
        var mediaDirectory = GetMediaDirectory(mediaType)
            .Replace('\\', '/'); // Replace backslashes with forward slashes for windows
        return $"{baseUrl}/{mediaDirectory}/{fileName}";
    }

    private void EnsureDirectoryExists(string? directoryPath)
    {
        if (directoryPath != null && !Directory.Exists(directoryPath)) Directory.CreateDirectory(directoryPath);
    }

    private async Task SaveFileToLocal(IFormFile file, string localFilePath)
    {
        await using var stream = new FileStream(localFilePath, FileMode.Create);
        await file.CopyToAsync(stream);
    }
}