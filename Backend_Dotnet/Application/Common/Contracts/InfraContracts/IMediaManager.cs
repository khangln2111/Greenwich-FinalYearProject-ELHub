using Application.Common.Contracts.GeneralContracts;
using Domain.Entities.MediaEntities;
using Domain.Enums;
using Microsoft.AspNetCore.Http;

namespace Application.Common.Contracts.InfraContracts;

public interface IMediaManager : IInfraService
{
    Task<Media> SaveFile(IFormFile file, MediaType mediaType);
    void DeleteFile(Media media);
    Task UpdateFile(Media existingMedia, IFormFile newFile);

    bool FileHasValidExtension(IFormFile file, string[] allowedExtensions);

    bool IsFileUnderMaxSize(IFormFile file, int maxSize);

    Task CleanOrphanMediaFiles(IApplicationDbContext context);
}