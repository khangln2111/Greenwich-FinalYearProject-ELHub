using Domain.Entities.MediaEntities;
using Domain.Enums;
using Microsoft.AspNetCore.Http;

namespace Application.Common.Interfaces.InfrastructureInterfaces;

public interface IMediaManager
{
    Task<Media> SaveFileAsync(IFormFile file, MediaType mediaType);
    void DeleteFile(Media media);
    Task UpdateFileAsync(Media existingMedia, IFormFile newFile);

    bool FileHasValidExtension(IFormFile file, string[] allowedExtensions);

    bool IsFileUnderMaxSize(IFormFile file, int maxSize);

    Task CleanOrphanMediaFiles(IApplicationDbContext context);
}