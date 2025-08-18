using DAL.Data;
using DAL.Data.Entities.MediaEntities;
using DAL.Data.Enums;
using Microsoft.AspNetCore.Http;

namespace DAL.Utilities.MediaUtility.Abstract;

public interface IMediaManager
{
    Task<Media> SaveFileAsync(IFormFile file, MediaType mediaType);
    void DeleteFile(Media media);
    Task UpdateFileAsync(Media existingMedia, IFormFile newFile);

    bool FileHasValidExtension(IFormFile file, string[] allowedExtensions);

    bool IsFileUnderMaxSize(IFormFile file, int maxSize);

    Task CleanOrphanMediaFiles(ApplicationDbContext context);
}